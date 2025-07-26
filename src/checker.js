import { getNewModule, setActiveModuleList, getModuleByPath, getNewNode, getNodeById, setActiveNodeList, getActiveNode, unsetActiveNode, getMainNode, setNodeObject, getNodeCopy, getTypeVariableNode, getNewBlock, setActiveBlock, getActiveBlock, getBlockById, getBlockObjectByName, setBlockObject, unsetActiveBlock, getNewType, getTypeByName, getTypeById, getTypeName, isTypeVoid, isTypeEquivalentTo, getNewFunction, getFunctionById, getActiveFunction, getFunctionName, setFunctionReferenceIndex, getNewVariable, getVariableById, getNewExpression, getExpressionById, isExpressionInstanceOf, getExpressionTypeName, setExpressionType, isExpressionTypeSet, getExpressionType, getExpressionTypeList, setExpressionValue, getNewSubmodule, setSubmodulePath, getSubmoduleById, setStringNode } from './module.js';

function checkModule(compiler, module) {
    let node = getActiveNode(compiler, module);

    if (!node) {
        /* This module is not checked yet */
        node = getMainNode(compiler, module);
        setActiveNodeList(compiler, module, [node.id]);
    } else {
        /* Checking of this module already started, but an import of another module paused it */
        /* Let's continue the checking */
    }

    while (node && (module.status === 'PARSED')) {

        //console.log(module.path, node.id, node.name, node.status, node.location.first_line, node.value);

        if (node.name === 'moduleStmt') {
            checkModuleStmt(compiler, module, node);
        } else if (node.name === 'moduleBlock') {
            checkModuleBlock(compiler, module, node);
        } else if (node.name === 'importStmt') {
            checkImportStmt(compiler, module, node);
        } else if (node.name === 'submodule') {
            checkSubmodule(compiler, module, node);
        } else if (node.name === 'identifier') {
            checkIdentifier(compiler, module, node);
        } else if (node.name === 'path') {
            checkPath(compiler, module, node);
        } else if (node.name === 'list') {
            checkList(compiler, module, node);
        } else if (node.name === 'externalObject') {
            checkExternalObject(compiler, module, node);
        } else if (node.name === 'operator') {
            checkOperator(compiler, module, node);
        } else if (node.name === 'externalVariable') {
            checkExternalVariable(compiler, module, node);
        } else if (node.name === 'externalFunction') {
            checkExternalFunction(compiler, module, node);
        } else if (node.name === 'variable') {
            checkVariable(compiler, module, node);
        } else if (node.name === 'basicType') {
            checkBasicType(compiler, module, node);
        } else if (node.name === 'function') {
            checkFunction(compiler, module, node);
        } else if (node.name === 'referenceType') {
            checkReferenceType(compiler, module, node);
        } else if (node.name === 'initializationStmt') {
            checkInitializationStmt(compiler, module, node);
        } else if (node.name === 'integerSingleSigned') {
            checkIntegerSingleSigned(compiler, module, node);
        } else if (node.name === 'integerSingleUnsigned') {
            checkIntegerSingleUnsigned(compiler, module, node);
        } else if (node.name === 'integerDouble') {
            checkIntegerDouble(compiler, module, node);
        } else if (node.name === 'floatingPointSingle') {
            checkFloatingPointSingle(compiler, module, node);
        } else if (node.name === 'floatingPointDouble') {
            checkFloatingPointDouble(compiler, module, node);
        } else if (node.name === 'boolean') {
            checkBoolean(compiler, module, node);
        } else if (node.name === 'functionStmt') {
            checkFunctionStmt(compiler, module, node);
        } else if (node.name === 'nonModuleBlock') {
            checkNonModuleBlock(compiler, module, node);
        } else if (node.name === 'assignmentToNameStmt') {
            checkAssignmentToNameStmt(compiler, module, node);
        } else if (node.name === 'nothingStmt') {
            checkNothingStmt(compiler, module, node);
        } else if (node.name === 'ifElseStmt') {
            checkIfElseStmt(compiler, module, node);
        } else if (node.name === 'whileStmt') {
            checkWhileStmt(compiler, module, node);
        } else if (node.name === 'returnStmt') {
            checkReturnStmt(compiler, module, node);
        } else if (node.name === 'void') {
            checkVoid(compiler, module, node);
        } else if (node.name === 'reference') {
            checkReference(compiler, module, node);
        } else if (node.name === 'externalIdentifier') {
            checkExternalIdentifier(compiler, module, node);
        } else if (node.name === 'name') {
            checkName(compiler, module, node);
        } else if (node.name === 'instruction') {
            checkInstruction(compiler, module, node);
        } else if (node.name === 'callByName') {
            checkCallByName(compiler, module, node);
        } else if (node.name === 'callByExpression') {
            checkCallByExpression(compiler, module, node);
        } else if (node.name === 'exprStmt') {
            checkExprStmt(compiler, module, node);
        } else if (node.name === 'string') {
            checkString(compiler, module, node);
        } else if (node.name === 'array') {
            checkArray(compiler, module, node);
        } else if (node.name === 'arrayType') {
            checkArrayType(compiler, module, node);
        } else if (node.name === 'variableType') {
            checkVariableType(compiler, module, node);
        }
        node = getActiveNode(compiler, module);
    }

    if (module.status === 'PARSED') {
        module.status = 'CHECKED';
    } else if (module.status === 'CHECKING') {
        module.status = 'PARSED';
    }
}

function checkModuleStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        let blockObject = getNewBlock(compiler, module, 'module', -1);

        setActiveBlock(compiler, module, blockObject.id);
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkModuleBlock(compiler, module, node) {
    if (node.status === 'CREATED') {
        let blockObject = getNewBlock(compiler, module, '', -1);

        setActiveBlock(compiler, module, blockObject.id);
        setNodeObject(compiler, module, node, 'block', blockObject.id, -1);
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '2';
    } else if (node.status === '2') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkImportStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[1], node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkSubmodule(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let activeBlockObject = getActiveBlock(compiler, module);
        let object = getBlockObjectByName(compiler, module, activeBlockObject, nameNode.value);
        let pathNode = getNodeById(compiler, module, node.childIdList[1]);
        let submoduleObject = getNewSubmodule(compiler, module, node.id, nameNode.value, '');

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableNode = getNodeById(compiler, module, variableObject.nodeId);

            throw {
                code: 'E_CHECK_SUBMODULE_REPETITIVE_NAME',
                message: `sub-module '${ submoduleObject.name }' cannot be created, because there is already a variable with the same name defined on the line ${ variableNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === 'function') {
            let functionObject = getFunctionById(compiler, module, object.idList[0]);
            let functionNode = getNodeById(compiler, module, functionObject.nodeId);

            throw {
                code: 'E_CHECK_SUBMODULE_REPETITIVE_NAME',
                message: `sub-module '${ submoduleObject.name }' cannot be created, because there is already a function with the same name defined on the line ${ functionNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === 'submodule') {
            let $submoduleObject = getSubmoduleById(compiler, module, object.idList[0]);
            let $submoduleNode = getNodeById(compiler, module, $submoduleObject.nodeId);

            throw {
                code: 'E_CHECK_SUBMODULE_REPETITIVE_NAME',
                message: `sub-module '${ submoduleObject.name }' cannot be created, because there is already a sub-module with the same name defined on the line ${ $submoduleNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            let path = '';
            let submodule;

            if (pathNode.value === '') {
                path = (new URL(`./${ submoduleObject.name }.sb`, module.path)).href;
            } else {
                try {
                    path = (new URL(pathNode.value, module.path)).href;
                } catch (err) {
                    /* In order to throw an error, try, for instance, the following value of the path: 'ftp::' */
                    throw {
                        code: 'E_CHECK_SUBMODULE_INVALID_URL',
                        message: `a valid URL cannot be constructed from the given path '${ pathNode.value }'`,
                        location: pathNode.location
                    };
                }
            }
            submodule = getModuleByPath(compiler, path);
            if (submodule) {
                /* There is already a module with the constructed path */
                if (submodule.status === 'CHECKED') {
                    /* This module is already checked */
                    /* Everything is OK */
                } else {
                    /* This module is not checked yet */
                    /* Throw an error */
                    throw {
                        code: 'E_CHECK_SUBMODULE_CIRCULAR_IMPORT',
                        message: `sub-module '${ submoduleObject.name }' cannot be imported, because it is not processed yet (circular import)`,
                        location: nameNode.location
                    };
                }
            } else {
                /* There is no module with the constructed path */
                /* Let's create and process one */
                submodule = getNewModule(compiler, path);
                setActiveModuleList(compiler, [submodule.id]);
                module.status = 'CHECKING';
            }
            /* Set this sub-module as a child of the currently active module */
            module.childIdList.push(submodule.id);

            setSubmodulePath(compiler, module, submoduleObject, submodule.path);
            setBlockObject(compiler, module, activeBlockObject, submoduleObject.name, 'submodule', submoduleObject.id, false);
        }
        setNodeObject(compiler, module, node, 'submodule', submoduleObject.id, -1);

        /* We keep this node as an active node */
        /* This allows us to generate better error messages when there are problems with sub-module(s) */
        node.status = '2';
    } else if (node.status === '2') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkIdentifier(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkPath(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkList(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkExternalObject(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[0], node.childIdList[1], node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        let externalObjectNodeListNode = getNodeById(compiler, module, node.parentIdList[0]);
        let importStmtNode = getNodeById(compiler, module, externalObjectNodeListNode.parentIdList[0]);
        let submoduleNode = getNodeById(compiler, module, importStmtNode.childIdList[1]);
        let submoduleObject = getSubmoduleById(compiler, module, submoduleNode.object.id);
        let submodule = getModuleByPath(compiler, submoduleObject.path);

        let externalNameNode = getNodeById(compiler, module, node.childIdList[0]);
        let outerBlockObject = getBlockById(compiler, submodule, 1);
        let outerObject = getBlockObjectByName(compiler, submodule, outerBlockObject, externalNameNode.value);
        let internalNameNode = getNodeById(compiler, module, node.childIdList[1]);
        let typeNode = getNodeById(compiler, module, node.childIdList[2]);
        let typeObject = getTypeById(compiler, module, typeNode.object.id);
        let listNode = getNodeById(compiler, module, node.childIdList[3]);

        if (outerObject.type === 'variable') {
            let outerVariableObject = getVariableById(compiler, submodule, outerObject.idList[0]);

            if (!outerVariableObject.isPrivate) {
                let outerVariableTypeObject = getTypeById(compiler, submodule, outerVariableObject.typeId);

                if ((typeObject.name === outerVariableTypeObject.name) || (typeObject.name === '$v')) {
                    /* Let's set modifiers of the imported variable */
                    /* We copy all the modifiers of the external variable */
                    /* Also, we append an additional modifier 'private' in order to forbid re-export of the imported variable */
                    let outerVariableNode = getNodeById(compiler, submodule, outerVariableObject.nodeId);
                    let outerModifierNodeListNode = getNodeById(compiler, submodule, outerVariableNode.childIdList[0]);
                    let modifierNodeListNode = getNodeCopy(compiler, module, submodule, outerModifierNodeListNode, module, {}, true);
                    let modifierPrivateNode = getNewNode(compiler, module, 'modifier', node.location, [], 'private');
                    let modifierExternalNode = getNewNode(compiler, module, 'modifier', node.location, [], 'external');

                    /* Let's set the type of the imported variable */
                    let variableTypeObject = getTypeByName(compiler, module, outerVariableTypeObject.name);
                    let variableTypeNode;

                    /* This is a node of the imported variable */
                    let variableNode;
                    /* This node encapsulates the node of the imported variable */
                    /* It helps us to store information related to the corresponding external variable, i.e., its ID in the sub-module, etc. */
                    let externalVariableNode;

                    modifierNodeListNode.childIdList.push(modifierPrivateNode.id);
                    modifierPrivateNode.parentIdList.push(modifierNodeListNode.id);
                    modifierNodeListNode.childIdList.push(modifierExternalNode.id);
                    modifierExternalNode.parentIdList.push(modifierNodeListNode.id);

                    if (variableTypeObject) {
                        /* In this module, there is a type with the name equal to the name of the type of the external variable */
                        variableTypeNode = getNodeById(compiler, module, variableTypeObject.nodeId);
                    } else {
                        /* There is no type with the same name */
                        /* Let's create a copy of the type of the external variable */
                        let outerVariableTypeNode = getNodeById(compiler, submodule, outerVariableTypeObject.nodeId);

                        variableTypeNode = getNodeCopy(compiler, module, submodule, outerVariableTypeNode, module, {}, true);
                    }
                    variableNode = getNewNode(compiler, module, 'variable', node.location, [modifierNodeListNode.id, internalNameNode.id, variableTypeNode.id], '');
                    externalVariableNode = getNewNode(compiler, module, 'externalVariable', node.location, [variableNode.id], '');
                    setNodeObject(compiler, module, externalVariableNode, 'variable', outerVariableObject.id, submoduleObject.id);

                    listNode.childIdList.push(externalVariableNode.id);
                    externalVariableNode.parentIdList.push(listNode.id);

                    /* Register this outer variable */
                    submoduleObject.outerObjectNodeIdList.push(outerVariableNode.id);
                } else {
                    throw {
                        code: 'E_CHECK_EXTERNAL_OBJECT_VARIABLE_TYPE_MISMATCH',
                        message: `variable '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }', because the given type ${ getTypeName(compiler, module, typeObject) } does not match with the actual type of the variable ${ getTypeName(compiler, submodule, outerVariableTypeObject) }`,
                        location: node.location
                    };
                }
            } else {
                throw {
                    code: 'E_CHECK_EXTERNAL_OBJECT_VARIABLE_IS_PRIVATE',
                    message: `variable '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }', because '${ externalNameNode.value }' is a private variable`,
                    location: externalNameNode.location
                };
            }
        } else if (outerObject.type === 'function') {
            /* Let's define a list of external functions which are non-private */
            let outerFunctionObjectIdList = [];

            for (let i = 0; i < outerObject.idList.length; i++) {
                let outerFunctionObject = getFunctionById(compiler, submodule, outerObject.idList[i]);

                if (!outerFunctionObject.isPrivate) {
                    outerFunctionObjectIdList.push(outerFunctionObject.id);
                }
            }

            if (0 < outerFunctionObjectIdList.length) {
                /* There is at least one non-private external function */
                let isMatch = false;
                let i = 0;

                /* If a type is provided, then we find and import an external function that has the same type */
                /* Otherwise, we import all external functions */
                while ((!isMatch || (typeObject.name === '$v')) && (i < outerFunctionObjectIdList.length)) {
                    let outerFunctionObject = getFunctionById(compiler, submodule, outerFunctionObjectIdList[i]);
                    let outerFunctionTypeObject = getTypeById(compiler, submodule, outerFunctionObject.typeId);

                    if ((typeObject.name === outerFunctionTypeObject.name) || (typeObject.name === '$v')) {
                        /* Here, we create various nodes in a way similar to the one of variables */
                        let outerFunctionNode = getNodeById(compiler, submodule, outerFunctionObject.nodeId);
                        let outerModifierNodeListNode = getNodeById(compiler, submodule, outerFunctionNode.childIdList[0]);
                        let modifierNodeListNode = getNodeCopy(compiler, module, submodule, outerModifierNodeListNode, module, {}, true);
                        let modifierPrivateNode = getNewNode(compiler, module, 'modifier', node.location, [], 'private');
                        let modifierExternalNode = getNewNode(compiler, module, 'modifier', node.location, [], 'external');
                        let functionTypeObject = getTypeByName(compiler, module, outerFunctionTypeObject.name);
                        let functionTypeNode;
                        let functionNode;
                        let externalFunctionNode;

                        modifierNodeListNode.childIdList.push(modifierPrivateNode.id);
                        modifierPrivateNode.parentIdList.push(modifierNodeListNode.id);
                        modifierNodeListNode.childIdList.push(modifierExternalNode.id);
                        modifierExternalNode.parentIdList.push(modifierNodeListNode.id);

                        if (functionTypeObject) {
                            functionTypeNode = getNodeById(compiler, module, functionTypeObject.nodeId);
                        } else {
                            let outerFunctionTypeNode = getNodeById(compiler, submodule, outerFunctionTypeObject.nodeId);

                            functionTypeNode = getNodeCopy(compiler, module, submodule, outerFunctionTypeNode, module, {}, true);
                        }

                        functionNode = getNewNode(compiler, module, 'function', node.location, [modifierNodeListNode.id, internalNameNode.id, functionTypeNode.id], '');
                        externalFunctionNode = getNewNode(compiler, module, 'externalFunction', node.location, [functionNode.id], '');
                        setNodeObject(compiler, module, externalFunctionNode, 'function', outerFunctionObject.id, submoduleObject.id);

                        listNode.childIdList.push(externalFunctionNode.id);
                        externalFunctionNode.parentIdList.push(listNode.id);

                        isMatch = true;

                        /* Register this outer function, if it is not a template function */
                        if (!outerFunctionObject.isTemplate) {
                            submoduleObject.outerObjectNodeIdList.push(outerFunctionNode.id);
                        }
                    }
                    i++;
                }
                if (!isMatch) {
                    /* If we are here, then a type is provided, but we could not find any external function with the same type */
                    let message = `no function '${ externalNameNode.value }' can be imported from the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }', because the given type ${ getTypeName(compiler, module, typeObject) } does not match with the actual type(s) of the function(s)`;

                    for (let i = 0; i < outerFunctionObjectIdList.length; i++) {
                        let outerFunctionObject = getFunctionById(compiler, submodule, outerFunctionObjectIdList[i]);
                        let outerFunctionTypeObject = getTypeById(compiler, submodule, outerFunctionObject.typeId);

                        if (0 < i) {
                            message += ',';
                        }
                        message += ` ${ getTypeName(compiler, submodule, outerFunctionTypeObject) }`;
                    }
                    throw {
                        code: 'E_CHECK_EXTERNAL_OBJECT_FUNCTION_TYPE_MISMATCH',
                        message: message,
                        location: node.location
                    };
                }
            } else {
                /* Every external function is a private function */
                throw {
                    code: 'E_CHECK_EXTERNAL_OBJECT_FUNCTION_IS_PRIVATE',
                    message: `no function '${ externalNameNode.value }' can be imported from the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }', because every '${ externalNameNode.value }' is a private function`,
                    location: externalNameNode.location
                };
            }
        } else if (outerObject.type === 'submodule') {
            throw {
                code: 'E_CHECK_EXTERNAL_OBJECT_OBJECT_IS_SUBMODULE',
                message: `sub-module '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }'`,
                location: externalNameNode.location
            };
        } else if (outerObject.type === '') {
            throw {
                code: 'E_CHECK_EXTERNAL_OBJECT_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ externalNameNode.value }' in the sub-module '${ submoduleObject.name }' located at '${ submoduleObject.path }'`,
                location: externalNameNode.location
            };
        }
        setActiveNodeList(compiler, module, [listNode.id]);
        node.status = '2';
    } else if (node.status === '2') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkOperator(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkExternalVariable(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkExternalFunction(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkVariable(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        let modifierNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let nameNode = getNodeById(compiler, module, node.childIdList[1]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let typeNode = getNodeById(compiler, module, node.childIdList[2]);
        let typeObject = getTypeById(compiler, module, typeNode.object.id);
        let variableObject = getNewVariable(compiler, module, node.id, false, false, false, false, nameNode.value, typeObject.id);

        /* Set modifiers */
        for (let i = 0; i < modifierNodeListNode.childIdList.length; i++) {
            let modifierNode = getNodeById(compiler, module, modifierNodeListNode.childIdList[i]);

            if (modifierNode.value === 'constant') {
                if (!variableObject.isConstant) {
                    variableObject.isConstant = true;
                } else {
                    throw {
                        code: 'E_CHECK_VARIABLE_REPETITIVE_MODIFIER',
                        message: 'the modifier \'constant\' is already declared',
                        location: modifierNode.location
                    };
                }
            } else if (modifierNode.value === 'private') {
                if (variableObject.index === -1) {
                    if (!variableObject.isPrivate) {
                        variableObject.isPrivate = true;
                    } else {
                        throw {
                            code: 'E_CHECK_VARIABLE_REPETITIVE_MODIFIER',
                            message: 'the modifier \'private\' is already declared',
                            location: modifierNode.location,
                            note: 'if a variable is imported from a sub-module, then it is declared as a private variable by default'
                        };
                    }
                } else {
                    throw {
                        code: 'E_CHECK_VARIABLE_PRIVATE_LOCAL',
                        message: 'the modifier \'private\' is not valid for a local variable',
                        location: modifierNode.location
                    };
                }
            } else if (modifierNode.value === 'parameter') {
                /* Built-in modifier */
                variableObject.isParameter = true;
            } else if (modifierNode.value === 'external') {
                /* Built-in modifier */
                variableObject.isExternal = true;
            } else {
                throw {
                    code: 'E_CHECK_VARIABLE_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a variable`,
                    location: modifierNode.location,
                    note: 'the following modifiers are valid for a variable: constant, private'
                };
            }
        }

        /* If this variable is not a parameter, then its type must be a fixed type */
        if (!variableObject.isParameter && typeObject.isVariable) {
            let typeVariableNode = getTypeVariableNode(compiler, module, typeNode);
            let typeVariableObject = getTypeById(compiler, module, typeVariableNode.object.id);

            throw {
                code: 'E_CHECK_VARIABLE_TYPE_VARIABLE_IS_UNDEFINED',
                message: `value of type variable ${ getTypeName(compiler, module, typeVariableObject) } is not defined`,
                location: typeVariableNode.location
            };
        }

        /* Check name */
        if (variableObject.name === 'start') {
            /* The name 'start' is reserved for the starting function */
            throw {
                code: 'E_CEHCK_VARIABLE_START',
                message: `the name '${ variableObject.name }' is reserved for the optional starting function of the module`,
                location: nameNode.location
            };
        }

        /* Register this variable */
        if (object.type === 'variable') {
            let $variableObject = getVariableById(compiler, module, object.idList[0]);
            let $variableNode = getNodeById(compiler, module, $variableObject.nodeId);

            throw {
                code: 'E_CHECK_VARIABLE_REPETITIVE_NAME',
                message: `variable '${ variableObject.name }' cannot be created, because there is already a variable with the same name defined on the line ${ $variableNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === 'function') {
            let functionObject = getFunctionById(compiler, module, object.idList[0]);
            let functionNode = getNodeById(compiler, module, functionObject.nodeId);

            throw {
                code: 'E_CHECK_VARIABLE_REPETITIVE_NAME',
                message: `variable '${ variableObject.name }' cannot be created, because there is already a function with the same name defined on the line ${ functionNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === 'submodule') {
            let submoduleObject = getSubmoduleById(compiler, module, object.idList[0]);
            let submoduleNode = getNodeById(compiler, module, submoduleObject.nodeId);

            throw {
                code: 'E_CHECK_VARIABLE_REPETITIVE_NAME',
                message: `variable '${ variableObject.name }' cannot be created, because there is already a sub-module with the same name defined on the line ${ submoduleNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            setBlockObject(compiler, module, getActiveBlock(compiler, module), variableObject.name, 'variable', variableObject.id, false);
        }

        setNodeObject(compiler, module, node, 'variable', variableObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkBasicType(compiler, module, node) {
    if (node.status === 'CREATED') {
        let name = node.value;
        let typeObject = getTypeByName(compiler, module, name);

        /* Check if there is a type with the same name */
        if (!typeObject) {
            /* There is no type with the given name */
            /* Let's create a new one */
            typeObject = getNewType(compiler, module, node.id, 'basic', name, [], -1, false);
        }
        setNodeObject(compiler, module, node, 'type', typeObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkFunction(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        let modifierNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let nameNode = getNodeById(compiler, module, node.childIdList[1]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let typeNode = getNodeById(compiler, module, node.childIdList[2]);
        let typeObject = getTypeById(compiler, module, typeNode.object.id);
        let functionObject = getNewFunction(compiler, module, node.id, false, false, false, false, nameNode.value, typeObject.id);

        /* Check if this function is a copy of a template function */
        if (node.isCopy) {
            object.type = '';
            object.idList = [];
        }

        /* Set modifiers */
        for (let i = 0; i < modifierNodeListNode.childIdList.length; i++) {
            let modifierNode = getNodeById(compiler, module, modifierNodeListNode.childIdList[i]);

            if (modifierNode.value === 'private') {
                if (!functionObject.isPrivate) {
                    functionObject.isPrivate = true;
                } else {
                    throw {
                        code: 'E_CHECK_FUNCTION_REPETITIVE_MODIFIER',
                        message: 'the modifier \'private\' is already declared',
                        location: modifierNode.location,
                        note: 'if a function is imported from a sub-module, then it is declared as a private function by default'
                    };
                }
            } else if (modifierNode.value === 'template') {
                /* Built-in modifier */
                functionObject.isTemplate = true;
            } else if (modifierNode.value === 'instruction') {
                /* Built-in modifier */
                functionObject.isInstruction = true;
            } else if (modifierNode.value === 'external') {
                /* Built-in modifier */
                functionObject.isExternal = true;
            } else {
                throw {
                    code: 'E_CHECK_FUNCTION_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a function`,
                    location: modifierNode.location,
                    note: 'the following modifier is valid for a function: private'
                };
            }
        }

        /* If this function is not a template function, then its type must be a fixed type */
        if (!functionObject.isTemplate && typeObject.isVariable) {
            let typeVariableNode = getTypeVariableNode(compiler, module, typeNode);
            let typeVariableObject = getTypeById(compiler, module, typeVariableNode.object.id);

            throw {
                code: 'E_CHECK_FUNCTION_TYPE_VARIABLE_IS_NOT_DEFINED',
                message: `value of type variable ${ getTypeName(compiler, module, typeVariableObject) } is not defined`,
                location: typeVariableNode.location
            };
        }

        /* Check name */
        if (!functionObject.isInstruction && (nameNode.name === 'instruction') && !module.isLibrary) {
            throw {
                code: 'E_CHECK_FUNCTION_INSTRUCTION',
                message: `custom instruction '${ functionObject.name }' cannot be created in a module that is stored outside the library folder; the folder '${ compiler.options.libraryFolder }' is set as a library folder`,
                location: nameNode.location
            };
        }
        if (functionObject.name === 'start') {
            /* Check if the signature of the starting function is correct */
            if ((typeObject.fromIdList.length > 0) || (typeObject.toId !== getTypeByName(compiler, module, '$v').id)) {
                throw {
                    code: 'E_CHECK_FUNCTION_START_SIGNATURE',
                    message: `the signature of the starting function '${ functionObject.name }' is ${ getTypeName(compiler, module, typeObject) }; expected '[] -> []'`,
                    location: nameNode.location
                };
            }
        }

        /* Register this function */
        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableNode = getNodeById(compiler, module, variableObject.nodeId);

            throw {
                code: 'E_CHECK_FUNCTION_REPETITIVE_NAME',
                message: `function '${ functionObject.name }' cannot be created, because there is already a variable with the same name defined on the line ${ variableNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === 'function') {
            /* There is already at least one function with the same name */
            /* Let's compare the types of parameters */
            /* If they match, then throw an error */

            let isMatch = false;
            let i = 0;

            while (!isMatch && (i < object.idList.length)) {
                let $functionObject = getFunctionById(compiler, module, object.idList[i]);
                let $typeObject = getTypeById(compiler, module, $functionObject.typeId);

                if (typeObject.fromIdList.length === $typeObject.fromIdList.length) {
                    let j = 0;

                    isMatch = true;
                    while (isMatch && (j < typeObject.fromIdList.length)) {
                        let fromTypeObject = getTypeById(compiler, module, typeObject.fromIdList[j]);
                        let $fromTypeObject = getTypeById(compiler, module, $typeObject.fromIdList[j]);

                        if (!isTypeEquivalentTo(compiler, module, fromTypeObject, $fromTypeObject)) {
                            isMatch = false;
                        }
                        j++;
                    }
                }
                i++;
            }
            if (!isMatch) {
                setBlockObject(compiler, module, getActiveBlock(compiler, module), functionObject.name, 'function', functionObject.id, functionObject.isTemplate);
            } else {
                let $functionObject = getFunctionById(compiler, module, object.idList[i - 1]);
                let $functionNode = getNodeById(compiler, module, $functionObject.nodeId);

                throw {
                    code: 'E_CHECK_FUNCTION_SIGNATURE_MATCH',
                    message: `function '${ functionObject.name }' cannot be created, because its signature is equivalent to the signature of the function '${ $functionObject.name  }' defined on the line ${ $functionNode.location.first_line }`,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'submodule') {
            let submoduleObject = getSubmoduleById(compiler, module, object.idList[0]);
            let submoduleNode = getNodeById(compiler, module, submoduleObject.nodeId);

            throw {
                code: 'E_CHECK_FUNCTION_REPETITIVE_NAME',
                message: `function '${ functionObject.name }' cannot be created, because there is already a sub-module with the same name defined on the line ${ submoduleNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            setBlockObject(compiler, module, getActiveBlock(compiler, module), functionObject.name, 'function', functionObject.id, false);
        }

        setNodeObject(compiler, module, node, 'function', functionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkReferenceType(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let name = '[';
        let fromTypeNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let fromTypeObjectIdList = [];
        let toTypeNode = getNodeById(compiler, module, node.childIdList[1]);
        let toTypeObject = getTypeById(compiler, module, toTypeNode.object.id);
        let typeObject;
        let isVariable = false;

        /* Construct the name of the type */
        for (let i = 0; i < fromTypeNodeListNode.childIdList.length; i++) {
            let fromTypeNode = getNodeById(compiler, module, fromTypeNodeListNode.childIdList[i]);
            let fromTypeObject = getTypeById(compiler, module, fromTypeNode.object.id);

            if (i > 0) {
                name += ', ';
            }
            name += fromTypeObject.name;
            fromTypeObjectIdList.push(fromTypeObject.id);
            if (fromTypeObject.isVariable) {
                isVariable = true;
            }
        }
        name += '] -> [';
        if (toTypeObject.id !== getTypeByName(compiler, module, '$v').id) {
            name += toTypeObject.name;
        }
        name += ']';
        if (toTypeObject.isVariable) {
            isVariable = true;
        }

        /* Check if there is a type with the same name */
        typeObject = getTypeByName(compiler, module, name);
        if (!typeObject) {
            /* Create a new type with the constructed name */
            typeObject = getNewType(compiler, module, node.id, 'reference', name, fromTypeObjectIdList, toTypeObject.id, isVariable);
        }

        setNodeObject(compiler, module, node, 'type', typeObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkVoid(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, false, [getTypeByName(compiler, module, '$v').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkInitializationStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        /* First of all, we process the expression, later we process the variable */
        /* This allows us to avoid the case when the expression contains the name of the variable */
        setActiveNodeList(compiler, module, [node.childIdList[1], node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let variableNode = getNodeById(compiler, module, node.childIdList[0]);
        let variableObject = getVariableById(compiler, module, variableNode.object.id);
        let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);
        let expressionNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

        if ((variableObject.index > -1) || expressionObject.isLiteral) {
            if (variableTypeObject.id === getTypeByName(compiler, module, '$v').id) {
                /* The type of variable is not declared */
                /* Let's try to infer it */
                let expressionTypeObject = getExpressionType(compiler, module, expressionObject);

                if (expressionTypeObject && !isTypeVoid(compiler, module, expressionTypeObject)) {
                    /* The type of expression is unique and is not equal to 'void' */
                    /* The type of variable is now equal to the type of the expression */
                    variableObject.typeId = expressionTypeObject.id;
                } else {
                    throw {
                        code: 'E_CHECK_INITIALIZATION_EXPRESSION_TYPE_IS_INVALID',
                        message: `type of variable '${ variableObject.name }' cannot be inferred, because type of expression is ${ getExpressionTypeName(compiler, module, expressionObject) }`,
                        location: expressionNode.location
                    };
                }
            } else {
                if (!isExpressionInstanceOf(compiler, module, expressionObject, variableTypeObject, true, {})) {
                    throw {
                        code: 'E_CHECK_INITIALIZATION_TYPE_MISMATCH',
                        message: `the type of the expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, variableTypeObject) }`,
                        location: expressionNode.location
                    };
                }
            }
        } else {
            throw {
                code: 'E_CHECK_INITIALIZATION_GLOBAL_NON_LITERAL_VALUE',
                message: 'a global variable cannot be initialized with a non-literal value',
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkIntegerSingleSigned(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$i').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkIntegerSingleUnsigned(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$iu').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkIntegerDouble(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$id').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkFloatingPointSingle(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$f').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkFloatingPointDouble(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$fd').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkBoolean(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$b').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkFunctionStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let functionNode = getNodeById(compiler, module, node.childIdList[0]);
        let functionObject = getFunctionById(compiler, module, functionNode.object.id);

        unsetActiveNode(compiler, module);
        if (functionObject.isTemplate) {
            /* Template functions are not checked */
            /* Copies of template functions are checked */
            node.status = 'CHECKED';
        } else {
            node.status = '2';
        }
    } else if (node.status === '2') {
        let functionNode = getNodeById(compiler, module, node.childIdList[0]);
        let functionObject = getFunctionById(compiler, module, functionNode.object.id);
        let blockObject = getNewBlock(compiler, module, 'function', functionObject.id);

        functionObject.blockId = blockObject.id;
        setActiveBlock(compiler, module, functionObject.blockId);
        setActiveNodeList(compiler, module, [node.childIdList[1], node.childIdList[2]]);
        node.status = '3';
    } else if (node.status === '3') {
        let functionNode = getNodeById(compiler, module, node.childIdList[0]);
        let functionObject = getFunctionById(compiler, module, functionNode.object.id);
        let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
        let functionToTypeObject = getTypeById(compiler, module, functionTypeObject.toId);

        if (functionToTypeObject.id !== getTypeByName(compiler, module, '$v').id) {
            /* This function should return an expression */
            let blockNode = getNodeById(compiler, module, node.childIdList[2]);
            let blockNodeIdStack = [];

            while (blockNode) {
                let lastStmtNode = getNodeById(compiler, module, blockNode.childIdList[blockNode.childIdList.length - 1]);

                if (lastStmtNode.name !== 'returnStmt') {
                    if (lastStmtNode.name === 'ifElseStmt') {
                        let ifBlockNode = getNodeById(compiler, module, lastStmtNode.childIdList[1]);
                        let elseBlockNode = getNodeById(compiler, module, lastStmtNode.childIdList[2]);

                        blockNodeIdStack.unshift(ifBlockNode.id, elseBlockNode.id);
                    } else {
                        throw {
                            code: 'E_CHECK_FUNCTION_RETURN_IS_MISSING',
                            message: `the function '${ functionObject.name }' defined on line ${ functionNode.location.first_line } doesn't return on every branch; it must return an expression of type ${ getTypeName(compiler, module, functionToTypeObject) } above the line ${ lastStmtNode.location.last_line }`
                        };
                    }
                }
                blockNode = getNodeById(compiler, module, blockNodeIdStack.shift());
            }
        }
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkNonModuleBlock(compiler, module, node) {
    if (node.status === 'CREATED') {
        let blockObject = getNewBlock(compiler, module, '', -1);

        setActiveBlock(compiler, module, blockObject.id);
        setNodeObject(compiler, module, node, 'block', blockObject.id, -1);
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkAssignmentToNameStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let expressionNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            setNodeObject(compiler, module, nameNode, 'variable', variableObject.id, -1);
            if (!variableObject.isConstant) {
                if (!isExpressionInstanceOf(compiler, module, expressionObject, variableTypeObject, true, {})) {
                    throw {
                        code: 'E_CHECK_ASSIGNMENT_TO_NAME_VARIABLE_TYPE_MISMATCH',
                        message: `the type of the expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, variableTypeObject) }`,
                        location: expressionNode.location
                    };
                }
            } else {
                throw {
                    code: 'E_CHECK_ASSIGNMENT_TO_NAME_VARIABLE_CONSTANT',
                    message: 'assignment to a variable with the modifier \'constant\' is not allowed',
                    location: nameNode.location
                };
            }
        } else if (object.type === 'function') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_TO_NAME_FUNCTION',
                message: 'assignment to a function is not allowed',
                location: nameNode.location
            };
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_TO_NAME_SUBMODULE',
                message: 'assignment to a sub-module is not allowed',
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_TO_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkNothingStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkIfElseStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let expectedExpressionTypeObject = getTypeByName(compiler, module, '$b');

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject, true, {})) {
            throw {
                code: 'E_CHECK_IF_ELSE_TYPE_MISMATCH',
                message: `the type of the 'if-else' expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkWhileStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let expectedExpressionTypeObject = getTypeByName(compiler, module, '$b');

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject, true, {})) {
            throw {
                code: 'E_CHECK_WHILE_TYPE_MISMATCH',
                message: `the type of the 'while' expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkReturnStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let functionObject = getActiveFunction(compiler, module);
        let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
        let functionToTypeObject = getTypeById(compiler, module, functionTypeObject.toId);

        if (!isExpressionInstanceOf(compiler, module, expressionObject, functionToTypeObject, true, {})) {
            throw {
                code: 'E_CHECK_RETURN_TYPE_MISMATCH',
                message: `the type of the returned expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, functionToTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkReference(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let activeBlock = getActiveBlock(compiler, module);
        let object = getBlockObjectByName(compiler, module, activeBlock, nameNode.value);
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if (object.type === 'variable') {
            throw {
                code: 'E_CHECK_REFERENCE_VARIABLE',
                message: `'${ nameNode.value }' is a variable; reference to a variable cannot be created`,
                location: nameNode.location
            };
        } else if (object.type === 'function') {
            for (let i = 0; i < object.idList.length; i++) {
                let functionObject = getFunctionById(compiler, module, object.idList[i]);

                if (!functionObject.isInstruction) {
                    if (!functionObject.isTemplate) {
                        let idIndex = -1;

                        if (functionObject.referenceIndex === -1) {
                            setFunctionReferenceIndex(compiler, module, functionObject);
                        }
                        if (!isExpressionTypeSet(compiler, module, expressionObject)) {
                            idIndex = 0;
                        }
                        setExpressionType(compiler, module, expressionObject, functionObject.typeId, idIndex);
                        setExpressionValue(compiler, module, expressionObject, functionObject.id, idIndex);
                    } else {
                        /* We don't create references to template functions */
                        /* There is no error, we just skip template functions */
                    }
                } else {
                    throw {
                        code: 'E_CHECK_REFERENCE_INSTRUCTION',
                        message: `'${ nameNode.value }' is a built-in function; reference to a built-in function cannot be created`,
                        location: nameNode.location
                    };
                }
            }
            if (!isExpressionTypeSet(compiler, module, expressionObject)) {
                let message = `'${ nameNode.value }' is a template function; reference to a template function cannot be created`;

                if (1 < object.idList.length) {
                    message = `every ${ message }`;
                }
                throw {
                    code: 'E_CHECK_REFERENCE_TEMPLATE_FUNCTION',
                    message: message,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_REFERENCE_SUBMODULE',
                message: `'${ nameNode.value }' is a sub-module; reference to a sub-module cannot be created`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_REFERENCE_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkExternalIdentifier(compiler, module, node) {
    if (node.status === 'CREATED') {
        let object = getBlockObjectByName(compiler, module, getBlockById(compiler, module, 1), node.value);

        if (object.type === '') {
            /* This external object is not imported yet */
            /* Let's try to import it */

            let submoduleNameNode = getNodeById(compiler, module, node.childIdList[0]);
            let externalNameNode = getNodeById(compiler, module, node.childIdList[1]);

            object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), submoduleNameNode.value);
            if (object.type === 'variable') {
                throw {
                    code: 'E_CHECK_EXTERNAL_IDENTIFIER_VARIABLE',
                    message: `'${ submoduleNameNode.value }' is a variable; '${ externalNameNode.value }' cannot be imported from a variable; '${ submoduleNameNode.value }' must be a sub-module`,
                    location: node.location
                };
            } else if (object.type === 'function') {
                throw {
                    code: 'E_CHECK_EXTERNAL_IDENTIFIER_FUNCTION',
                    message: `'${ submoduleNameNode.value }' is a function; '${ externalNameNode.value }' cannot be imported from a function; '${ submoduleNameNode.value }' must be a sub-module`,
                    location: node.location
                };
            } else if (object.type === 'submodule') {
                /* We are trying to import from a real sub-module */
                /* Behind the scene, 'submoduleName.name' is equivalent to the following statement: 'use name as submoduleName.name from submodule' */

                let submoduleObject = getSubmoduleById(compiler, module, object.idList[0]);
                let submoduleNode = getNodeById(compiler, module, submoduleObject.nodeId);
                let importStmtNode = getNodeById(compiler, module, submoduleNode.parentIdList[0]);
                let externalObjectNodeListNode = getNodeById(compiler, module, importStmtNode.childIdList[0]);
                let externalObjectNode = getNewNode(compiler, module, 'externalObject', node.location, [
                    externalNameNode.id,
                    getNewNode(compiler, module, 'list', node.location, [
                        getNewNode(compiler, module, 'object', node.location, [
                            getNewNode(compiler, module, 'list', node.location, [
                                getNewNode(compiler, module, 'modifier', node.location, [], 'private').id
                            ], '').id,
                            getNewNode(compiler, module, 'identifier', node.location, [], node.value).id,
                            -1
                        ], '').id
                    ], '').id
                ], '');

                externalObjectNodeListNode.childIdList.push(externalObjectNode.id);
                externalObjectNode.parentIdList.push(externalObjectNodeListNode.id);
                setActiveNodeList(compiler, module, [externalObjectNode.id]);
            } else if (object.type === '') {
                throw {
                    code: 'E_CHECK_EXTERNAL_IDENTIFIER_OBJECT_NOT_FOUND',
                    message: `there is no object associated with the name '${ submoduleNameNode.value }'`,
                    location: submoduleNameNode.location
                };
            }
        }
        setActiveBlock(compiler, module, 1);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkName(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkInstruction(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkCallByName(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let activeBlockObject = getActiveBlock(compiler, module);
        let object = getBlockObjectByName(compiler, module, activeBlockObject, nameNode.value);

        if (nameNode.name === 'operator') {
            /* Operator overloading */
            let operators = {
                '-': '$sub',
                '+': '$add',
                '*': '$mul',
                '/': '$div',
                '%': '$rem',
                '==': '$eq',
                '!=': '$ne',
                '<': '$lt',
                '>': '$gt',
                '<=': '$le',
                '>=': '$ge',
                'not': '$not',
                'and': '$and',
                'or': '$or',
                '&': '$join'
            };

            if (Object.hasOwn(operators, nameNode.value)) {
                let name = operators[nameNode.value];
                let idList = getBlockObjectByName(compiler, module, activeBlockObject, name).idList;

                object.type = 'function';
                for (let i = 0; i < idList.length; i++) {
                    object.idList.push(idList[i]);
                }
            }
        }

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            if (variableTypeObject.kind === 'reference') {
                let isMatch = false;

                if (argumentNodeListNode.childIdList.length === variableTypeObject.fromIdList.length) {
                    let i = 0;

                    isMatch = true;
                    while (isMatch && (i < argumentNodeListNode.childIdList.length)) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                        let fromTypeObject = getTypeById(compiler, module, variableTypeObject.fromIdList[i]);

                        if (!isExpressionInstanceOf(compiler, module, argumentObject, fromTypeObject, true, {})) {
                            isMatch = false;
                        }
                        i++;
                    }
                }
                if (isMatch) {
                    let variableNode = getNodeById(compiler, module, variableObject.nodeId);

                    node.childIdList.push(variableNode.id);
                    variableNode.parentIdList.push(node.id);
                } else {
                    let message = `value of variable '${ nameNode.value }' is a reference to a function defined with`;

                    if (variableTypeObject.fromIdList.length === 0) {
                        message += ' no parameters';
                    } else {
                        message += ` ${ variableTypeObject.fromIdList.length } parameter(s) of the following type(s):`;
                        for (let i = 0; i < variableTypeObject.fromIdList.length; i++) {
                            let fromTypeObject = getTypeById(compiler, module, variableTypeObject.fromIdList[i]);

                            if (0 < i) {
                                message += ',';
                            }
                            message += ` ${ getTypeName(compiler, module, fromTypeObject) }`;
                        }
                    }
                    message += ', but this function is called with';
                    if (argumentNodeListNode.childIdList.length === 0) {
                        message += ' no arguments';
                    } else {
                        message += ` ${ argumentNodeListNode.childIdList.length } argument(s) of the following type(s):`;
                        for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                            let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                            let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

                            if (0 < i) {
                                message += ',';
                            }
                            message += ` ${ getExpressionTypeName(compiler, module, argumentObject) }`;
                        }
                    }
                    throw {
                        code: 'E_CHECK_CALL_BY_NAME_INVALID_ARGUMENT_LIST',
                        message: message,
                        location: nameNode.location
                    };
                }
            } else if ((variableTypeObject.name === '$s') || (variableTypeObject.kind === 'array')) {
                if (nameNode.name === 'name') {
                    let variableNode = getNodeById(compiler, module, variableObject.nodeId);

                    node.childIdList.push(variableNode.id);
                    variableNode.parentIdList.push(node.id);
                } else {
                    /* We have the case 'name[argumentList]', where 'name' is a variable and its value is either a string or an array */
                    /* Here, we replace 'name[argumentList]' with '$getElement[name, argumentList]' */
                    let callByNameNode = getNewNode(compiler, module, 'callByName', node.location, [
                        getNewNode(compiler, module, 'instruction', nameNode.location, [], '$getElement').id,
                        getNewNode(compiler, module, 'list', argumentNodeListNode.location, [
                            getNewNode(compiler, module, 'callByName', nameNode.location, [
                                getNewNode(compiler, module, 'name', nameNode.location, [nameNode.id], nameNode.value).id,
                                getNewNode(compiler, module, 'list', nameNode.location, [], '').id
                            ], '').id
                        ].concat(argumentNodeListNode.childIdList), '').id
                    ], '');

                    node.childIdList.push(callByNameNode.id);
                    callByNameNode.parentIdList.push(node.id);
                    setActiveNodeList(compiler, module, [callByNameNode.id]);
                }
            } else {
                if (nameNode.name === 'name') {
                    let variableNode = getNodeById(compiler, module, variableObject.nodeId);

                    node.childIdList.push(variableNode.id);
                    variableNode.parentIdList.push(node.id);
                } else {
                    throw {
                        code: 'E_CHECK_CALL_BY_NAME_VARIABLE_TYPE_MISMATCH',
                        message: `value of variable '${ nameNode.value }' is neither a reference to a function nor a string nor an array`,
                        location: nameNode.location
                    };
                }
            }
        } else if (object.type === 'function') {
            let isMatch = false;
            let i = 0;

            /* This object maps names of type variables to values of them, i.e., to the corresponding ids */
            let typeVariables = {};

            while (!isMatch && (i < object.idList.length)) {
                let functionObject = getFunctionById(compiler, module, object.idList[i]);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);

                if (argumentNodeListNode.childIdList.length === functionTypeObject.fromIdList.length) {
                    let j = 0;

                    isMatch = true;
                    typeVariables = {};
                    while (isMatch && (j < argumentNodeListNode.childIdList.length)) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[j]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                        let fromTypeObject = getTypeById(compiler, module, functionTypeObject.fromIdList[j]);

                        if (!isExpressionInstanceOf(compiler, module, argumentObject, fromTypeObject, true, typeVariables)) {
                            isMatch = false;
                        }
                        j++;
                    }
                }
                i++;
            }
            if (isMatch) {
                let functionObject = getFunctionById(compiler, module, object.idList[i - 1]);
                let functionNode = getNodeById(compiler, module, functionObject.nodeId);

                if (functionObject.isTemplate) {
                    if (functionObject.isInstruction) {
                        /* This template function is an instruction defined locally */
                        let listNode = getNodeById(compiler, module, functionNode.parentIdList[0]);
                        let functionNodeCopy = getNodeCopy(compiler, module, module, functionNode, module, typeVariables, false);

                        listNode.childIdList.push(functionNodeCopy.id);
                        functionNodeCopy.parentIdList.push(listNode.id);

                        node.childIdList.push(functionNodeCopy.id);
                        functionNodeCopy.parentIdList.push(node.id);

                        setActiveNodeList(compiler, module, [functionNodeCopy.id]);
                        setActiveBlock(compiler, module, 0);
                    } else if (functionObject.isExternal) {
                        /* This template function is defined in a sub-module */
                        /* Here, first of all, we make a copy of that function in the sub-module with the calculated values of the corresponding variable types */
                        /* Next, we process the copied non-template function in the sub-module */
                        /* Finally, we create and process corresponding nodes which represent the processed non-template function in this module */

                        let externalFunctionNode = getNodeById(compiler, module, functionNode.parentIdList[0]);
                        let externalFunctionNodeCopy;
                        let externalFunctionNodeListNode = getNodeById(compiler, module, externalFunctionNode.parentIdList[0]);

                        let submoduleObject = getSubmoduleById(compiler, module, externalFunctionNode.object.submoduleId);
                        let submodule = getModuleByPath(compiler, submoduleObject.path);

                        let outerTypeVariables = {};
                        let outerFunctionObject = getFunctionById(compiler, submodule, externalFunctionNode.object.id);
                        let outerFunctionNode = getNodeById(compiler, submodule, outerFunctionObject.nodeId);
                        let outerFunctionNodeCopy;
                        let outerFunctionStmtNode = getNodeById(compiler, submodule, outerFunctionNode.parentIdList[0]);
                        let outerFunctionStmtNodeCopy;
                        let outerModuleBlockNode = getNodeById(compiler, submodule, outerFunctionStmtNode.parentIdList[0]);
                        let outerModuleStmtNode = getNodeById(compiler, submodule, outerModuleBlockNode.parentIdList[0]);
                        let outerTypeNodeListNode = getNodeById(compiler, submodule, outerModuleStmtNode.childIdList[0]);

                        /* The variable 'typeVariables' stores types which are defined in this module only */
                        /* Let's make a copy of every type that is not present in the sub-module */
                        for (let name in typeVariables) {
                            if (Object.hasOwn(typeVariables, name)) {
                                let typeNode = getNodeById(compiler, module, typeVariables[name]);
                                let typeObject = getTypeById(compiler, module, typeNode.object.id);
                                let outerTypeObject = getTypeByName(compiler, submodule, typeObject.name);
                                let outerTypeNode;

                                if (outerTypeObject) {
                                    outerTypeNode = getNodeById(compiler, submodule, outerTypeObject.nodeId);
                                } else {
                                    outerTypeNode = getNodeCopy(compiler, module, module, typeNode, submodule, {}, true);
                                    outerTypeNodeListNode.childIdList.push(outerTypeNode.id);
                                    outerTypeNode.parentIdList.push(outerTypeNodeListNode.id);
                                }
                                outerTypeVariables[name] = outerTypeNode.id;
                            }
                        }

                        /* Let's copy the outer template function from the sub-module in the sub-module itself */
                        outerFunctionStmtNodeCopy = getNodeCopy(compiler, module, submodule, outerFunctionStmtNode, submodule, outerTypeVariables, false);
                        outerModuleBlockNode.childIdList.push(outerFunctionStmtNodeCopy.id);
                        outerFunctionStmtNodeCopy.parentIdList.push(outerModuleBlockNode.id);

                        /* Let's prepare to process the outer non-template function that we just copied */
                        /* Note that the copy is no longer a template function, it is a regular function */
                        setActiveNodeList(compiler, submodule, [outerFunctionStmtNodeCopy.id, outerFunctionStmtNodeCopy.id]);
                        setActiveBlock(compiler, submodule, 1);
                        setActiveModuleList(compiler, [submodule.id]);
                        submodule.status = 'PARSED';
                        module.status = 'CHECKING';

                        /* Let's create several nodes which will represent the just created outer non-template function in this module */
                        externalFunctionNodeCopy = getNodeCopy(compiler, module, module, externalFunctionNode, module, typeVariables, false);

                        /* The just copied outer non-template function is not processed yet in the sub-module */
                        /* Therefore, we do not know the ID of the corresponding function object */
                        /* Instead of ID of the function, we store ID of the node of that function */
                        /* Later we will fix this inconsistency */
                        outerFunctionNodeCopy = getNodeById(compiler, submodule, outerFunctionStmtNodeCopy.childIdList[0]);
                        setNodeObject(compiler, module, externalFunctionNodeCopy, 'function', outerFunctionNodeCopy.id, submoduleObject.id);
                        externalFunctionNodeListNode.childIdList.push(externalFunctionNodeCopy.id);
                        externalFunctionNodeCopy.parentIdList.push(externalFunctionNodeListNode.id);

                        /* Register this outer non-template function */
                        submoduleObject.outerObjectNodeIdList.push(outerFunctionNodeCopy.id);

                        /* Let's prepare to process the corresponding nodes which represent the outer non-template function in this module */
                        node.childIdList.push(externalFunctionNodeCopy.id);
                        externalFunctionNodeCopy.parentIdList.push(node.id);

                        setActiveNodeList(compiler, module, [externalFunctionNodeCopy.id]);
                        setActiveBlock(compiler, module, 1);
                    } else {
                        /* This template function is defined locally */
                        let functionStmtNode = getNodeById(compiler, module, functionNode.parentIdList[0]);
                        let moduleBlockNode = getNodeById(compiler, module, functionStmtNode.parentIdList[0]);
                        let functionStmtNodeCopy = getNodeCopy(compiler, module, module, functionStmtNode, module, typeVariables, false);
                        let functionNodeCopy = getNodeById(compiler, module, functionStmtNodeCopy.childIdList[0]);

                        moduleBlockNode.childIdList.push(functionStmtNodeCopy.id);
                        functionStmtNodeCopy.parentIdList.push(moduleBlockNode.id);

                        node.childIdList.push(functionNodeCopy.id);
                        functionNodeCopy.parentIdList.push(node.id);

                        setActiveNodeList(compiler, module, [functionStmtNodeCopy.id, functionStmtNodeCopy.id]);
                        setActiveBlock(compiler, module, 1);
                    }
                } else {
                    node.childIdList.push(functionNode.id);
                    functionNode.parentIdList.push(node.id);

                    /* Here, we don't need to reset an active block, but we do this due to consistency (see above) */
                    setActiveBlock(compiler, module, activeBlockObject.id);
                }
            } else {
                let message = `function '${ nameNode.value }' is called with`;

                if (argumentNodeListNode.childIdList.length === 0) {
                    message += ' no arguments';
                } else {
                    message += ` ${ argumentNodeListNode.childIdList.length } argument(s) of the following type(s):`
                    for (let j = 0; j < argumentNodeListNode.childIdList.length; j++) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[j]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

                        if (0 < j) {
                            message += ',';
                        }
                        message += ` ${ getExpressionTypeName(compiler, module, argumentObject) }`;
                    }
                }
                message += `, but there is no function '${ nameNode.value }' defined with`;
                if (argumentNodeListNode.childIdList.length === 0) {
                    message += ' no parameters';
                } else {
                    message += ` ${ argumentNodeListNode.childIdList.length } parameter(s) of the mentioned type(s)`;
                }
                throw {
                    code: 'E_CHECK_CALL_BY_NAME_FUNCTION_NOT_FOUND',
                    message: message,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_CALL_BY_NAME_SUBMODULE',
                message: `'${ nameNode.value }' is a sub-module; a sub-module cannot be used as call target`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_CALL_BY_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        node.status = '2';
    } else if (node.status === '2') {
        let objectNode = getNodeById(compiler, module, node.childIdList[2]);

        if (objectNode.name === 'externalFunction') {
            /* We had to work with an outer template function defined in a sub-module */
            let functionNode = getNodeById(compiler, module, objectNode.childIdList[0]);
            let submoduleObject = getSubmoduleById(compiler, module, objectNode.object.submoduleId);
            let submodule = getModuleByPath(compiler, submoduleObject.path);
            let outerFunctionNode = getNodeById(compiler, submodule, objectNode.object.id);
            let outerFunctionObject = getFunctionById(compiler, submodule, outerFunctionNode.object.id);

            /* Restore stack of blocks in the sub-module */
            unsetActiveBlock(compiler, submodule);

            /* Fix the inconsistency related to the ID of the outer function */
            setNodeObject(compiler, module, objectNode, 'function', outerFunctionObject.id, submoduleObject.id);

            node.childIdList[2] = functionNode.id;
        }
        node.status = '3';
    } else if (node.status === '3') {
        let objectNode = getNodeById(compiler, module, node.childIdList[2]);
        let object = objectNode.object;
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.id);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            if (variableTypeObject.kind === 'reference') {
                setExpressionType(compiler, module, expressionObject, variableTypeObject.toId, 0);
            } else {
                setExpressionType(compiler, module, expressionObject, variableTypeObject.id, 0);
            }
        } else if (object.type === 'function') {
            let functionObject = getFunctionById(compiler, module, object.id);
            let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);

            /* We restore the active block */
            unsetActiveBlock(compiler, module);
            setExpressionType(compiler, module, expressionObject, functionTypeObject.toId, 0);
        } else if (object.type === 'expression') {
            let $expressionObject = getExpressionById(compiler, module, object.id);
            let $expressionTypeObject = getExpressionType(compiler, module, $expressionObject);

            setExpressionType(compiler, module, expressionObject, $expressionTypeObject.id, 0);
        }
        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';

        //process.exit();

    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkCallByExpression(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let $expressionNode = getNodeById(compiler, module, node.childIdList[0]);

        /* Type of this expression is always defined due to the syntax rules */
        let $expressionObject = getExpressionById(compiler, module, $expressionNode.object.id);
        let $expressionTypeObject = getExpressionType(compiler, module, $expressionObject);

        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);

        if ($expressionTypeObject.kind === 'reference') {
            let isMatch = false;

            if (argumentNodeListNode.childIdList.length === $expressionTypeObject.fromIdList.length) {
                let i = 0;

                isMatch = true;
                while (isMatch && (i < argumentNodeListNode.childIdList.length)) {
                    let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                    let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                    let fromTypeObject = getTypeById(compiler, module, $expressionTypeObject.fromIdList[i]);

                    if (!isExpressionInstanceOf(compiler, module, argumentObject, fromTypeObject, true, {})) {
                        isMatch = false;
                    }
                    i++;
                }
            }
            if (isMatch) {
                node.childIdList.push($expressionNode.id);
            } else {
                let message = 'value of the expression is a reference to a function defined with';

                if ($expressionTypeObject.fromIdList.length === 0) {
                    message += ' no parameters';
                } else {
                    message += ` ${ $expressionTypeObject.fromIdList.length } parameter(s) of the following type(s):`;

                    for (let i = 0; i < $expressionTypeObject.fromIdList.length; i++) {
                        let fromTypeObject = getTypeById(compiler, module, $expressionTypeObject.fromIdList[i]);

                        if (0 < i) {
                            message += ',';
                        }
                        message += ` ${ getTypeName(compiler, module, fromTypeObject) }`;
                    }
                }
                message += ', but this function is called with';
                if (argumentNodeListNode.childIdList.length === 0) {
                    message += ' no arguments';
                } else {
                    message += ` ${ argumentNodeListNode.childIdList.length } argument(s) of the following type(s):`;
                    for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

                        if (0 < i) {
                            message += ',';
                        }
                        message += ` ${ getExpressionTypeName(compiler, module, argumentObject) }`;
                    }
                }
                throw {
                    code: 'E_CHECK_CALL_BY_EXPRESSION_INVALID_ARGUMENT_LIST',
                    message: message,
                    location: $expressionNode.location
                };
            }
        } else if (($expressionTypeObject.name === '$s') || ($expressionTypeObject.kind === 'array')) {
            /* We have the case 'expression[argumentList]', where type of 'expression' is either a string or an array */
            /* Here, we replace 'expression[argumentList]' with '$getElement[expression, argumentList]' */
            let callByNameNode = getNewNode(compiler, module, 'callByName', node.location, [
                getNewNode(compiler, module, 'instruction', $expressionNode.location, [], '$getElement').id,
                getNewNode(compiler, module, 'list', argumentNodeListNode.location, [$expressionNode.id].concat(argumentNodeListNode.childIdList), '').id
            ], '');

            node.childIdList.push(callByNameNode.id);
            callByNameNode.parentIdList.push(node.id);
            setActiveNodeList(compiler, module, [callByNameNode.id]);
        } else {
            throw {
                code: 'E_CHECK_CALL_BY_EXPRESSION_TYPE_MISMATCH',
                message: 'value of the expression is neither a reference to a function nor a string nor an array',
                location: $expressionNode.location
            };
        }
        node.status = '2';
    } else if (node.status === '2') {
        let $expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let $expressionObject = getExpressionById(compiler, module, $expressionNode.object.id);
        let $expressionTypeObject = getExpressionType(compiler, module, $expressionObject);

        let $$expressionNode = getNodeById(compiler, module, node.childIdList[2]);
        let $$expressionObject = getExpressionById(compiler, module, $$expressionNode.object.id);
        let $$expressionTypeObject = getExpressionType(compiler, module, $$expressionObject);

        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if ($expressionTypeObject.kind === 'reference') {
            setExpressionType(compiler, module, expressionObject, $$expressionTypeObject.toId, 0);
        } else if (($expressionTypeObject.name === '$s') || ($expressionTypeObject.kind === 'array')) {
            setExpressionType(compiler, module, expressionObject, $$expressionTypeObject.id, 0);
        }

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkExprStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let expectedExpressionTypeObject = getTypeByName(compiler, module, '$v');

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject, true, {})) {
            throw {
                code: 'E_CHECK_EXPR_TYPE_MISMATCH',
                message: `the type of the expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkString(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$s').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        if (0 < node.value.length) {
            setStringNode(compiler, module, node);
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkArray(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let elementNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let typeNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let firstElementTypeObjectList = [];

        if (elementNodeListNode.childIdList.length === 0) {
            firstElementTypeObjectList = [getTypeByName(compiler, module, '$v')];
        } else {
            let firstElementNode = getNodeById(compiler, module, elementNodeListNode.childIdList[0]);
            let firstElementObject = getExpressionById(compiler, module, firstElementNode.object.id);

            firstElementTypeObjectList = getExpressionTypeList(compiler, module, firstElementObject);
            if (firstElementTypeObjectList.length === 1) {
                let firstElementTypeObject = firstElementTypeObjectList[0];

                if (isTypeVoid(compiler, module, firstElementTypeObject)) {
                    throw {
                        code: 'E_CHECK_ARRAY_FIRST_ELEMENT_TYPE_VOID',
                        message: `type of the array cannot be inferred, because type of the first element of that array is ${ getTypeName(compiler, module, firstElementTypeObject) }`,
                        location: firstElementNode.location
                    };
                }
            }

            for (let i = 1; i < elementNodeListNode.childIdList.length; i++) {
                let elementNode = getNodeById(compiler, module, elementNodeListNode.childIdList[i]);
                let elementObject = getExpressionById(compiler, module, elementNode.object.id);
                let typeObjectList = [];

                for (let j = 0; j < firstElementTypeObjectList.length; j++) {
                    let firstElementTypeObject = firstElementTypeObjectList[j];

                    if (isExpressionInstanceOf(compiler, module, elementObject, firstElementTypeObject, false, {})) {
                        typeObjectList.push(firstElementTypeObject);
                    }
                }
                if (0 < typeObjectList.length) {
                    firstElementTypeObjectList = typeObjectList;
                } else {
                    throw {
                        code: 'E_CHECK_ARRAY_ELEMENT_TYPE_MISMATCH',
                        message: `type of the array element No. ${ i } is ${ getExpressionTypeName(compiler, module, elementObject) }; expected ${ getExpressionTypeName(compiler, module, firstElementObject) }`,
                        location: elementNode.location
                    };
                }
            }
        }
        for (let i = 0; i < firstElementTypeObjectList.length; i++) {
            let firstElementTypeObject = firstElementTypeObjectList[i];
            let typeName = `{${ firstElementTypeObject.name }}`;
            let typeObject = getTypeByName(compiler, module, typeName);
            let typeNode;

            if (typeObject) {
                typeNode = getNodeById(compiler, module, typeObject.nodeId);
            } else {
                typeNode = getNewNode(compiler, module, 'arrayType', typeNodeListNode.location, [firstElementTypeObject.nodeId], '');
            }
            typeNodeListNode.childIdList.push(typeNode.id);
            typeNode.parentIdList.push(typeNodeListNode.id);
        }
        setActiveNodeList(compiler, module, [typeNodeListNode.id]);
        node.status = '2';
    } else if (node.status === '2') {
        let elementNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let typeNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getNewExpression(compiler, module, node.id, true, [], -1);
        let i = 0;

        /* Let's check if this array is an array literal for sure */
        while (expressionObject.isLiteral && (i < elementNodeListNode.childIdList.length)) {
            let elementNode = getNodeById(compiler, module, elementNodeListNode.childIdList[i]);
            let elementObject = getExpressionById(compiler, module, elementNode.object.id);

            expressionObject.isLiteral = elementObject.isLiteral;
            i++;
        }

        if (typeNodeListNode.childIdList.length === 1) {
            /* Type of the array is unique */
            /* Here we set type of the array as well as type of every element of that array if necessary */

            let typeNode = getNodeById(compiler, module, typeNodeListNode.childIdList[0]);
            let typeObject = getTypeById(compiler, module, typeNode.object.id);

            setExpressionType(compiler, module, expressionObject, typeObject.id, -1);
            if (!isExpressionInstanceOf(compiler, module, expressionObject, typeObject, true, {})) {
                /* Internal error */
                throw {
                    code: 'E_CHECK_ARRAY_ELEMENT_TYPE_MISMATCH',
                    message: 'E_CHECK_ARRAY_ELEMENT_TYPE_MISMATCH'
                };
            }
        } else {
            for (let j = 0; j < typeNodeListNode.childIdList.length; j++) {
                let typeNode = getNodeById(compiler, module, typeNodeListNode.childIdList[j]);
                let typeObject = getTypeById(compiler, module, typeNode.object.id);

                setExpressionType(compiler, module, expressionObject, typeObject.id, -1);
            }
        }

        setNodeObject(compiler, module, node, 'expression', expressionObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkArrayType(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let toTypeNode = getNodeById(compiler, module, node.childIdList[0]);
        let toTypeObject = getTypeById(compiler, module, toTypeNode.object.id);
        let name = `{${ toTypeObject.name }}`;
        let typeObject = getTypeByName(compiler, module, name);

        if (!typeObject) {
            typeObject = getNewType(compiler, module, node.id, 'array', name, [], toTypeObject.id, toTypeObject.isVariable);
        }
        setNodeObject(compiler, module, node, 'type', typeObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkVariableType(compiler, module, node) {
    if (node.status === 'CREATED') {
        let name = node.value;
        let typeObject = getTypeByName(compiler, module, name);

        if (!typeObject) {
            typeObject = getNewType(compiler, module, node.id, 'variable', name, [], -1, true);
        }
        setNodeObject(compiler, module, node, 'type', typeObject.id, -1);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

export { checkModule };
