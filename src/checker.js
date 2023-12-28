import { getNewModule, setActiveModule, getModuleByPath, setModuleChild, getNewNode, getNodeById, setActiveNodeList, getActiveNode, unsetActiveNode, getMainNode, setNodeObject, getNodeFromNode, getNewBlock, setActiveBlock, getActiveBlock, getBlockById, getBlockObjectByName, setBlockObject, unsetActiveBlock, getNewType, getTypeByName, getTypeById, getTypeName, getNewFunction, getFunctionById, getActiveFunction, getFunctionName, getNewVariable, getVariableById, getNewExpression, getExpressionById, isExpressionInstanceOf, getExpressionTypeName, setExpressionTypeId, getExpressionType, setExpressionValueId, getNewReference, getReferenceByName, getNewSubmodule, setSubmodulePath, getSubmoduleById, setSubmoduleObject, getNewString } from './module.js';

function checkModule(compiler, module) {
    let node = getMainNode(compiler, module);

    module.status = 'CHECKING';
    if (node.status === 'CREATED') {
        /* The checking is starting */
        setActiveNodeList(compiler, module, [node.id]);
    } else {
        /* The checking is continuing */
        node = getActiveNode(compiler, module);
    }
    while (node && (module.status === 'CHECKING')) {
        if (node.name === 'moduleStmt') {
            checkModuleStmt(compiler, module, node);
        } else if (node.name === 'moduleBlock') {
            checkModuleBlock(compiler, module, node);
        } else if (node.name === 'importStmt') {
            checkImportStmt(compiler, module, node);
        } else if (node.name === 'submodule') {
            checkSubmodule(compiler, module, node);
        } else if (node.name === 'list') {
            checkList(compiler, module, node);
        } else if (node.name === 'externalObject') {
            checkExternalObject(compiler, module, node);
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
        } else if (node.name === 'stringNonInterpolated') {
            checkStringNonInterpolated(compiler, module, node);
        } else if (node.name === 'string') {
            checkString(compiler, module, node);
        } else if (node.name === 'functionStmt') {
            checkFunctionStmt(compiler, module, node);
        } else if (node.name === 'nonModuleBlock') {
            checkNonModuleBlock(compiler, module, node);
        } else if (node.name === 'assignmentStmt') {
            checkAssignmentStmt(compiler, module, node);
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
        } else if (node.name === 'identifier') {
            checkIdentifier(compiler, module, node);
        } else if (node.name === 'externalIdentifier') {
            checkExternalIdentifier(compiler, module, node);
        } else if (node.name === 'name') {
            checkName(compiler, module, node);
        } else if (node.name === 'instruction') {
            checkInstruction(compiler, module, node);
        } else if (node.name === 'callByName') {
            checkCallByName(compiler, module, node);
        } else if (node.name === 'operator') {
            checkOperator(compiler, module, node);
        } else if (node.name === 'callByExpression') {
            checkCallByExpression(compiler, module, node);
        } else if (node.name === 'exprStmt') {
            checkExprStmt(compiler, module, node);
        }
        node = getActiveNode(compiler, module);
    }
    if (module.status === 'CHECKING') {
        module.status = 'CHECKED';
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
    }
}

