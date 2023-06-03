import { getNewModule, setActiveModule, unsetActiveModule, getModuleById, getActiveModule, getActiveNode } from './module.js';
import { readModule } from './reader.js';
import { parseModule } from './parser/index.js';
import { checkModule } from './checker.js';
import { translateModule } from './translator/index.js';
import { link } from './linker.js';
import { write } from './writer.js';

/* Point of entry */
async function compile(options) {
    let compiler = getNewCompiler(options);

    try {
        let module = getNewModule(compiler, compiler.options.input);

        setActiveModule(compiler, [module.id]);
        while (module) {
            if (module.status === 'CREATED') {
                await readModule(compiler, module);
            }
            if (module.status === 'READ') {
                parseModule(compiler, module);
            }
            if (module.status === 'PARSED') {
                checkModule(compiler, module);
            }
            if (module.status === 'CHECKED') {
                await translateModule(compiler, module);
            }
            if (module.status === 'TRANSLATED') {
                unsetActiveModule(compiler);
            }
            module = getActiveModule(compiler);
        }
        link(compiler);
        await write(compiler);
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        } else {
            throw {
                message: getErrorMessage(compiler, err),
                code: err.code
            };
        }
    }
}

/* Compiler object */
function getNewCompiler(options) {
    let compiler = {
        options: {
            input: '',
            output: ''
        },
        modules: {
            id: 0,
            list: [],
            paths: {},
            stack: [-1],
            mainId: 0
        },
        executable: ''
    };

    /* Set compiler options */
    for (let name in compiler.options) {
        if (name in options) {
            compiler.options[name] = options[name];
        }
    }
    if (compiler.options.output === '') {
        compiler.options.output = `${ compiler.options.input }.js`;
    }
    return compiler;
}

/* Generator of error messages */
function getErrorMessage(compiler, err) {
    let errorMessage = `Error: ${ err.message }`;

    for (let i = 0; i < compiler.modules.stack.length - 1; i++) {
        let module = getModuleById(compiler, compiler.modules.stack[i]);
        let location;

        if (i === 0) {
            location = err.location;
        } else {
            location = getActiveNode(compiler, module).location;
        }
        if (typeof location !== 'undefined') {
            let line = module.code.split('\n', location.first_line)[location.first_line - 1].replace(/[\t]/g, ' ');

            errorMessage += `\n\nAt ${ module.path }:${ location.first_line }`;
            if (line.length > 0) {
                let highlight = '';

                errorMessage += `\n\n${ line }`;
                for (let i = 0; i < line.length; i++) {
                    if ((location.first_column <= i) && (i < location.last_column)) {
                        highlight += '^';
                    } else {
                        highlight += ' ';
                    }
                }
                if (highlight.trim().length > 0) {
                    errorMessage += `\n${ highlight }`;
                }
            }
        }
    }
    if (typeof err.note !== 'undefined') {
        errorMessage += `\n\nNote: ${ err.note }`;
    }
    return errorMessage;
}

export { compile };
