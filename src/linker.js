import { getMainModule, setActiveModule, unsetActiveModule, getActiveModule, getModuleByPath, getNodeById, getBlockById, getBlockObjectByName, getTypeById, getVariableById, getFunctionById, getFunctionName } from './module.js';

function link(compiler) {
    let module = getMainModule(compiler);
    let footer = '';
    let body = '';
    let header = '';
    let tableOffset = 0;

    /* Footer */
    footer += `

export { exports_${ module.id } as '${ module.name }' };`;

    /* Body */
    setActiveModule(compiler, [module.id]);
    while (module) {
        if (module.status === 'TRANSLATED') {
            setActiveModule(compiler, module.childIdList);
            module.status = 'LINKING';
        } else if (module.status === 'LINKING') {

            body += `

/* ${ module.path } */
/*
${ module.ir.emitText().replace(/\/\*/g, '\\\/\\\*').replace(/\*\//g, '\\\*\\\/') }*/`;
            body += `

let buffer_${ module.id } = (new Uint8Array([${ module.ir.emitBinary() }])).buffer;
let module_${ module.id } = new WebAssembly.Module(buffer_${ module.id }, {
    builtins: ['js-string']
});
let imports_${ module.id } = {`;

            /* Default imports */
            body += `
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, ${ tableOffset })
    },
    '$globalStrings': globalStrings,
    '$localStrings': {`;
            for (let i = 0; i < module.nodes.stringIdList.length; i++) {
                let stringNode = getNodeById(compiler, module, module.nodes.stringIdList[i]);

                if (0 < i) {
                    body += ',';
                }
                body += `
        '$string_${ stringNode.id }': ${ JSON.stringify(stringNode.value) }`;
            }
            body += `
    },
    '$globalFunctions': globalFunctions`;

            /* Custom import(s) */
            for (let i = 0; i < module.submodules.list.length; i++) {
                let submoduleObject = module.submodules.list[i];
                let submodule = getModuleByPath(compiler, submoduleObject.path);

                body += `,
    '${ submoduleObject.name }': {`;
                for (let j = 0; j < submoduleObject.objectList.length; j++) {
                    let externalObject = submoduleObject.objectList[j];
                    let externalObjectName = '';

                    if (externalObject.type === 'variable') {
                        let externalVariableObject = getVariableById(compiler, submodule, externalObject.id);

                        externalObjectName = externalVariableObject.name;
                    } else if (externalObject.type === 'function') {
                        let externalFunctionObject = getFunctionById(compiler, submodule, externalObject.id);

                        externalObjectName = getFunctionName(compiler, submodule, externalFunctionObject);
                    }
                    if (0 < j) {
                        body += ',';
                    }
                    body += `
        '${ externalObjectName }': exports_${ submodule.id }['${ externalObjectName }']`;
                }
                body += `
    }`;
            }
            body += `
};
let instance_${ module.id } = new WebAssembly.Instance(module_${ module.id }, imports_${ module.id });
let exports_${ module.id } = instance_${ module.id }.exports;`;

            tableOffset += module.references.list.length;

            unsetActiveModule(compiler);
            module.status = 'LINKED';
        } else if (module.status === 'LINKED') {
            unsetActiveModule(compiler);
        }
        module = getActiveModule(compiler);
    }

    /* Header */
    header += `let globalObjects = {
    '$memory': new WebAssembly.Memory({
        initial: ${ compiler.options.minMemorySize },
        maximum: ${ compiler.options.maxMemorySize }
    }),
    '$table': new WebAssembly.Table({
        element: 'anyfunc',
        initial: ${ tableOffset }
    })
};
let globalStrings = {
    '$string_empty': ${ JSON.stringify('') }
};
let globalFunctions = {
    '$getString_[$i]->[$s]': function(value) {
        return (new Int32Array([value])[0]).toString();
    },
    '$getString_[$iu]->[$s]': function(value) {
        return ((new Uint32Array([value]))[0]).toString();
    },
    '$getString_[$id]->[$s]': function(value) {
        return ((new BigInt64Array([value]))[0]).toString();
    },
    '$getString_[$f]->[$s]': function(value) {
        return ((new Float32Array([value]))[0]).toString();
    },
    '$getString_[$fd]->[$s]': function(value) {
        return ((new Float64Array([value]))[0]).toString();
    },
    '$getString_[$b]->[$s]': function(value) {
        if (value === 0) {
            return 'false';
        } else {
            return 'true';
        }
    },
    '$getString_[$s]->[$s]': function(value) {
        return value;
    },
    '$show': function(value) {
        console.log(value);
    }
};`;

    /* The final output */
    compiler.executable = `${ header }${ body }${ footer }`;
}

export { link };
