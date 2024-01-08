import { getNewModule, setActiveModule, unsetActiveModule, getModuleById, getActiveModule, getActiveNode } from './module.js';
import { readModule } from './reader.js';
import { parseModule } from './parser/index.js';
import { checkModule } from './checker.js';
import { translateModule } from './translator/index.js';
import { link } from './linker.js';
import { write } from './writer.js';

/* Point of entry */
async function compile(options) {
    let compiler = getNewCompiler();

    try {
        let module;

        setCompilerOptions(compiler, options);
        module = getNewModule(compiler, compiler.options.input);
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

function getNewCompiler() {
    let compiler = {
        options: {
            /* Value of the expression (new URL(...)).href */
            input: '',
            output: '',

            /* Minimum and maximum size of memory in WebAssembly (WA) pages (1 WA = 64 KB) */
            minMemorySize: 0,
            maxMemorySize: 1
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

    return compiler;
}

function setCompilerOptions(compiler, options) {
    for (let option in compiler.options) {
        if (option in options) {
            compiler.options[option] = options[option];
        }
    }

    if (compiler.options.input.length === 0) {
        throw {
            code: 'E_INIT_COMPILER_OPTION',
            message: 'value of the compiler option \'input\' is an empty string'
        };
    }
    if (compiler.options.output.length === 0) {
        compiler.options.output = `${ compiler.options.input }.js`;
    }
    if ((0 > compiler.options.minMemorySize) || (compiler.options.minMemorySize > compiler.options.maxMemorySize) || (compiler.options.maxMemorySize > 65536)) {
        throw {
            code: 'E_INIT_COMPILER_OPTION',
            message: `values of the compiler options 'minMemorySize' (${ compiler.options.minMemorySize } WAP) and 'maxMemorySize' (${ compiler.options.maxMemorySize } WAP) do not satisfy the following condition: 0 <= minMemorySize <= maxMemorySize <= 65536`,
            note: '1 WAP (WebAssembly page) is equal to 64 KB'
        };
    }
}

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
