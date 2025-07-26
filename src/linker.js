import { getMainModule, setActiveModuleList, unsetActiveModule, getActiveModule, getModuleByPath, getNodeById, getBlockById, getBlockObjectByName, getTypeById, getVariableById, getFunctionById, getFunctionName } from './module.js';

function link(compiler) {
    let module = getMainModule(compiler);
    let mainModuleId = module.id;
    let data = {
        footer: '',
        body: '',
        header: '',
        tableOffset: 0
    };

    /* Set footer */
    if (compiler.options.isOutputExecutable) {
        data.footer += `
if (Object.hasOwn(exports_${ mainModuleId }, 'start')) {
    exports_${ mainModuleId }.start();
}`;
    } else {
        data.footer += `
export { memory, exports_${ mainModuleId } as 'exports' };`;
    }

    /* Set body and value of 'tableOffset' */
    setActiveModuleList(compiler, [module.id]);
    while (module) {
        if (module.status === 'TRANSLATED') {
            setActiveModuleList(compiler, module.childIdList);
            module.status = 'LINKING';
        } else if (module.status === 'LINKING') {
            linkModule(compiler, module, data);
            unsetActiveModule(compiler);
            module.status = 'LINKED';
        } else if (module.status === 'LINKED') {
            unsetActiveModule(compiler);
        }
        module = getActiveModule(compiler);
    }

    /* Set header */
    data.header += `let memory = new WebAssembly.Memory({
    initial: ${ compiler.options.minMemorySize },
    maximum: ${ compiler.options.maxMemorySize }
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: ${ data.tableOffset },
    maximum: ${ data.tableOffset }
});
let functions = {
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

    /* Set value of the final executable */
    compiler.executable += `${ data.header }
${ data.body }
${ data.footer }`;
}

function linkModule(compiler, module, data) {

    /* FOR DEVELOPMENT */
    data.body += `
/* ${ module.path } */
/*
${ module.ir.emitText().replace(/\/\*/g, '\\\/\\\*').replace(/\*\//g, '\\\*\\\/') }*/`;

    /* Set body */
    data.body += `
let buffer_${ module.id } = (new Uint8Array([${ module.ir.emitBinary() }])).buffer;
let module_${ module.id } = new WebAssembly.Module(buffer_${ module.id }, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_${ module.id } = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, ${ data.tableOffset })
    },
    '$functions': functions`;

    /* Import objects from other modules */
    for (let i = 0; i < module.submodules.list.length; i++) {
        let submoduleObject = module.submodules.list[i];
        let submodule = getModuleByPath(compiler, submoduleObject.path);

        data.body += `,
    '${ submoduleObject.name }': {`;

        for (let j = 0; j < submoduleObject.outerObjectNodeIdList.length; j++) {
            let outerObjectNode = getNodeById(compiler, submodule, submoduleObject.outerObjectNodeIdList[j]);
            let outerObject = outerObjectNode.object;
            let outerObjectName = '';

            if (outerObject.type === 'variable') {
                let outerVariableObject = getVariableById(compiler, submodule, outerObject.id);

                outerObjectName = outerVariableObject.name
            } else if (outerObject.type === 'function') {
                let outerFunctionObject = getFunctionById(compiler, submodule, outerObject.id);

                outerObjectName = getFunctionName(compiler, submodule, outerFunctionObject);
            }
            if (0 < j) {
                data.body += ',';
            }
            data.body += `
        '${ outerObjectName }': exports_${ submodule.id }['${ outerObjectName }']`;
        }
        data.body += `
    }`;
    }

    data.body += `
};
let instance_${ module.id } = new WebAssembly.Instance(module_${ module.id }, imports_${ module.id });
let exports_${ module.id } = instance_${ module.id }.exports;`;

    /* Set value of 'tableOffset' */
    data.tableOffset += module.functions.referenceList.length;
}

export { link };
