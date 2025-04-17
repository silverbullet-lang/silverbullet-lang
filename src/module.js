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
            list: [],

            /* A list of IDs of functions */
            /* If a function's ID belongs to this list, then there exists a reference to that function */
            referenceList: []
        },
        variables: {
            id: 0,
            list: []
        },
        expressions: {
            id: 0,
            list: []
        },
        submodules: {
            id: 0,
            list: []
        },
        status: 'CREATED',

        /* If this module is a library, then we can create custom instructions, i.e., functions named as '$name' */
        isLibrary: false,

        /* Intermediate representation */
        ir: {}
    };

    /* Set some initial values */
    setModuleName(compiler, module);
    setModuleIsLibrary(compiler, module);

    compiler.modules.id++;
    compiler.modules.list.push(module);
    compiler.modules.paths[module.path] = module.id;
    return module;
}

function setModuleName(compiler, module) {
    let fileName = module.path.split('/').pop();

    module.name = fileName.slice(0, fileName.lastIndexOf('.'));
}

function setModuleIsLibrary(compiler, module) {
    let moduleDir = module.path.slice(0, module.path.lastIndexOf('/') + 1);

    module.isLibrary = -1 < moduleDir.indexOf(compiler.options.libraryFolder);
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
        copyId: -1,
        isCopy: false,
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

function getNodeCopy(compiler, module, fromModule, fromNode, toModule, typeVariables, isModifierTemplateAllowed) {
    let nodeCopy;
    let stack0 = [fromNode.id];
    let stack1 = [];

    //console.log('fromNode', fromNode);
    //console.log('typeVariables', typeVariables);
    //console.log('isModifierTemplateAllowed', isModifierTemplateAllowed);

    while (0 < stack0.length) {
        let nodeId = stack0[stack0.length - 1];

        //console.log('nodeId', nodeId);

        if (nodeId < 0) {
            stack1.push(stack0.pop());
        } else {
            let node = getNodeById(compiler, fromModule, nodeId);

            //console.log('node', node);

            if (node.isVisited) {
                if (node.copyId === -1) {
                    let childNodeCopyIdList = [];

                    for (let i = 0; i < node.childIdList.length; i++) {
                        let childNodeCopyId = stack1.pop();

                        //console.log('childNodeCopyId', childNodeCopyId);

                        if (-2 < childNodeCopyId) {
                            childNodeCopyIdList.push(childNodeCopyId);
                        }
                    }
                    nodeCopy = getNewNode(compiler, toModule, node.name, node.location, childNodeCopyIdList, node.value);
                    nodeCopy.isCopy = true;
                    node.copyId = nodeCopy.id;

                    //console.log('nodeCopy', nodeCopy);

                }
                stack1.push(node.copyId);
                stack0.pop();
            } else {
                node.isVisited = true;
                for (let i = 0; i < node.childIdList.length; i++) {
                    let childNodeId = node.childIdList[i];

                    //console.log('childNodeId', childNodeId);

                    if (childNodeId < 0) {
                        stack0.push(childNodeId);
                    } else {
                        let childNode = getNodeById(compiler, fromModule, childNodeId);

                        //console.log('childNode', childNode);

                        if ((childNode.name === 'modifier') && (childNode.value === 'template') && !isModifierTemplateAllowed) {
                            stack0.push(-2);
                        } else if ((childNode.name === 'variableType') && (Object.hasOwn(typeVariables, childNode.value))) {
                            let typeObject = getTypeById(compiler, module, typeVariables[childNode.value]);
                            let typeNode = getNodeById(compiler, module, typeObject.nodeId);

                            //console.log('typeObject', typeObject);
                            //console.log('typeNode', typeNode);

                            if (module.id === fromModule.id) {
                                stack0.push(typeNode.id);
                            } else {

                                console.log('getNodeCopy: module.id !== fromModule.id');
                                process.exit();

                            }
                        } else {
                            stack0.push(childNode.id);
                        }
                    }
                }
            }
        }

        //console.log('stack0', stack0);
        //console.log('stack1', stack1);

    }
    nodeCopy = getNodeById(compiler, toModule, stack1.pop());

    //console.log('nodeCopy', nodeCopy);
    //console.log('module.nodes.list', module.nodes.list.slice(0, 50));

    /* Restore some values of properties of nodes */
    stack0 = [fromNode.id];
    while (0 < stack0.length) {
        let nodeId = stack0.pop();

        //console.log('nodeId', nodeId);

        if (0 < nodeId) {
            let node = getNodeById(compiler, module, nodeId);

            //console.log('node before', node);

            node.isVisited = false;
            node.copyId = -1;

            //console.log('node after', node);

            for (let i = 0; i < node.childIdList.length; i++) {
                stack0.push(node.childIdList[i]);
            }
        }

        //console.log('stack0', stack0);

    }

    //console.log('module.nodes.list', module.nodes.list.slice(0, 50));

    return nodeCopy;
}

function getTypeVariableNode(compiler, module, typeNode) {
    let typeVariableNode;
    let stack = [typeNode.id];

    while ((0 < stack.length) && !typeVariableNode) {
        let node = getNodeById(compiler, module, stack.pop());

        if (node.name === 'referenceType') {
            let listNode = getNodeById(compiler, module, node.childIdList[0]);

            stack.push(node.childIdList[1]);
            for (let i = listNode.childIdList.length - 1; -1 < i; i--) {
                stack.push(listNode.childIdList[i]);
            }
        } else if (node.name === 'arrayType') {
            stack.push(node.childIdList[0]);
        } else if (node.name === 'variableType') {
            typeVariableNode = node;
        }
    }

    return typeVariableNode;
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
        if (Object.hasOwn(block.scope, name)) {
            object.type = block.scope[name].type;
            object.idList = object.idList.concat(block.scope[name].idList);
        }
        block = getBlockById(compiler, module, block.parentId);
    }
    return object;
}

