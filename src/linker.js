import { getMainModule, setActiveModule, unsetActiveModule, getActiveModule, getModuleByPath, getBlockById, getBlockObjectByName, getTypeById, getVariableById, getFunctionById, getFunctionName } from './module.js';

function link(compiler) {
    let module = getMainModule(compiler);
    let footer = '';
    let body = '';
    let header = '';

    /* The number of references to functions */
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
${ module.ir.emitText() }*/`;
            body += `

let buffer_${ module.id } = (new Uint8Array([${ module.ir.emitBinary() }])).buffer;
let module_${ module.id } = new WebAssembly.Module(buffer_${ module.id });
let imports_${ module.id } = {`;

            /* Default imports */
            body += `
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, ${ tableOffset }),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    }`;

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
                    if (j > 0) {
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
    header += `let memory = new WebAssembly.Memory({
    initial: ${ compiler.options.minMemorySize },
    maximum: ${ compiler.options.maxMemorySize },
    shared: false
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: ${ tableOffset }
});`;

    /* The final output */
    compiler.executable = `${ header }${ body }${ footer }`;
}

export { link };
