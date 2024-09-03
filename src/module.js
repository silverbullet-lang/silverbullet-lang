/* Module object */
function getNewModule(compiler, path) {
    let module = {
        id: compiler.modules.id,
        path: path,
        name: '',
        code: '',

        /* Child of a module is a sub-module */
        childIdList: [],

        nodes: {
            id: 0,
            list: [],
            stack: [-1],
            mainId: -1,
            stringIdList: []
        },
        blocks: {
            id: 0,
            list: [],
            stack: [-1]
        },
        types: {
            id: 0,
            list: [],
            names: {}
        },
        functions: {
            id: 0,
            list: []
        },
        variables: {
            id: 0,
            list: []
        },
        expressions: {
            id: 0,
            list: []
        },
        references: {
            id: 0,
            list: [],
            names: {},
            pointer: 0
        },
        submodules: {
            id: 0,
            list: []
        },
        status: 'CREATED',

        /* Intermediate representation */
        ir: {}
    };

    /* Set some initial values */
    setModuleName(compiler, module);

    compiler.modules.id++;
    compiler.modules.list.push(module);
    compiler.modules.paths[module.path] = module.id;
    return module;
}

function setModuleName(compiler, module) {
    let fileName = module.path.split('/').pop();

    module.name = fileName.slice(0, fileName.lastIndexOf('.'));
}

function setActiveModule(compiler, idList) {
    for (let i = idList.length - 1; i > -1; i--) {
        compiler.modules.stack.unshift(idList[i]);
    }
}

function unsetActiveModule(compiler) {
    compiler.modules.stack.shift();
}

function getModuleById(compiler, id) {
    return compiler.modules.list[id];
}

function getModuleByPath(compiler, path) {
    return getModuleById(compiler, compiler.modules.paths[path]);
}

function getActiveModule(compiler) {
    return getModuleById(compiler, compiler.modules.stack[0]);
}

function getMainModule(compiler) {
    return getModuleById(compiler, compiler.modules.mainId);
}

function setModuleChild(compiler, module, child) {
    module.childIdList.push(child.id);
}

/* Nodes */
function getNewNode(compiler, module, name, location, childIdList, value) {
    let node = {
        id: module.nodes.id,
        parentIdList: [],
        name: name,
        location: location,
        childIdList: childIdList,
        value: value,
        object: {
            type: '',
            id: -1
        },
        status: 'CREATED',
        isVisited: false,
        ir: -1
    };

    /* Set this node as a parent of every child */
    setNodeChildParent(compiler, module, node);

    module.nodes.id++;
    module.nodes.list.push(node);
    return node;
}

function setNodeChildParent(compiler, module, node) {
    for (let i = 0; i < node.childIdList.length; i++) {
        if (node.childIdList[i] > -1) {
            let childNode = getNodeById(compiler, module, node.childIdList[i]);

            /* Some nodes may have more than one parent */
            /* This allows us to reduce the number of nodes */
            childNode.parentIdList.push(node.id);
        }
    }
}

function getNodeById(compiler, module, id) {
    return module.nodes.list[id];
}

function setActiveNodeList(compiler, module, idList) {
    for (let i = idList.length - 1; i > -1; i--) {
        module.nodes.stack.unshift(idList[i]);
    }
}

function getActiveNode(compiler, module) {
    return getNodeById(compiler, module, module.nodes.stack[0]);
}

function unsetActiveNode(compiler, module) {
    module.nodes.stack.shift();
}

function setNodeObject(compiler, module, node, type, id) {
    node.object.type = type;
    node.object.id = id;
}

function getNodeFromNode(compiler, module, submodule, nodeId) {
    let nodeFromNode;
    let stack0 = [nodeId];
    let node = getNodeById(compiler, submodule, stack0[0]);
    let stack1 = [];

    while (node) {
        if ((node.childIdList.length > 0) && !node.isVisited) {
            for (let i = node.childIdList.length - 1; i > -1; i--) {
                stack0.unshift(node.childIdList[i]);
            }
            node.isVisited = true;
        } else {
            let childIdList = [];

            for (let i = node.childIdList.length - 1; i > -1; i--) {
                childIdList.unshift((stack1.shift()));
            }
            nodeFromNode = getNewNode(compiler, module, node.name, node.location, childIdList, node.value);
            stack1.unshift(nodeFromNode.id);
            stack0.shift();
            node.isVisited = false;
        }
        node = getNodeById(compiler, submodule, stack0[0]);
    }
    stack1.shift();
    return nodeFromNode;
}

function setMainNode(compiler, module, node) {
    module.nodes.mainId = node.id;
}

function getMainNode(compiler, module) {
    return getNodeById(compiler, module, module.nodes.mainId);
}

function setStringNode(compiler, module, node) {
    module.nodes.stringIdList.push(node.id);
}