function setBlockObject(compiler, module, block, name, type, id, isObjectLast) {
    if (!(Object.hasOwn(block.scope, name))) {
        block.scope[name] = {
            type: type,
            idList: []
        };
    }
    if (isObjectLast) {
        block.scope[name].idList.push(id);
    } else {
        block.scope[name].idList.unshift(id);
    }
}

function unsetActiveBlock(compiler, module) {
    module.blocks.stack.shift();
}

/* Types */
function getNewType(compiler, module, nodeId, kind, name, fromIdList, toId, isVariable) {
    let type = {
        id: module.types.id,
        nodeId: nodeId,
        kind: kind,
        name: name,
        fromIdList: fromIdList,
        toId: toId,
        isVariable: isVariable,
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
    } else if (type.id === getTypeByName(compiler, module, '{$v}').id) {
        typeName = '\'{void}\'';
    }
    return typeName;
}

function isTypeVoid(compiler, module, type) {
    let is = false;

    if ((type.id === getTypeByName(compiler, module, '$v').id) || (type.id === getTypeByName(compiler, module, '{$v}').id)) {
        is = true;
    }
    return is;
}

function isTypeEquivalentTo(compiler, module, type0, type1) {
    let is = false;

    if (type0.id === type1.id) {
        is = true;
    } else if ((type0.kind === 'reference') && (type1.kind === 'reference')) {
        is = true;
    } else if ((type0.kind === 'array') && (type1.kind === 'array')) {
        is = true;
    } else if ((type0.kind === 'variable') || (type1.kind === 'variable')) {
        is = true;
    }
    return is;
}