function checkModuleBlock(compiler, module, node) {
    if (node.status === 'CREATED') {
        let blockObject = getNewBlock(compiler, module, '', -1);

        setActiveBlock(compiler, module, blockObject.id);
        setNodeObject(compiler, module, node, 'block', blockObject.id);
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '2';
    } else if (node.status === '2') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let pathNode = getNodeById(compiler, module, node.childIdList[1]);
        let submoduleObject = getNewSubmodule(compiler, module, node.id, nameNode.value);
        let submodule;

        /* Set path of the sub-module object and register it */
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

            if (pathNode.value === '') {
                path = (new URL(`./${ submoduleObject.name }.sb`, module.path)).href;
            } else {
                try {
                    path = (new URL(pathNode.value, module.path)).href;
                } catch (err) {
                    /* In order to throw, try, for instance, 'fttps:// ... sb' */
                    throw {
                        code: 'E_CHECK_SUBMODULE_INVALID_URL',
                        message: `a valid URL cannot be constructed from the given path`,
                        location: pathNode.location
                    };
                }
            }
            setSubmodulePath(compiler, module, submoduleObject, path);
            setBlockObject(compiler, module, getActiveBlock(compiler, module), submoduleObject.name, 'submodule', submoduleObject.id);
        }

        /* Create a sub-module */
        submodule = getModuleByPath(compiler, submoduleObject.path);
        if (!submodule) {
            submodule = getNewModule(compiler, submoduleObject.path);
            setActiveModule(compiler, [submodule.id]);
            module.status = 'PARSED';
        } else if (submodule.status !== 'TRANSLATED') {
            throw {
                code: 'E_CHECK_SUBMODULE_CIRCULAR_IMPORT',
                message: `sub-module '${ submoduleObject.name }' is already imported, but it is still processing (circular import)`,
                location: nameNode.location
            };
        }

        /* Set this sub-module as a child of this module */
        setModuleChild(compiler, module, submodule);

        setNodeObject(compiler, module, node, 'submodule', submoduleObject.id);
        /* If the compilation of the sub-module will fail, the location of this node will be used in the corresponding error message */
        /* Therefore, we keep this node as an 'active' until the compilation of the sub-module is finished */
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkList(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkExternalObject(compiler, module, node) {
    if (node.status === 'CREATED') {
        let externalNameNode = getNodeById(compiler, module, node.childIdList[0]);
        let objectNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let objectNode = getNodeById(compiler, module, objectNodeListNode.childIdList[0]);
        let externalObjectNodeListNode = getNodeById(compiler, module, node.parentIdList[0]);
        let importStmtNode = getNodeById(compiler, module, externalObjectNodeListNode.parentIdList[0]);
        let submoduleNode = getNodeById(compiler, module, importStmtNode.childIdList[1]);
        let submoduleObject = getSubmoduleById(compiler, module, submoduleNode.object.id);
        let submodule = getModuleByPath(compiler, submoduleObject.path);
        let externalObject = getBlockObjectByName(compiler, submodule, getBlockById(compiler, submodule, 1), externalNameNode.value);

        if (externalObject.type === 'variable') {
            let externalVariableObject = getVariableById(compiler, submodule, externalObject.idList[0]);

            if (!externalVariableObject.isPrivate) {
                objectNode.name = 'variable';
                if (objectNode.childIdList[2] === -1) {
                    /* Type is not declared */
                    /* Let's insert the type of the corresponding external variable */
                    let externalVariableTypeObject = getTypeById(compiler, submodule, externalVariableObject.typeId);
                    let externalVariableTypeNode = getNodeById(compiler, submodule, externalVariableTypeObject.nodeId);
                    let variableTypeNode = getNodeFromNode(compiler, module, submodule, externalVariableTypeNode.id);

                    objectNode.childIdList[2] = variableTypeNode.id;
                    variableTypeNode.parentIdList.push(objectNode.id);
                }
            } else {
                throw {
                    code: 'E_CHECK_EXTERNAL_OBJECT_VARIABLE_IS_PRIVATE',
                    message: `variable '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }'), because '${ externalNameNode.value }' is a private variable`,
                    location: externalNameNode.location
                };
            }
        } else if (externalObject.type === 'function') {
            let i = 0;
            let next = true;
            let isPrivate = true;

            while ((i < externalObject.idList.length) && next) {
                let externalFunctionObject = getFunctionById(compiler, submodule, externalObject.idList[i]);

                if (!externalFunctionObject.isPrivate) {
                    isPrivate = false;
                    if (objectNode.name === 'function') {
                        /* Type is not declared and we are processing the next external function with the same name (therefore this external function is a polymorphic function) */
                        /* Let's make a new node for such an external function */
                        objectNode = getNewNode(compiler, module, 'object', objectNode.location, [objectNode.childIdList[0], objectNode.childIdList[1], -1], '');
                        objectNodeListNode.childIdList.push(objectNode.id);
                        objectNode.parentIdList.push(objectNodeListNode.id);
                    }
                    objectNode.name = 'function';
                    if (objectNode.childIdList[2] === -1) {
                        /* Type is not declared */
                        /* Let's insert the type of the corresponding external function */
                        let externalFunctionTypeObject = getTypeById(compiler, submodule, externalFunctionObject.typeId);
                        let externalFunctionTypeNode = getNodeById(compiler, submodule, externalFunctionTypeObject.nodeId);
                        let functionTypeNode = getNodeFromNode(compiler, module, submodule, externalFunctionTypeNode.id);

                        objectNode.childIdList[2] = functionTypeNode.id;
                        functionTypeNode.parentIdList.push(objectNode.id);
                    } else {
                        /* Type is declared */
                        /* Stop the processing of the external function(s) */
                        next = false;
                    }
                }
                i++;
            }
            if (isPrivate) {
                throw {
                    code: 'E_CHECK_EXTERNAL_OBJECT_FUNCTION_IS_PRIVATE',
                    message: `function '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }'), because '${ externalNameNode.value }' is a private function`,
                    location: externalNameNode.location
                };
            }
        } else if (externalObject.type === 'submodule') {
            throw {
                code: 'E_CHECK_EXTERNAL_OBJECT_SUBMODULE',
                message: `sub-module '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }')`,
                location: externalNameNode.location
            };
        } else if (externalObject.type === '') {
            throw {
                code: 'E_CHECK_EXTERNAL_OBJECT_OBJECT_NOT_FOUND',
                message: `'${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }'), because there is no object associated with the name '${ externalNameNode.value }'`,
                location: externalNameNode.location
            };
        }
        setActiveNodeList(compiler, module, [objectNodeListNode.id]);
        node.status = '1';
    } else if (node.status === '1') {
        let externalNameNode = getNodeById(compiler, module, node.childIdList[0]);
        let objectNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let externalObjectNodeListNode = getNodeById(compiler, module, node.parentIdList[0]);
        let importStmtNode = getNodeById(compiler, module, externalObjectNodeListNode.parentIdList[0]);
        let submoduleNode = getNodeById(compiler, module, importStmtNode.childIdList[1]);
        let submoduleObject = getSubmoduleById(compiler, module, submoduleNode.object.id);
        let submodule = getModuleByPath(compiler, submoduleObject.path);
        let externalObject = getBlockObjectByName(compiler, submodule, getBlockById(compiler, submodule, 1), externalNameNode.value);

        if (externalObject.type === 'variable') {
            let variableNode = getNodeById(compiler, module, objectNodeListNode.childIdList[0]);
            let variableObject = getVariableById(compiler, module, variableNode.object.id);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);
            let externalVariableObject = getVariableById(compiler, submodule, externalObject.idList[0]);
            let externalVariableTypeObject = getTypeById(compiler, submodule, externalVariableObject.typeId);

            if (variableTypeObject.name === externalVariableTypeObject.name) {
                /* Transfer all features of the corresponding external variable */
                variableObject.isConstant = externalVariableObject.isConstant;

                setSubmoduleObject(compiler, module, submoduleObject, 'variable', externalVariableObject.id, variableObject.id);
            } else {
                throw {
                    code: 'E_CHECK_EXTERNAL_OBJECT_TYPE_MISMATCH',
                    message: `variable '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }'), because the expected type ${ getTypeName(compiler, module, variableTypeObject) } does not match with the actual type ${ getTypeName(compiler, submodule, externalVariableTypeObject) }`,
                    location: externalNameNode.location
                };
            }
        } else if (externalObject.type === 'function') {
            for (let i = 0; i < objectNodeListNode.childIdList.length; i++) {
                let functionNode = getNodeById(compiler, module, objectNodeListNode.childIdList[i]);
                let functionObject = getFunctionById(compiler, module, functionNode.object.id);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
                let j = 0;
                let isMatch = false;

                while ((j < externalObject.idList.length) && !isMatch) {
                    let externalFunctionObject = getFunctionById(compiler, submodule, externalObject.idList[j]);

                    if (!externalFunctionObject.isPrivate) {
                        let externalFunctionTypeObject = getTypeById(compiler, submodule, externalFunctionObject.typeId);

                        if (functionTypeObject.name === externalFunctionTypeObject.name) {
                            isMatch = true;

                            /* Transfer all features of the corresponding external function */
                            /* At the moment, there is no feature we can transfer */

                            setSubmoduleObject(compiler, module, submoduleObject, 'function', externalFunctionObject.id, functionObject.id);
                        }
                    }
                    j++;
                }
                if (!isMatch) {
                    let typeNameList = [];

                    for (let j = 0; j < externalObject.idList.length; j++) {
                        let externalFunctionObject = getFunctionById(compiler, submodule, externalObject.idList[j]);

                        if (!externalFunctionObject.isPrivate) {
                            let externalFunctionTypeObject = getTypeById(compiler, submodule, externalFunctionObject.typeId);

                            typeNameList.push(getTypeName(compiler, submodule, externalFunctionTypeObject));
                        }
                    }
                    throw {
                        code: 'E_CHECK_EXTERNAL_OBJECT_TYPE_MISMATCH',
                        message: `function '${ externalNameNode.value }' cannot be imported from the sub-module '${ submoduleObject.name }' ('${ submoduleObject.path }'), because the expected type ${ getTypeName(compiler, module, functionTypeObject) } does not match with the actual type(s) ${ typeNameList.join(', ') }`,
                        location: externalNameNode.location
                    };
                }
            }
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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
        let variableObject = getNewVariable(compiler, module, node.id, false, false, nameNode.value, typeObject.id);

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
            } else {
                throw {
                    code: 'E_CHECK_VARIABLE_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a variable`,
                    location: modifierNode.location,
                    note: 'the following modifiers are valid for a variable: constant, private'
                };
            }
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
            setBlockObject(compiler, module, getActiveBlock(compiler, module), variableObject.name, 'variable', variableObject.id);
        }

        setNodeObject(compiler, module, node, 'variable', variableObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkBasicType(compiler, module, node) {
    if (node.status === 'CREATED') {
        let name = node.value;
        let fromTypeIdList = [];
        let toTypeId = -1;
        let typeObject = getTypeByName(compiler, module, name);

        /* Check if there is a type with the same name */
        if (!typeObject) {
            /* There is no type with the given name */
            /* Let's create a new one */
            typeObject = getNewType(compiler, module, node.id, '', name, fromTypeIdList, toTypeId);
        }
        setNodeObject(compiler, module, node, 'type', typeObject.id);
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
        let functionObject = getNewFunction(compiler, module, node.id, false, nameNode.value, typeObject.id);

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
            } else {
                throw {
                    code: 'E_CHECK_FUNCTION_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a function`,
                    location: modifierNode.location,
                    note: 'the following modifier is valid for a function: private'
                };
            }
        }
        /* Check name */
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

            for (let i = 0; i < object.idList.length; i++) {
                let $functionObject = getFunctionById(compiler, module, object.idList[i]);
                let $functionTypeObject = getTypeById(compiler, module, $functionObject.typeId);

                if (typeObject.fromIdList.length === $functionTypeObject.fromIdList.length) {
                    let j = 0;
                    let isMatch = true;

                    while ((j < typeObject.fromIdList.length) && isMatch) {
                        let fromTypeObject = getTypeById(compiler, module, typeObject.fromIdList[j]);
                        let $functionFromTypeObject = getTypeById(compiler, module, $functionTypeObject.fromIdList[j]);

                        if (fromTypeObject.id !== $functionFromTypeObject.id) {
                            isMatch = false;
                            /* If two different functions with the same name have a parameter at the same position that is a reference, then we assume that types of such parameters match */
                            if ((fromTypeObject.kind === 'reference') && ($functionFromTypeObject.kind === 'reference')) {
                                isMatch = true;
                            }
                        }
                        j++;
                    }
                    if (isMatch) {
                        let $functionNode = getNodeById(compiler, module, $functionObject.nodeId);

                        throw {
                            code: 'E_CHECK_FUNCTION_REPETITIVE_NAME_AND_TYPES_OF_PARAMETERS',
                            message: `the function '${ functionObject.name }' cannot be created, because there is already a function with the same name and the same types of parameters defined on the line ${ $functionNode.location.first_line }`,
                            location: nameNode.location,
                            note: 'if two different functions with the same name have a parameter at the same position that is a reference, then we assume that types of such parameters match; for instance, the following two functions cannot be created: f[x | [] -> []] and f[x | [$i] -> []]'
                        };
                    }
                }
            }
            setBlockObject(compiler, module, getActiveBlock(compiler, module), functionObject.name, 'function', functionObject.id);
        } else if (object.type === 'submodule') {
            let submoduleObject = getSubmoduleById(compiler, module, object.idList[0]);
            let submoduleNode = getNodeById(compiler, module, submoduleObject.nodeId);

            throw {
                code: 'E_CHECK_FUNCTION_REPETITIVE_NAME',
                message: `function '${ functionObject.name }' cannot be created, because there is already a sub-module with the same name defined on the line ${ submoduleNode.location.first_line }`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            setBlockObject(compiler, module, getActiveBlock(compiler, module), functionObject.name, 'function', functionObject.id);
        }

        setNodeObject(compiler, module, node, 'function', functionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkReferenceType(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let name = '[';
        let fromTypeNodeListNode = getNodeById(compiler, module, node.childIdList[0]);
        let fromTypeIdList = [];
        let toTypeNode = getNodeById(compiler, module, node.childIdList[1]);
        let toTypeObject = getTypeById(compiler, module, toTypeNode.object.id);
        let toTypeId = toTypeObject.id;
        let typeObject;

        /* Construct the name of the type */
        for (let i = 0; i < fromTypeNodeListNode.childIdList.length; i++) {
            let fromTypeNode = getNodeById(compiler, module, fromTypeNodeListNode.childIdList[i]);
            let fromTypeObject = getTypeById(compiler, module, fromTypeNode.object.id);

            if (i > 0) {
                name += ', ';
            }
            name += fromTypeObject.name;
            fromTypeIdList.push(fromTypeObject.id);
        }
        name += '] -> [';
        if (toTypeObject.id !== getTypeByName(compiler, module, '$v').id) {
            name += toTypeObject.name;
        }
        name += ']';

        /* Check if there is a type with the same name */
        typeObject = getTypeByName(compiler, module, name);
        if (!typeObject) {
            /* Create a new type with the constructed name */
            typeObject = getNewType(compiler, module, node.id, 'reference', name, fromTypeIdList, toTypeId);
        }

        setNodeObject(compiler, module, node, 'type', typeObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
    }
}

function checkVoid(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, false, [getTypeByName(compiler, module, '$v').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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

                if (expressionTypeObject && (expressionTypeObject.id !== getTypeByName(compiler, module, '$v').id)) {
                    /* The type of expression is unique and is not equal to 'void' */
                    /* The type of variable is now equal to the type of the expression */
                    variableObject.typeId = expressionTypeObject.id;
                } else {
                    throw {
                        code: 'E_CHECK_INITIALIZATION_EXPRESSION_TYPE_IS_INVALID',
                        message: `the type of variable '${ variableObject.name }' cannot be inferred, because the type of expression is ${ getExpressionTypeName(compiler, module, expressionObject) }`,
                        location: expressionNode.location
                    };
                }
            } else {
                if (!isExpressionInstanceOf(compiler, module, expressionObject, variableTypeObject)) {
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

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkIntegerSingleUnsigned(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$iu').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkIntegerDouble(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$id').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkFloatingPointSingle(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$f').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkFloatingPointDouble(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$fd').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkBoolean(compiler, module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$b').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkStringNonInterpolated(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionObject = getNewExpression(compiler, module, node.id, true, [getTypeByName(compiler, module, '$s').id], 0);

        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkString(compiler, module, node) {
    if (node.status === 'CREATED') {
        let textEncoder = new TextEncoder();
        let rightValue = textEncoder.encode(node.value);
        let rightSize = rightValue.length;
        let leftValue = new Uint8Array((new Uint32Array([rightSize])).buffer);
        let leftSize = leftValue.length;
        let size = leftSize + rightSize;
        let value = new Uint8Array(size);
        let stringObject;

        value.set(leftValue, 0);
        value.set(rightValue, leftSize);
        stringObject = getNewString(compiler, module, node.id, size, value);
        setNodeObject(compiler, module, node, 'string', stringObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkFunctionStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, [node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = '2';
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
    }
}

function checkNonModuleBlock(compiler, module, node) {
    if (node.status === 'CREATED') {
        let blockObject = getNewBlock(compiler, module, '', -1);

        setActiveBlock(compiler, module, blockObject.id);
        setNodeObject(compiler, module, node, 'block', blockObject.id);
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveBlock(compiler, module);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkAssignmentStmt(compiler, module, node) {
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

            setNodeObject(compiler, module, nameNode, 'variable', variableObject.id);
            if (!variableObject.isConstant) {
                if (!isExpressionInstanceOf(compiler, module, expressionObject, variableTypeObject)) {
                    throw {
                        code: 'E_CHECK_ASSIGNMENT_TYPE_MISMATCH',
                        message: `the type of the expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, variableTypeObject) }`,
                        location: expressionNode.location
                    };
                }
            } else {
                throw {
                    code: 'E_CHECK_ASSIGNMENT_TO_CONSTANT',
                    message: 'assignment to a variable with the modifier \'constant\' is not allowed',
                    location: nameNode.location
                };
            }
        } else if (object.type === 'function') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_TO_FUNCTION',
                message: 'assignment to a function is not allowed',
                location: nameNode.location
            };
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_TO_SUBMODULE',
                message: 'assignment to a sub-module is not allowed',
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_ASSIGNMENT_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkNothingStmt(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject)) {
            throw {
                code: 'E_CHECK_IF_ELSE_TYPE_MISMATCH',
                message: `the type of the 'if-else' expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject)) {
            throw {
                code: 'E_CHECK_WHILE_TYPE_MISMATCH',
                message: `the type of the 'while' expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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

        if (!isExpressionInstanceOf(compiler, module, expressionObject, functionToTypeObject)) {
            throw {
                code: 'E_CHECK_RETURN_TYPE_MISMATCH',
                message: `the type of the returned expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, functionToTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkReference(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            setNodeObject(compiler, module, nameNode, 'variable', variableObject.id);
            setExpressionTypeId(compiler, module, expressionObject, variableTypeObject.id, 0);
            if (variableTypeObject.kind !== 'reference') {
                throw {
                    code: 'E_CHECK_REFERENCE_VARIABLE_IS_NOT_REFERENCE',
                    message: `value of the variable '${ nameNode.value }' is not a reference to a function`,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'function') {
            for (let i = 0; i < object.idList.length; i++) {
                let functionObject = getFunctionById(compiler, module, object.idList[i]);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
                let functionName = getFunctionName(compiler, module, functionObject);
                let reference = getReferenceByName(compiler, module, functionName);

                if (!reference) {
                    reference = getNewReference(compiler, module, functionName);
                }
                if (i === 0) {
                    setNodeObject(compiler, module, nameNode, 'function', functionObject.id);
                    setExpressionTypeId(compiler, module, expressionObject, functionTypeObject.id, i);
                    setExpressionValueId(compiler, module, expressionObject, reference.id, i);
                } else {
                    setNodeObject(compiler, module, nameNode, 'function', -1);
                    setExpressionTypeId(compiler, module, expressionObject, functionTypeObject.id, -1);
                    setExpressionValueId(compiler, module, expressionObject, reference.id, -1);
                }
            }
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_REFERENCE_TO_SUBMODULE',
                message: 'reference to a sub-module is not allowed',
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_REFERENCE_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkIdentifier(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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
    }
}

function checkName(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            setNodeObject(compiler, module, nameNode, 'variable', variableObject.id);
            if (variableTypeObject.kind === 'reference') {
                setExpressionTypeId(compiler, module, expressionObject, variableTypeObject.toId, 0);
                if (variableTypeObject.fromIdList.length !== 0) {
                    throw {
                        code: 'E_CHECK_NAME_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                        message: `the value of variable '${ nameNode.value }' is a reference to a function defined with ${ variableTypeObject.fromIdList.length } parameter(s), but the given number of arguments is 0`,
                        location: nameNode.location
                    };
                }
            } else {
                setExpressionTypeId(compiler, module, expressionObject, variableTypeObject.id, 0);
            }
        } else if (object.type === 'function') {
            let i = 0;
            let isMatch = false;

            while ((i < object.idList.length) && !isMatch) {
                let functionObject = getFunctionById(compiler, module, object.idList[i]);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);

                setNodeObject(compiler, module, nameNode, 'function', functionObject.id);
                setExpressionTypeId(compiler, module, expressionObject, functionTypeObject.toId, i);
                if (functionTypeObject.fromIdList.length === 0) {
                    isMatch = true;
                }
                i++;
            }
            if (!isMatch) {
                throw {
                    code: 'E_CHECK_NAME_FUNCTION_NOT_FOUND',
                    message: `function '${ nameNode.value }' is defined with at least one parameter, but the given number of arguments is 0`,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'submodule') {
            throw {
                code: 'E_CHECK_NAME_SUBMODULE',
                message: `'${ nameNode.value }' is a sub-module; a sub-module has no value by itself`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkInstruction(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkCallByName(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), nameNode.value);
        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        /* Operator overloading */
        if (nameNode.name === 'operator') {
            let idList = [];

            if (nameNode.value === '-') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$sub').idList;
            } else if (nameNode.value === '+') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$add').idList;
            } else if (nameNode.value === '*') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$mul').idList;
            } else if (nameNode.value === '/') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$div').idList;
            } else if (nameNode.value === '%') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$rem').idList;
            } else if (nameNode.value === '==') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$eq').idList
            } else if (nameNode.value === '!=') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$ne').idList;
            } else if (nameNode.value === '<') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$lt').idList;
            } else if (nameNode.value === '>') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$gt').idList;
            } else if (nameNode.value === '<=') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$le').idList;
            } else if (nameNode.value === '>=') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$ge').idList;
            } else if (nameNode.value === 'not') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$not').idList;
            } else if (nameNode.value === 'and') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$and').idList;
            } else if (nameNode.value === 'or') {
                idList = getBlockObjectByName(compiler, module, getActiveBlock(compiler, module), '$or').idList;
            }
            object.type = 'function';
            object.idList = object.idList.concat(idList);
        }

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.idList[0]);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

            setNodeObject(compiler, module, nameNode, 'variable', variableObject.id);
            if (variableTypeObject.kind === 'reference') {
                setExpressionTypeId(compiler, module, expressionObject, variableTypeObject.toId, 0);
                if (variableTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                    for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                        let expectedArgumentTypeObject = getTypeById(compiler, module, variableTypeObject.fromIdList[i]);

                        if (!isExpressionInstanceOf(compiler, module, argumentObject, expectedArgumentTypeObject)) {
                            throw {
                                code: 'E_CHECK_CALL_BY_NAME_TYPE_MISMATCH',
                                message: `the type of the argument number ${ i + 1 } is ${ getExpressionTypeName(compiler, module, argumentObject) }; expected ${ getTypeName(compiler, module, expectedArgumentTypeObject) }`,
                                location: argumentNode.location
                            };
                        }
                    }
                } else {
                    throw {
                        code: 'E_CHECK_CALL_BY_NAME_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                        message: `value of the variable '${ nameNode.value  }' is a reference to a function defined with ${ variableTypeObject.fromIdList.length } parameter(s), but the given number of arguments is ${ argumentNodeListNode.childIdList.length }`,
                        location: nameNode.location
                    };
                }
            } else {
                throw {
                    code: 'E_CHECK_CALL_BY_NAME_VARIABLE_IS_NOT_REFERENCE',
                    message: `value of the variable '${ nameNode.value }' is not a reference to a function`,
                    location: nameNode.location
                };
            }
        } else if (object.type === 'function') {
            let i = 0;
            let isMatch = false;

            while ((i < object.idList.length) && !isMatch) {
                let functionObject = getFunctionById(compiler, module, object.idList[i]);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);

                setNodeObject(compiler, module, nameNode, 'function', functionObject.id);
                setExpressionTypeId(compiler, module, expressionObject, functionTypeObject.toId, i);
                if (functionTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                    let j = 0;

                    isMatch = true;
                    while ((j < argumentNodeListNode.childIdList.length) && isMatch) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[j]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                        let expectedArgumentTypeObject = getTypeById(compiler, module, functionTypeObject.fromIdList[j]);

                        if (!isExpressionInstanceOf(compiler, module, argumentObject, expectedArgumentTypeObject)) {
                            isMatch = false;
                        }
                        j++;
                    }
                }
                i++;
            }
            if (!isMatch) {
                let message = `function '${ nameNode.value }' is defined with at least one parameter, but the given number of arguments is 0`;

                if (argumentNodeListNode.childIdList.length > 0) {
                    message = `there is no function '${ nameNode.value }' defined with ${ argumentNodeListNode.childIdList.length } parameter(s) of the following type(s): `;

                    for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                        let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                        let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

                        if (i > 0) {
                            message += ', ';
                        }
                        message += getExpressionTypeName(compiler, module, argumentObject);
                    }
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
                message: `'${ nameNode.value }' is a sub-module; a sub-module has no value by itself`,
                location: nameNode.location
            };
        } else if (object.type === '') {
            throw {
                code: 'E_CHECK_CALL_BY_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            };
        }
        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkOperator(compiler, module, node) {
    if (node.status === 'CREATED') {
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

function checkCallByExpression(compiler, module, node) {
    if (node.status === 'CREATED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let $expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let $expressionObject = getExpressionById(compiler, module, $expressionNode.object.id);
        let $expressionTypeObject = getExpressionType(compiler, module, $expressionObject);
        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getNewExpression(compiler, module, node.id, false, [], -1);

        if ($expressionTypeObject.kind === 'reference') {
            setExpressionTypeId(compiler, module, expressionObject, $expressionTypeObject.toId, 0);
            if ($expressionTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                    let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
                    let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);
                    let expectedArgumentTypeObject = getTypeById(compiler, module, $expressionTypeObject.fromIdList[i]);

                    if (!isExpressionInstanceOf(compiler, module, argumentObject, expectedArgumentTypeObject)) {
                        throw {
                            code: 'E_CHECK_CALL_BY_EXPRESSION_TYPE_MISMATCH',
                            message: `the type of the argument number ${ i + 1 } is ${ getExpressionTypeName(compiler, module, argumentObject) }; expected ${ getTypeName(compiler, module, expectedArgumentTypeObject) }`,
                            location: argumentNode.location
                        };
                    }
                }
            } else {
                throw {
                    code: 'E_CHECK_CALL_BY_EXPRESSION_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                    message: `value of the expression is a reference to a function defined with ${ $expressionTypeObject.fromIdList.length } parameter(s), but the given number of arguments is ${ argumentNodeListNode.childIdList.length }`,
                    location: $expressionNode.location
                };
            }
        } else {
            throw {
                code: 'E_CHECK_CALL_BY_EXPRESSION_EXPRESSION_IS_NOT_REFERENCE',
                message: 'value of the expression is not a reference to a function',
                location: $expressionNode.location
            };
        }
        setNodeObject(compiler, module, node, 'expression', expressionObject.id);
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
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

        if (!isExpressionInstanceOf(compiler, module, expressionObject, expectedExpressionTypeObject)) {
            throw {
                code: 'E_CHECK_TARGET_TYPE_MISMATCH',
                message: `the type of the expression is ${ getExpressionTypeName(compiler, module, expressionObject) }; expected ${ getTypeName(compiler, module, expectedExpressionTypeObject) }`,
                location: expressionNode.location
            };
        }
        unsetActiveNode(compiler, module);
        node.status = 'CHECKED';
    }
}

export { checkModule };