/* Blocks */
function getNewBlock(compiler, module, hostType, hostId) {
    let block = {
        id: module.blocks.id,
        parentId: module.blocks.stack[0],
        host: {
            type: hostType,
            id: hostId
        },
        scope: {},
        ir: -1
    };

    module.blocks.id++;
    module.blocks.list.push(block);
    return block;
}

function setActiveBlock(compiler, module, id) {
    module.blocks.stack.unshift(id);
}

function getActiveBlock(compiler, module) {
    return getBlockById(compiler, module, module.blocks.stack[0]);
}

function getBlockById(compiler, module, id) {
    return module.blocks.list[id];
}

function getBlockObjectByName(compiler, module, block, name) {
    let object = {
        type: '',
        idList: []
    };

    /* Review blocks from the current to the top one */
    /* This allows us to define polymorphic functions in different blocks */
    while (block) {
        if (name in block.scope) {
            object.type = block.scope[name].type;
            object.idList = object.idList.concat(block.scope[name].idList);
        }
        block = getBlockById(compiler, module, block.parentId);
    }
    return object;
}

function setBlockObject(compiler, module, block, name, type, id) {
    if (!(name in block.scope)) {
        block.scope[name] = {
            type: type,
            idList: []
        };
    }
    block.scope[name].idList.push(id);
}

function unsetActiveBlock(compiler, module) {
    module.blocks.stack.shift();
}

/* Types */
function getNewType(compiler, module, nodeId, kind, name, fromIdList, toId) {
    let type = {
        id: module.types.id,
        nodeId: nodeId,
        kind: kind,
        name: name,
        fromIdList: fromIdList,
        toId: toId,
        ir: -1
    };

    module.types.id++;
    module.types.list.push(type);
    module.types.names[type.name] = type.id;
    return type;
}

function getTypeByName(compiler, module, name) {
    return getTypeById(compiler, module, module.types.names[name]);
}

function getTypeById(compiler, module, id) {
    return module.types.list[id];
}

function getTypeName(compiler, module, type) {
    let typeName = `'${ type.name }'`;

    if (type.id === getTypeByName(compiler, module, '$v').id) {
        typeName = '\'void\'';
    }
    return typeName;
}

/* Functions */
function getNewFunction(compiler, module, nodeId, isPrivate, name, typeId) {
    let $function = {
        id: module.functions.id,
        nodeId: nodeId,
        isPrivate: isPrivate,
        name: name,
        typeId: typeId,
        blockId: -1,
        variables: {
            index: 0,
            idList: []
        }
    };

    module.functions.id++;
    module.functions.list.push($function);
    return $function;
}

function getFunctionById(compiler, module, id) {
    return module.functions.list[id];
}

function getActiveFunction(compiler, module) {
    let activeFunction;
    let block = getActiveBlock(compiler, module);

    while (block && (block.host.type !== 'function')) {
        block = getBlockById(compiler, module, block.parentId);
    }
    if (block) {
        activeFunction = getFunctionById(compiler, module, block.host.id);
    }
    return activeFunction;
}

function setFunctionVariable(compiler, module, $function, variable) {
    $function.variables.index++;
    $function.variables.idList.push(variable.id);
}

function getFunctionName(compiler, module, $function) {
    let functionName = $function.name;
    let isPolymorphic = getBlockObjectByName(compiler, module, getBlockById(compiler, module, 1), $function.name).idList.length > 1;

    if (isPolymorphic) {
        let functionType = getTypeById(compiler, module, $function.typeId);

        functionName = `${ functionName }_${ functionType.name.replace(/\s/g, '') }`;
    }
    return functionName;
}

/* Variables */
function getNewVariable(compiler, module, nodeId, isConstant, isPrivate, name, typeId) {
    let variable = {
        id: module.variables.id,
        nodeId: nodeId,
        isConstant: isConstant,
        isPrivate: isPrivate,
        name: name,
        typeId: typeId,
        isParameter: false,
        index: -1
    };

    /* Set some initial values */
    setVariableIsParameter(compiler, module, variable);
    setVariableIndex(compiler, module, variable);

    module.variables.id++;
    module.variables.list.push(variable);
    return variable;
}

function getVariableById(compiler, module, id) {
    return module.variables.list[id];
}

function setVariableIsParameter(compiler, module, variable) {
    variable.isParameter = getActiveBlock(compiler, module).host.type === 'function';
}

function setVariableIndex(compiler, module, variable) {
    let activeFunction = getActiveFunction(compiler, module);

    if (activeFunction) {
        variable.index = activeFunction.variables.index;
        setFunctionVariable(compiler, module, activeFunction, variable);
    }
}

