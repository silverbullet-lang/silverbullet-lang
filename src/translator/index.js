import Binaryen from './binaryen.js';

function translate(module) {

    //console.log(module.nodes.list);

    let binaryen = Binaryen();
    let node;

    module.ir = new binaryen.Module();

    /* Set some features of the Binaryen library */
    module.ir.setFeatures(
        binaryen.Features.MutableGlobals |
        /* For the instruction '$copyMemory' */
        binaryen.Features.BulkMemory
    );

    module.setActiveNodeList([module.getLastNode().id]);
    node = module.getActiveNode();
    while (node) {

        //console.log(module.nodes.stack);

        if (node.name === 'moduleStmt') {
            translateModuleStmt(module, node, binaryen);
        } else if (node.name === 'module') {
            translateModule(module, node, binaryen);
        } else if (node.name === 'moduleBlock') {
            translateModuleBlock(module, node, binaryen);
        } else if (node.name === 'importStmt') {
            translateImportStmt(module, node, binaryen);
        } else if (node.name === 'list') {
            translateList(module, node, binaryen);
        } else if (node.name === 'variable') {
            translateVariable(module, node, binaryen);
        } else if (node.name === 'basicType') {
            translateBasicType(module, node, binaryen);
        } else if (node.name === 'function') {
            translateFunction(module, node, binaryen);
        } else if (node.name === 'referenceType') {
            translateReferenceType(module, node, binaryen);
        } else if (node.name === 'initializationStmt') {
            translateInitializationStmt(module, node, binaryen);
        } else if (node.name === 'integerSingleSigned') {
            translateIntegerSingleSigned(module, node, binaryen);
        } else if (node.name === 'integerSingleUnsigned') {
            translateIntegerSingleUnsigned(module, node, binaryen);
        } else if (node.name === 'integerDouble') {
            translateIntegerDouble(module, node, binaryen);
        } else if (node.name === 'floatingPointSingle') {
            translateFloatingPointSingle(module, node, binaryen);
        } else if (node.name === 'floatingPointDouble') {
            translateFloatingPointDouble(module, node, binaryen);
        } else if (node.name === 'boolean') {
            translateBoolean(module, node, binaryen);
        } else if (node.name === 'functionStmt') {
            translateFunctionStmt(module, node, binaryen);
        } else if (node.name === 'nonModuleBlock') {
            translateNonModuleBlock(module, node, binaryen);
        } else if (node.name === 'assignmentStmt') {
            translateAssignmentStmt(module, node, binaryen);
        } else if (node.name === 'nothingStmt') {
            translateNothingStmt(module, node, binaryen);
        } else if (node.name === 'ifElseStmt') {
            translateIfElseStmt(module, node, binaryen);
        } else if (node.name === 'whileStmt') {
            translateWhileStmt(module, node, binaryen);
        } else if (node.name === 'returnStmt') {
            translateReturnStmt(module, node, binaryen);
        } else if (node.name === 'void') {
            translateVoid(module, node, binaryen);
        } else if (node.name === 'reference') {
            translateReference(module, node, binaryen);
        } else if (node.name === 'name') {
            translateName(module, node, binaryen);
        } else if (node.name === 'callByName') {
            translateCallByName(module, node, binaryen);
        } else if (node.name === 'callByExpression') {
            translateCallByExpression(module, node, binaryen);
        } else if (node.name === 'targetStmt') {
            translateTargetStmt(module, node, binaryen);
        }
        node = module.getActiveNode();
    }
    module.ir.validate();
}

function translateModuleStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        /* Translate basic types */
        module.getTypeByName('$v').ir = binaryen.none;
        module.getTypeByName('$i').ir = binaryen.i32;
        module.getTypeByName('$iu').ir = binaryen.i32;
        module.getTypeByName('$id').ir = binaryen.i64;
        module.getTypeByName('$f').ir = binaryen.f32;
        module.getTypeByName('$fd').ir = binaryen.f64;
        module.getTypeByName('$b').ir = binaryen.i32;

        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '2';
    } else if (node.status === '2') {
        let moduleNode = module.getNodeById(node.childIdList[0]);
        let moduleObject = module.getModuleById(moduleNode.object.id);
        let functionIdList = moduleObject.functions.idList;

        /* Import and export memory */
        module.ir.addMemoryImport(
            '$memory',
            'imports',
            '$memory',
            false
        );
        module.ir.setMemory(
            1,
            -1,
            '$memory',
            [],
            false
        );

        if (functionIdList.length > 0) {
            /* Create and fill the table of functions */
            let functionNameList = [];

            module.ir.addTable(
                '$table',
                functionIdList.length,
                functionIdList.length
            );
            for (let i = 0; i < functionIdList.length; i++) {
                let functionObject = module.getFunctionById(functionIdList[i]);
                let functionName = module.getFunctionName(functionObject);

                functionNameList.push(functionName);
            }
            module.ir.addActiveElementSegment(
                '$table',
                'functions',
                functionNameList
            );
            module.ir.addTableExport(
                '$table',
                '$table'
            );
        }
        if (moduleObject.functions.mainId > -1) {
            /* Set the starting function */
            let functionObject = module.getFunctionById(moduleObject.functions.mainId);
            let functionName = module.getFunctionName(functionObject);

            module.ir.setStart(
                module.ir.getFunction(
                    functionName
                )
            );
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateModule(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateModuleBlock(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        /* The second pass is devoted to translate the signatures of functions */
        /* Translated signatures are used to translate inferred initialization statements */
        module.setActiveNodeList(node.childIdList);
        node.status = '2';
    } else if (node.status === '2') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateImportStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let objectNodeListNode = module.getNodeById(node.childIdList[0]);
        let pathNode = module.getNodeById(node.childIdList[1]);

        for (let i = 0; i < objectNodeListNode.childIdList.length; i++) {
            let objectNode = module.getNodeById(objectNodeListNode.childIdList[i]);

            if (objectNode.name === 'variable') {
                let variableObject = module.getVariableById(objectNode.object.id);
                let variableTypeObject = module.getTypeById(variableObject.typeId);

                module.ir.addGlobalImport(
                    variableObject.name,
                    pathNode.value,
                    variableObject.name,
                    variableTypeObject.ir,
                    !variableObject.isConstant
                );
                if (!variableObject.isPrivate) {
                    module.ir.addGlobalExport(
                        variableObject.name,
                        variableObject.name
                    );
                }
            } else if (objectNode.name === 'function') {
                let functionObject = module.getFunctionById(objectNode.object.id);
                let functionName = module.getFunctionName(functionObject);
                let functionTypeObject = module.getTypeById(functionObject.typeId);
                let functionFromTypeIrList = [];
                let functionToTypeIr = module.getTypeById(functionTypeObject.toId).ir;

                for (let i = 0; i < functionTypeObject.fromIdList.length; i++) {
                    let functionFromTypeObject = module.getTypeById(functionTypeObject.fromIdList[i]);

                    functionFromTypeIrList.push(functionFromTypeObject.ir);
                }
                module.ir.addFunctionImport(
                    functionName,
                    pathNode.value,
                    functionName,
                    binaryen.createType(functionFromTypeIrList),
                    functionToTypeIr
                );
                if (!functionObject.isPrivate) {
                    module.ir.addFunctionExport(
                        functionName,
                        functionName
                    );
                }
            }
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        module.unsetActiveNode();
    }
}

function translateList(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateVariable(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateBasicType(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        module.unsetActiveNode();
    }
}

function translateFunction(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateReferenceType(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let typeObject = module.getTypeById(node.object.id);

        typeObject.ir = binaryen.i32;
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        module.unsetActiveNode();
    }
}

function translateInitializationStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let variableNode = module.getNodeById(node.childIdList[0]);
        let variableObject = module.getVariableById(variableNode.object.id);
        let variableTypeObject = module.getTypeById(variableObject.typeId);
        let expressionNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        if (variableObject.index === -1) {
            module.ir.addGlobal(
                variableObject.name,
                variableTypeObject.ir,
                !variableObject.isConstant,
                expressionObject.ir
            );
            if (!variableObject.isPrivate) {
                module.ir.addGlobalExport(
                    variableObject.name,
                    variableObject.name
                );
            }
        } else {
            node.ir = module.ir.local.set(variableObject.index, expressionObject.ir);
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        module.unsetActiveNode();
    }
}

function translateIntegerSingleSigned(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);

        expressionObject.ir = module.ir.i32.const(node.value);
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateIntegerSingleUnsigned(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);

        expressionObject.ir = module.ir.i32.const(node.value);
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateIntegerDouble(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);
        let bigInt = BigInt(node.value);
        let bigInt64Array = new BigInt64Array([bigInt]);
        let int32Array = new Int32Array(bigInt64Array.buffer);
        let low = int32Array[0];
        let high = int32Array[1];

        expressionObject.ir = module.ir.i64.const(low, high);
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateFloatingPointSingle(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);

        expressionObject.ir = module.ir.f32.const(node.value);
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateFloatingPointDouble(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);

        expressionObject.ir = module.ir.f64.const(node.value);
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateBoolean(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = module.getExpressionById(node.object.id);

        if (node.value === 'false') {
            expressionObject.ir = module.ir.i32.const(0);
        } else if (node.value === 'true') {
            expressionObject.ir = module.ir.i32.const(1);
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateFunctionStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = '2';
    } else if (node.status === '2') {
        module.setActiveNodeList([node.childIdList[1], node.childIdList[2]]);
        node.status = '3';
    } else if (node.status === '3') {
        let functionNode = module.getNodeById(node.childIdList[0]);
        let functionObject = module.getFunctionById(functionNode.object.id);
        let functionName = module.getFunctionName(functionObject);
        let functionTypeObject = module.getTypeById(functionObject.typeId);
        let functionFromTypeIrList = [];
        let functionToTypeIr = module.getTypeById(functionTypeObject.toId).ir;
        let variableTypeIrList = [];
        let blockNode = module.getNodeById(node.childIdList[2]);
        let blockObject = module.getBlockById(blockNode.object.id);

        for (let i = 0; i < functionTypeObject.fromIdList.length; i++) {
            let functionFromTypeObject = module.getTypeById(functionTypeObject.fromIdList[i]);

            functionFromTypeIrList.push(functionFromTypeObject.ir);
        }
        for (let i = 0; i < functionObject.variables.idList.length; i++) {
            let variableObject = module.getVariableById(functionObject.variables.idList[i]);

            if (!variableObject.isParameter) {
                let variableTypeObject = module.getTypeById(variableObject.typeId);

                variableTypeIrList.push(variableTypeObject.ir);
            }
        }
        module.ir.addFunction(
            functionName,
            binaryen.createType(functionFromTypeIrList),
            functionToTypeIr,
            variableTypeIrList,
            blockObject.ir
        );
        if (!functionObject.isPrivate) {
            module.ir.addFunctionExport(
                functionName,
                functionName
            );
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateNonModuleBlock(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let blockObject = module.getBlockById(node.object.id);
        let stmtIrList = [];

        for (let i = 0; i < node.childIdList.length; i++) {
            let stmtNode = module.getNodeById(node.childIdList[i]);

            stmtIrList.push(stmtNode.ir);
        }
        blockObject.ir = module.ir.block(
            null,
            stmtIrList,
            binaryen.none
        );
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateAssignmentStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let variableObject = module.getVariableById(nameNode.object.id);
        let expressionNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        if (variableObject.index === -1) {
            node.ir = module.ir.global.set(variableObject.name, expressionObject.ir);
        } else {
            node.ir = module.ir.local.set(variableObject.index, expressionObject.ir);
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateNothingStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        node.ir = module.ir.nop();
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateIfElseStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let ifBlockNode = module.getNodeById(node.childIdList[1]);
        let ifBlockObject = module.getBlockById(ifBlockNode.object.id);
        let elseBlockNode = module.getNodeById(node.childIdList[2]);
        let elseBlockObject = module.getBlockById(elseBlockNode.object.id);

        node.ir = module.ir.if(
            expressionObject.ir,
            ifBlockObject.ir,
            elseBlockObject.ir
        );
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateWhileStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let blockNode = module.getNodeById(node.childIdList[1]);
        let blockObject = module.getBlockById(blockNode.object.id);
        let label = `loop_${ blockObject.id }`;

        node.ir = module.ir.loop(
            label,
            module.ir.if(
                expressionObject.ir,
                module.ir.block(
                    null, [
                        blockObject.ir,
                        module.ir.break(
                            label
                        )
                    ], binaryen.none
                )
            )
        );
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateReturnStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        if (expressionObject.ir === -1) {
            node.ir = module.ir.return();
        } else {
            node.ir = module.ir.return(
                expressionObject.ir
            );
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateVoid(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateReference(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = nameNode.object;
        let expressionObject = module.getExpressionById(node.object.id);

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.id);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            if (variableObject.index === -1) {
                expressionObject.ir = module.ir.global.get(
                    variableObject.name,
                    variableTypeObject.ir
                );
            } else {
                expressionObject.ir = module.ir.local.get(
                    variableObject.index,
                    variableTypeObject.ir
                );
            }
        } else if (object.type === 'function') {
            let functionObject = module.getFunctionById(object.id);

            expressionObject.ir = module.ir.i32.const(
                functionObject.index
            );
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateName(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = nameNode.object;
        let expressionObject = module.getExpressionById(node.object.id);

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.id);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            if (variableObject.index === -1) {
                expressionObject.ir = module.ir.global.get(
                    variableObject.name,
                    variableTypeObject.ir
                );
            } else {
                expressionObject.ir = module.ir.local.get(
                    variableObject.index,
                    variableTypeObject.ir
                );
            }
            if (variableTypeObject.kind === 'reference') {
                let functionToTypeIr = module.getTypeById(variableTypeObject.toId).ir;

                expressionObject.ir = module.ir.call_indirect(
                    '$table',
                    expressionObject.ir,
                    [],
                    binaryen.createType([]),
                    functionToTypeIr
                );
            }
        } else if (object.type === 'function') {
            let functionObject = module.getFunctionById(object.id);
            let functionName = module.getFunctionName(functionObject);
            let functionTypeObject = module.getTypeById(functionObject.typeId);
            let functionToTypeIr = module.getTypeById(functionTypeObject.toId).ir;

            /* Call an instruction */
            if (functionObject.name === '$getMemorySize') {
                expressionObject.ir = module.ir.memory.size();
            } else {
                /* Call a custom function */
                expressionObject.ir = module.ir.call(
                    functionName,
                    [],
                    functionToTypeIr
                );
            }
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateCallByName(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = nameNode.object;
        let argumentNodeListNode = module.getNodeById(node.childIdList[1]);
        let argumentIrList = [];
        let expressionObject = module.getExpressionById(node.object.id);

        for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
            let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[i]);
            let argumentObject = module.getExpressionById(argumentNode.object.id);

            argumentIrList.push(argumentObject.ir);
        }
        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.id);
            let variableTypeObject = module.getTypeById(variableObject.typeId);
            let targetIr = -1;
            let functionFromTypeIrList = [];
            let functionToTypeIr = module.getTypeById(variableTypeObject.toId).ir;

            if (variableObject.index === -1) {
                targetIr = module.ir.global.get(
                    variableObject.name,
                    variableTypeObject.ir
                );
            } else {
                targetIr = module.ir.local.get(
                    variableObject.index,
                    variableTypeObject.ir
                );
            }
            for (let i = 0; i < variableTypeObject.fromIdList.length; i++) {
                let functionFromTypeObject = module.getTypeById(variableTypeObject.fromIdList[i]);

                functionFromTypeIrList.push(functionFromTypeObject.ir);
            }
            expressionObject.ir = module.ir.call_indirect(
                '$table',
                targetIr,
                argumentIrList,
                binaryen.createType(functionFromTypeIrList),
                functionToTypeIr
            );
        } else if (object.type === 'function') {
            let functionObject = module.getFunctionById(object.id);
            let functionName = module.getFunctionName(functionObject);
            let functionTypeObject = module.getTypeById(functionObject.typeId);
            let functionToTypeIr = module.getTypeById(functionTypeObject.toId).ir;

            /* Call an instruction */
            if (functionObject.name === '$sub') {
                if (functionTypeObject.name === '[$i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.sub(
                        module.ir.i32.const(0),
                        argumentIrList[0]
                    );
                } else if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.sub(
                        module.ir.i32.const(0),
                        argumentIrList[0]
                    );
                } else if (functionTypeObject.name === '[$id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.sub(
                        module.ir.i64.const(0, 0),
                        argumentIrList[0]
                    );
                } else if (functionTypeObject.name === '[$f] -> [$f]') {
                    expressionObject.ir = module.ir.f32.neg(
                        argumentIrList[0]
                    );
                } else if (functionTypeObject.name === '[$fd] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.neg(
                        argumentIrList[0]
                    );
                } else if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.sub(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.sub(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.sub(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$f]') {
                    expressionObject.ir = module.ir.f32.sub(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.sub(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$add') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.add(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.add(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.add(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$f]') {
                    expressionObject.ir = module.ir.f32.add(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.add(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$mul') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.mul(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.mul(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.mul(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$f]') {
                    expressionObject.ir = module.ir.f32.mul(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.mul(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$div') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.div_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.div_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.div_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$f]') {
                    expressionObject.ir = module.ir.f32.div(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.div(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$rem') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.rem_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.rem_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.rem_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$eq') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.eq(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.eq(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.eq(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.eq(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.eq(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$ne') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.ne(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.ne(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.ne(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.ne(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.ne(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$lt') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.lt_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.lt_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.lt_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.lt(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.lt(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$gt') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.gt_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.gt_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.gt_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.gt(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.gt(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$le') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.le_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.le_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.le_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.le(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.le(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$ge') {
                if (functionTypeObject.name === '[$i, $i] -> [$b]') {
                    expressionObject.ir = module.ir.i32.ge_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.ge_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$b]') {
                    expressionObject.ir = module.ir.i64.ge_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$f, $f] -> [$b]') {
                    expressionObject.ir = module.ir.f32.ge(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$fd, $fd] -> [$b]') {
                    expressionObject.ir = module.ir.f64.ge(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$not') {
                if (functionTypeObject.name === '[$i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.xor(
                        argumentIrList[0],
                        module.ir.i32.const(-1)
                    );
                } else if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.xor(
                        argumentIrList[0],
                        module.ir.i32.const(-1)
                    );
                } else if (functionTypeObject.name === '[$id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.xor(
                        argumentIrList[0],
                        module.ir.i64.const(-1, -1)
                    );
                } else if (functionTypeObject.name === '[$b] -> [$b]') {
                    expressionObject.ir = module.ir.i32.xor(
                        argumentIrList[0],
                        module.ir.i32.const(1)
                    );
                }
            } else if (functionObject.name === '$and') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.and(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.and(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.and(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$b, $b] -> [$b]') {
                    expressionObject.ir = module.ir.i32.and(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$or') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.or(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.or(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.or(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$b, $b] -> [$b]') {
                    expressionObject.ir = module.ir.i32.or(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$store') {
                if (functionTypeObject.name === '[$iu, $i] -> []') {
                    expressionObject.ir = module.ir.i32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $id] -> []') {
                    expressionObject.ir = module.ir.i64.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $f] -> []') {
                    expressionObject.ir = module.ir.f32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $fd] -> []') {
                    expressionObject.ir = module.ir.f64.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $b] -> []') {
                    expressionObject.ir = module.ir.i32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$store8') {
                if (functionTypeObject.name === '[$iu, $i] -> []') {
                    expressionObject.ir = module.ir.i32.store8(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store8(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$store16') {
                if (functionTypeObject.name === '[$iu, $i] -> []') {
                    expressionObject.ir = module.ir.i32.store16(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store16(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$load_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load_$id') {
                if (functionTypeObject.name === '[$iu] -> [$id]') {
                    expressionObject.ir = module.ir.i64.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load_$f') {
                if (functionTypeObject.name === '[$iu] -> [$f]') {
                    expressionObject.ir = module.ir.f32.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load_$fd') {
                if (functionTypeObject.name === '[$iu] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load_$b') {
                if (functionTypeObject.name === '[$iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load8_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load8_s(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load8_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load8_u(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load16_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load16_s(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$load16_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load16_u(
                        0,
                        0,
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$growMemory') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.memory.grow(
                        argumentIrList[0]
                    );
                }
            } else if (functionObject.name === '$getMemorySize') {
                if (functionTypeObject.name === '[] -> [$iu]') {
                    expressionObject.ir = module.ir.memory.size();
                }
            } else if (functionObject.name === '$shl') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.shl(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.shl(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.shl(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$shr') {
                if (functionTypeObject.name === '[$i, $i] -> [$i]') {
                    expressionObject.ir = module.ir.i32.shr_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.shr_u(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                } else if (functionTypeObject.name === '[$id, $id] -> [$id]') {
                    expressionObject.ir = module.ir.i64.shr_s(
                        argumentIrList[0],
                        argumentIrList[1]
                    );
                }
            } else if (functionObject.name === '$copyMemory') {
                if (functionTypeObject.name === '[$iu, $iu, $iu] -> []') {
                    expressionObject.ir = module.ir.memory.copy(
                        argumentIrList[0],
                        argumentIrList[1],
                        argumentIrList[2]
                    );
                }
            } else {
                /* Call a custom function */
                expressionObject.ir = module.ir.call(
                    functionName,
                    argumentIrList,
                    functionToTypeIr
                );
            }
        }
        module.unsetActiveNode();
        node.status = 'TRANSLATED';

        //console.log(node, expressionObject, functionObject, functionName, functionTypeObject, 'B');
        //process.exit();

    }
}

function translateCallByExpression(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let $expressionNode = module.getNodeById(node.childIdList[0]);
        let $expressionObject = module.getExpressionById($expressionNode.object.id);
        let $expressionTypeObject = module.getExpressionType($expressionObject);
        let targetIr = $expressionObject.ir;
        let argumentNodeListNode = module.getNodeById(node.childIdList[1]);
        let argumentIrList = [];
        let functionFromTypeIrList = [];
        let functionToTypeIr = module.getTypeById($expressionTypeObject.toId).ir;
        let expressionObject = module.getExpressionById(node.object.id);

        for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
            let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[i]);
            let argumentObject = module.getExpressionById(argumentNode.object.id);

            argumentIrList.push(argumentObject.ir);
        }
        for (let i = 0; i < $expressionTypeObject.fromIdList.length; i++) {
            let functionFromTypeObject = module.getTypeById($expressionTypeObject.fromIdList[i]);

            functionFromTypeIrList.push(functionFromTypeObject.ir);
        }
        expressionObject.ir = module.ir.call_indirect(
            '$table',
            targetIr,
            argumentIrList,
            binaryen.createType(functionFromTypeIrList),
            functionToTypeIr
        );
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

function translateTargetStmt(module, node, binaryen) {
    if (node.status === 'CHECKED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        node.ir = expressionObject.ir;
        module.unsetActiveNode();
        node.status = 'TRANSLATED';
    }
}

export default translate;