/* Functions */
function getNewFunction(compiler, module, nodeId, isPrivate, isTemplate, isInstruction, name, typeId) {
    let $function = {
        id: module.functions.id,
        nodeId: nodeId,
        isPrivate: isPrivate,
        isTemplate: isTemplate,
        isInstruction: isInstruction,
        name: name,
        typeId: typeId,
        blockId: -1,
        variables: {
            index: 0,
            idList: []
        },

        /* If there exists a reference to this function, then this number shows position of the function's ID in the list module.functions.referenceList */
        referenceIndex: -1
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

function setFunctionReferenceIndex(compiler, module, $function) {
    $function.referenceIndex = module.functions.referenceList.length;
    module.functions.referenceList.push($function.id);
}

/* Variables */
function getNewVariable(compiler, module, nodeId, isConstant, isPrivate, isParameter, name, typeId) {
    let variable = {
        id: module.variables.id,
        nodeId: nodeId,
        isConstant: isConstant,
        isPrivate: isPrivate,
        isParameter: isParameter,
        name: name,
        typeId: typeId,
        index: -1
    };

    /* Set some initial values */
    setVariableIndex(compiler, module, variable);

    module.variables.id++;
    module.variables.list.push(variable);
    return variable;
}

function getVariableById(compiler, module, id) {
    return module.variables.list[id];
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

function isExpressionInstanceOf(compiler, module, expression, type, isExpressionTypeDeterminationAllowed, typeVariables) {
    let is = true;

    if (type.isVariable) {
        if (expression.typeId.index === -1) {
            /* Type of the expression is not defined */
            is = false;
        } else {
            let expressionType = getTypeById(compiler, module, expression.typeId.list[expression.typeId.index]);
            let stack0 = [expressionType.id];
            let stack1 = [type.id];

            while (is && (0 < stack0.length) && (0 < stack1.length)) {
                let expressionTypeObject = getTypeById(compiler, module, stack0.pop());
                let typeObject = getTypeById(compiler, module, stack1.pop());

                is = false;
                if ((expressionTypeObject.kind === 'basic') && (typeObject.kind === 'basic')) {
                    if (expressionTypeObject.id === typeObject.id) {
                        is = true;
                    }
                } else if ((expressionTypeObject.kind === 'reference') && (typeObject.kind === 'reference')) {
                    if (expressionTypeObject.fromIdList.length === typeObject.fromIdList.length) {
                        is = true;
                        stack0.push(expressionTypeObject.toId);
                        stack1.push(typeObject.toId);
                        for (let i = expressionTypeObject.fromIdList.length - 1; -1 < i; i--) {
                            stack0.push(expressionTypeObject.fromIdList[i]);
                            stack1.push(typeObject.fromIdList[i]);
                        }
                    }
                } else if ((expressionTypeObject.kind === 'array') && (typeObject.kind === 'array')) {
                    is = true;
                    stack0.push(expressionTypeObject.toId);
                    stack1.push(typeObject.toId);
                } else if (typeObject.kind === 'variable') {
                    if (Object.hasOwn(typeVariables, typeObject.name)) {
                        if (expressionTypeObject.id === typeVariables[typeObject.name]) {
                            is = true;
                        }
                    } else {
                        if (expressionTypeObject.id !== getTypeByName(compiler, module, '$v').id) {
                            is = true;
                            typeVariables[typeObject.name] = expressionTypeObject.id;
                        }
                    }
                }
            }
        }
    } else {
        let stack0 = [expression.id];
        let stack1 = [type.id];

        while (is && (0 < stack0.length) && (0 < stack1.length)) {
            let expressionObject = getExpressionById(compiler, module, stack0.pop());
            let typeObject = getTypeById(compiler, module, stack1.pop());

            is = false;
            if (expressionObject.typeId.index === -1) {
                let i = 0;
                let next = true;

                while ((i < expressionObject.typeId.list.length) && next) {
                    if (expressionObject.typeId.list[i] === typeObject.id) {
                        is = true;
                        next = false;
                        if (isExpressionTypeDeterminationAllowed) {
                            let expressionNode = getNodeById(compiler, module, expressionObject.nodeId);

                            expressionObject.typeId.index = i;
                            if (expressionNode.name === 'reference') {
                                expressionObject.valueId.index = i;
                            } else if (expressionNode.name === 'array') {
                                let elementNodeListNode = getNodeById(compiler, module, expressionNode.childIdList[0]);

                                for (let j = elementNodeListNode.childIdList.length - 1; -1 < j; j--) {
                                    let elementNode = getNodeById(compiler, module, elementNodeListNode.childIdList[j]);
                                    let elementObject = getExpressionById(compiler, module, elementNode.object.id);

                                    stack0.push(elementObject.id);
                                    stack1.push(typeObject.toId);
                                }
                            }
                        }
                    }
                    i++;
                }
            } else {
                let expressionTypeObject = getTypeById(compiler, module, expressionObject.typeId.list[expressionObject.typeId.index]);

                if (expressionTypeObject.id === typeObject.id) {
                    is = true;
                } else if ((expressionTypeObject.id === getTypeByName(compiler, module, '{$v}').id) && (typeObject.kind === 'array')) {
                    /* Empty array is an instance of any array */
                    is = true;
                    if (isExpressionTypeDeterminationAllowed) {
                        expressionObject.typeId.list[expressionObject.typeId.index] = typeObject.id;
                    }
                }
            }
        }
    }

    return is;
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

function setExpressionType(compiler, module, expression, typeId, typeIdIndex) {
    expression.typeId.list.push(typeId);
    expression.typeId.index = typeIdIndex;
}

function isExpressionTypeSet(compiler, module, expression) {
    return 0 < expression.typeId.list.length;
}

function getExpressionType(compiler, module, expression) {
    let expressionType;

    if (expression.typeId.index > -1) {
        expressionType = getTypeById(compiler, module, expression.typeId.list[expression.typeId.index]);
    }
    return expressionType;
}

function getExpressionTypeList(compiler, module, expression) {
    let expressionTypeList = [];

    for (let i = 0; i < expression.typeId.list.length; i++) {
        let expressionType = getTypeById(compiler, module, expression.typeId.list[i]);

        expressionTypeList.push(expressionType);
    }
    return expressionTypeList;
}

function setExpressionValue(compiler, module, expression, valueId, valueIdIndex) {
    expression.valueId.list.push(valueId);
    expression.valueId.index = valueIdIndex;
}

function getExpressionValue(compiler, module, expression) {
    return expression.valueId.list[expression.valueId.index];
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

export { getNewModule, setActiveModule, unsetActiveModule, getModuleById, getModuleByPath, getActiveModule, getMainModule, setModuleChild, getNewNode, getNodeById, setActiveNodeList, getActiveNode, unsetActiveNode, setNodeObject, getNodeFromNode, getNodeCopy, setMainNode, getMainNode, getTypeVariableNode, getNewBlock, setActiveBlock, getActiveBlock, getBlockObjectByName, getBlockById, setBlockObject, unsetActiveBlock, getNewType, getTypeByName, getTypeById, getTypeName, isTypeVoid, isTypeEquivalentTo, getNewFunction, getFunctionById, getActiveFunction, getFunctionName, setFunctionReferenceIndex, getNewVariable, getVariableById, getNewExpression, getExpressionById, isExpressionInstanceOf, getExpressionTypeName, setExpressionType, isExpressionTypeSet, getExpressionType, getExpressionTypeList, setExpressionValue, getExpressionValue, getNewSubmodule, setSubmodulePath, getSubmoduleById, setSubmoduleObject, setStringNode };