/* Expressions */
function getNewExpression(compiler, module, nodeId, isLiteral, typeIdList, typeIdIndex) {
    let expression = {
        id: module.expressions.id,
        nodeId: nodeId,
        isLiteral: isLiteral,
        typeId: {
            list: typeIdList,
            index: typeIdIndex
        },
        valueId: {
            list: [],
            index: -1
        },
        ir: -1
    };

    module.expressions.id++;
    module.expressions.list.push(expression);
    return expression;
}

function getExpressionById(compiler, module, id) {
    return module.expressions.list[id];
}

function isExpressionInstanceOf(compiler, module, expression, type) {
    let answer = false;

    if (expression.typeId.index === -1) {
        /* This is a reference expression */
        /* The type of the expression is unknown, because it refers to a polymorphic function (a function with the same name, but different types of parameters)  */
        /* Let's find the final type of the expression and the polymorphic function we need to call */

        let i = 0;

        while ((i < expression.typeId.list.length) && (expression.typeId.index === -1)) {
            if (expression.typeId.list[i] === type.id) {
                expression.typeId.index = i;
                expression.valueId.index = i;
                answer = true;
            }
            i++;
        }
    } else {
        answer = getExpressionType(compiler, module, expression).id === type.id;
    }
    return answer;
}

function getExpressionTypeName(compiler, module, expression) {
    let expressionTypeName = '';
    let type;

    if (expression.typeId.index === -1) {
        if (expression.typeId.list.length > 1) {
            expressionTypeName = 'either ';
        }
        for (let i = 0; i < expression.typeId.list.length; i++) {
            type = getTypeById(compiler, module, expression.typeId.list[i]);
            expressionTypeName += getTypeName(compiler, module, type);
            if (i < expression.typeId.list.length - 1) {
                expressionTypeName += ' or ';
            }
        }
    } else {
        type = getExpressionType(compiler, module, expression);
        expressionTypeName = getTypeName(compiler, module, type);
    }
    return expressionTypeName;
}

function setExpressionTypeId(compiler, module, expression, typeId, typeIdIndex) {
    expression.typeId.list.push(typeId);
    expression.typeId.index = typeIdIndex;
}

function getExpressionType(compiler, module, expression) {
    let expressionType;

    if (expression.typeId.index > -1) {
        expressionType = getTypeById(compiler, module, expression.typeId.list[expression.typeId.index]);
    }
    return expressionType;
}

function setExpressionValueId(compiler, module, expression, valueId, valueIndex) {
    expression.valueId.list.push(valueId);
    expression.valueId.index = valueIndex;
}

function getExpressionValueId(compiler, module, expression) {
    return expression.valueId.list[expression.valueId.index];
}

/* References */
function getNewReference(compiler, module, name) {
    let reference = {
        id: module.references.id,
        name: name,
        pointer: module.references.pointer
    };

    module.references.id++;
    module.references.list.push(reference);
    module.references.names[reference.name] = reference.id;
    module.references.pointer++;
    return reference;
}

function getReferenceByName(compiler, module, name) {
    return getReferenceById(compiler, module, module.references.names[name]);
}

function getReferenceById(compiler, module, id) {
    return module.references.list[id];
}

/* Sub-modules */
function getNewSubmodule(compiler, module, nodeId, name) {
    let submodule = {
        id: module.submodules.id,
        nodeId: nodeId,
        name: name,
        path: '',

        /* Objects which are imported from this sub-module */
        objectList: []
    };

    module.submodules.id++;
    module.submodules.list.push(submodule);
    return submodule;
}

function setSubmodulePath(compiler, module, submodule, path) {
    submodule.path = path;
}

function getSubmoduleById(compiler, module, id) {
    return module.submodules.list[id];
}

function setSubmoduleObject(compiler, module, submodule, type, id, internalId) {
    let object = {
        type: type,
        id: id,
        internalId: internalId
    };

    submodule.objectList.push(object);
}

export { getNewModule, setActiveModule, unsetActiveModule, getModuleById, getModuleByPath, getActiveModule, getMainModule, setModuleChild, getNewNode, getNodeById, setActiveNodeList, getActiveNode, unsetActiveNode, setNodeObject, getNodeFromNode, setMainNode, getMainNode, getNewBlock, setActiveBlock, getActiveBlock, getBlockObjectByName, getBlockById, setBlockObject, unsetActiveBlock, getNewType, getTypeByName, getTypeById, getTypeName, getNewFunction, getFunctionById, getActiveFunction, getFunctionName, getNewVariable, getVariableById, getNewExpression, getExpressionById, isExpressionInstanceOf, getExpressionTypeName, setExpressionTypeId, getExpressionType, setExpressionValueId, getExpressionValueId, getNewReference, getReferenceByName, getReferenceById, getNewSubmodule, setSubmodulePath, getSubmoduleById, setSubmoduleObject, setStringNode };
