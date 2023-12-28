import Binaryen from './binaryen.js';
import { getModuleByPath, getNodeById, setActiveNodeList, getActiveNode, unsetActiveNode, getMainNode, getBlockById, getBlockObjectByName, getTypeByName, getTypeById, getFunctionById, getFunctionName, getVariableById, getExpressionById, getExpressionType, getExpressionValueId, getReferenceById, getSubmoduleById, getStringById } from '../module.js';

async function translateModule(compiler, module) {
    let node = getMainNode(compiler, module);
    let binaryen = await Binaryen();

    module.status = 'TRANSLATING';
    setActiveNodeList(compiler, module, [node.id]);

    module.ir = new binaryen.Module();
    /* Set some features of the Binaryen library */
    module.ir.setFeatures(
        binaryen.Features.MutableGlobals |
        /* For the instruction '$copyMemory' */
        binaryen.Features.BulkMemory |
        /* This feature allows us to store non-interpolated strings in global variables */
        binaryen.Features.ExtendedConst
    );
    while (node) {
        if (node.name === 'moduleStmt') {
            translateModuleStmt(compiler, module, node, binaryen);
        } else if (node.name === 'moduleBlock') {
            translateModuleBlock(compiler, module, node, binaryen);
        } else if (node.name === 'importStmt') {
            translateImportStmt(compiler, module, node, binaryen);
        } else if (node.name === 'submodule') {
            translateSubmodule(compiler, module, node, binaryen);
        } else if (node.name === 'list') {
            translateList(compiler, module, node, binaryen);
        } else if (node.name === 'externalObject') {
            translateExternalObject(compiler, module, node, binaryen);
        } else if (node.name === 'variable') {
            translateVariable(compiler, module, node, binaryen);
        } else if (node.name === 'basicType') {
            translateBasicType(compiler, module, node, binaryen);
        } else if (node.name === 'function') {
            translateFunction(compiler, module, node, binaryen);
        } else if (node.name === 'referenceType') {
            translateReferenceType(compiler, module, node, binaryen);
        } else if (node.name === 'initializationStmt') {
            translateInitializationStmt(compiler, module, node, binaryen);
        } else if (node.name === 'integerSingleSigned') {
            translateIntegerSingleSigned(compiler, module, node, binaryen);
        } else if (node.name === 'integerSingleUnsigned') {
            translateIntegerSingleUnsigned(compiler, module, node, binaryen);
        } else if (node.name === 'integerDouble') {
            translateIntegerDouble(compiler, module, node, binaryen);
        } else if (node.name === 'floatingPointSingle') {
            translateFloatingPointSingle(compiler, module, node, binaryen);
        } else if (node.name === 'floatingPointDouble') {
            translateFloatingPointDouble(compiler, module, node, binaryen);
        } else if (node.name === 'boolean') {
            translateBoolean(compiler, module, node, binaryen);
        } else if (node.name === 'stringNonInterpolated') {
            translateStringNonInterpolated(compiler, module, node, binaryen);
        } else if (node.name === 'string') {
            translateString(compiler, module, node, binaryen);
        } else if (node.name === 'functionStmt') {
            translateFunctionStmt(compiler, module, node, binaryen);
        } else if (node.name === 'nonModuleBlock') {
            translateNonModuleBlock(compiler, module, node, binaryen);
        } else if (node.name === 'assignmentStmt') {
            translateAssignmentStmt(compiler, module, node, binaryen);
        } else if (node.name === 'nothingStmt') {
            translateNothingStmt(compiler, module, node, binaryen);
        } else if (node.name === 'ifElseStmt') {
            translateIfElseStmt(compiler, module, node, binaryen);
        } else if (node.name === 'whileStmt') {
            translateWhileStmt(compiler, module, node, binaryen);
        } else if (node.name === 'returnStmt') {
            translateReturnStmt(compiler, module, node, binaryen);
        } else if (node.name === 'void') {
            translateVoid(compiler, module, node, binaryen);
        } else if (node.name === 'reference') {
            translateReference(compiler, module, node, binaryen);
        } else if (node.name === 'identifier') {
            translateIdentifier(compiler, module, node, binaryen);
        } else if (node.name === 'externalIdentifier') {
            translateExternalIdentifier(compiler, module, node, binaryen);
        } else if (node.name === 'name') {
            translateName(compiler, module, node, binaryen);
        } else if (node.name === 'instruction') {
            translateInstruction(compiler, module, node, binaryen);
        } else if (node.name === 'callByName') {
            translateCallByName(compiler, module, node, binaryen);
        } else if (node.name === 'operator') {
            translateOperator(compiler, module, node, binaryen);
        } else if (node.name === 'callByExpression') {
            translateCallByExpression(compiler, module, node, binaryen);
        } else if (node.name === 'exprStmt') {
            translateExprStmt(compiler, module, node, binaryen);
        }
        node = getActiveNode(compiler, module);
    }
    module.ir.validate();
    module.status = 'TRANSLATED';
}

function translateModuleStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let segment = {
            passive: false,
            offset: module.ir.global.get(
                '$memoryOffset',
                binaryen.i32
            ),
            data: new Uint8Array(module.strings.pointer)
        };
        let segmentList = [segment];
        let referenceNameList = [];

        /* Import a global variable that stores a pointer to the memory */
        /* This pointer points to the start of static data of this module */
        /* Linker calculates the exact value of this variable for every module individually */
        module.ir.addGlobalImport(
            '$memoryOffset',
            '$submodule',
            '$memoryOffset',
            binaryen.i32,
            false
        );

        /* Set memory */
        for (let i = 0; i < module.strings.list.length; i++) {
            let stringObject = module.strings.list[i];

            segment.data.set(stringObject.value, stringObject.pointer);
        }
        module.ir.setMemory(
            0,
            -1,
            null,
            segmentList,
            false,
            false,
            '$memory'
        );

        /* Import memory */
        module.ir.addMemoryImport(
            '$memory',
            '$submodule',
            '$memory',
            false
        );

        /* Import a global variable that stores a pointer to the table */
        /* This pointer points to the first reference of this module */
        /* Note that, a reference is an expression defined by &function-name */
        /* Linker calculates the exact value of this variable for every module individually */
        module.ir.addGlobalImport(
            '$tableOffset',
            '$submodule',
            '$tableOffset',
            binaryen.i32,
            false
        );

        /* Import table */
        module.ir.addTableImport(
            '$table',
            '$submodule',
            '$table'
        );

        /* Import function 'show' */
        module.ir.addFunctionImport(
            'show_[$i]->[]',
            '$submodule',
            'show_[$i]->[]',
            binaryen.createType([
                binaryen.i32
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$iu]->[]',
            '$submodule',
            'show_[$iu]->[]',
            binaryen.createType([
                binaryen.i32
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$id]->[]',
            '$submodule',
            'show_[$id]->[]',
            binaryen.createType([
                binaryen.i64
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$f]->[]',
            '$submodule',
            'show_[$f]->[]',
            binaryen.createType([
                binaryen.f32
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$fd]->[]',
            '$submodule',
            'show_[$fd]->[]',
            binaryen.createType([
                binaryen.f64
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$b]->[]',
            '$submodule',
            'show_[$b]->[]',
            binaryen.createType([
                binaryen.i32
            ]),
            binaryen.none
        );
        module.ir.addFunctionImport(
            'show_[$s]->[]',
            '$submodule',
            'show_[$s]->[]',
            binaryen.createType([
                binaryen.i32
            ]),
            binaryen.none
        );

        /* Fill the table */
        for (let i = 0; i < module.references.list.length; i++) {
            let reference = module.references.list[i];

            referenceNameList.push(reference.name);
        }
        module.ir.addActiveElementSegment(
            '$table',
            '$functions',
            referenceNameList,
            module.ir.global.get(
                '$tableOffset',
                binaryen.i32
            )
        );

        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateModuleBlock(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        /* The second pass is devoted to translate the signatures of functions */
        /* Translated signatures are used to translate inferred initialization statements */
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '2';
    } else if (node.status === '2') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateImportStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[1], node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let submoduleNode = getNodeById(compiler, module, node.childIdList[1]);
        let submoduleObject = getSubmoduleById(compiler, module, submoduleNode.object.id);
        let submodule = getModuleByPath(compiler, submoduleObject.path);

        for (let i = 0; i < submoduleObject.objectList.length; i++) {
            let externalObject = submoduleObject.objectList[i];

            if (externalObject.type === 'variable') {
                let variableObject = getVariableById(compiler, module, externalObject.internalId);
                let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);
                let externalVariableObject = getVariableById(compiler, submodule, externalObject.id);

                module.ir.addGlobalImport(
                    variableObject.name,
                    submoduleObject.name,
                    externalVariableObject.name,
                    variableTypeObject.ir,
                    !variableObject.isConstant
                );
            } else if (externalObject.type === 'function') {
                let functionObject = getFunctionById(compiler, module, externalObject.internalId);
                let functionName = getFunctionName(compiler, module, functionObject);
                let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
                let functionFromTypeIrList = [];
                let functionToTypeIr = getTypeById(compiler, module, functionTypeObject.toId).ir;
                let externalFunctionObject = getFunctionById(compiler, submodule, externalObject.id);
                let externalFunctionName = getFunctionName(compiler, submodule, externalFunctionObject);

                for (let j = 0; j < functionTypeObject.fromIdList.length; j++) {
                    let functionFromTypeObject = getTypeById(compiler, module, functionTypeObject.fromIdList[j]);

                    functionFromTypeIrList.push(functionFromTypeObject.ir);
                }
                module.ir.addFunctionImport(
                    functionName,
                    submoduleObject.name,
                    externalFunctionName,
                    binaryen.createType(functionFromTypeIrList),
                    functionToTypeIr
                );
            }
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        unsetActiveNode(compiler, module);
    }
}

function translateSubmodule(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateList(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateExternalObject(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateVariable(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateBasicType(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let typeObject = getTypeById(compiler, module, node.object.id);

        if (typeObject.name === '$v') {
            typeObject.ir = binaryen.none;
        } else if (typeObject.name === '$i') {
            typeObject.ir = binaryen.i32;
        } else if (typeObject.name === '$iu') {
            typeObject.ir = binaryen.i32;
        } else if (typeObject.name === '$id') {
            typeObject.ir = binaryen.i64;
        } else if (typeObject.name === '$f') {
            typeObject.ir = binaryen.f32;
        } else if (typeObject.name === '$fd') {
            typeObject.ir = binaryen.f64;
        } else if (typeObject.name === '$b') {
            typeObject.ir = binaryen.i32;
        } else if (typeObject.name === '$s') {
            typeObject.ir = binaryen.i32;
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        unsetActiveNode(compiler, module);
    }
}

function translateFunction(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateReferenceType(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let typeObject = getTypeById(compiler, module, node.object.id);

        typeObject.ir = binaryen.i32;
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        unsetActiveNode(compiler, module);
    }
}

function translateInitializationStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let variableNode = getNodeById(compiler, module, node.childIdList[0]);
        let variableObject = getVariableById(compiler, module, variableNode.object.id);
        let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);
        let expressionNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

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
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    } else if (node.status === 'TRANSLATED') {
        unsetActiveNode(compiler, module);
    }
}

function translateIntegerSingleSigned(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        expressionObject.ir = module.ir.i32.const(node.value);
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateIntegerSingleUnsigned(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        expressionObject.ir = module.ir.i32.const(node.value);
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateIntegerDouble(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);
        let bigInt = BigInt(node.value);
        let bigInt64Array = new BigInt64Array([bigInt]);
        let int32Array = new Int32Array(bigInt64Array.buffer);
        let low = int32Array[0];
        let high = int32Array[1];

        expressionObject.ir = module.ir.i64.const(low, high);
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateFloatingPointSingle(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        expressionObject.ir = module.ir.f32.const(node.value);
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateFloatingPointDouble(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        expressionObject.ir = module.ir.f64.const(node.value);
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateBoolean(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        if (node.value === 'false') {
            expressionObject.ir = module.ir.i32.const(0);
        } else if (node.value === 'true') {
            expressionObject.ir = module.ir.i32.const(1);
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateStringNonInterpolated(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let stringNode = getNodeById(compiler, module, node.childIdList[0]);
        let stringObject = getStringById(compiler, module, stringNode.object.id);
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        expressionObject.ir = module.ir.i32.add(
            module.ir.global.get(
                '$memoryOffset',
                binaryen.i32
            ),
            module.ir.i32.const(stringObject.pointer)
        );
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateString(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateFunctionStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        unsetActiveNode(compiler, module);
        node.status = '2';
    } else if (node.status === '2') {
        setActiveNodeList(compiler, module, [node.childIdList[1], node.childIdList[2]]);
        node.status = '3';
    } else if (node.status === '3') {
        let functionNode = getNodeById(compiler, module, node.childIdList[0]);
        let functionObject = getFunctionById(compiler, module, functionNode.object.id);
        let functionName = getFunctionName(compiler, module, functionObject);
        let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
        let functionFromTypeIrList = [];
        let functionToTypeIr = getTypeById(compiler, module, functionTypeObject.toId).ir;
        let variableTypeIrList = [];
        let blockNode = getNodeById(compiler, module, node.childIdList[2]);
        let blockObject = getBlockById(compiler, module, blockNode.object.id);

        for (let i = 0; i < functionTypeObject.fromIdList.length; i++) {
            let functionFromTypeObject = getTypeById(compiler, module, functionTypeObject.fromIdList[i]);

            functionFromTypeIrList.push(functionFromTypeObject.ir);
        }
        for (let i = 0; i < functionObject.variables.idList.length; i++) {
            let variableObject = getVariableById(compiler, module, functionObject.variables.idList[i]);

            if (!variableObject.isParameter) {
                let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

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
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateNonModuleBlock(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let blockObject = getBlockById(compiler, module, node.object.id);
        let stmtIrList = [];

        for (let i = 0; i < node.childIdList.length; i++) {
            let stmtNode = getNodeById(compiler, module, node.childIdList[i]);

            stmtIrList.push(stmtNode.ir);
        }
        blockObject.ir = module.ir.block(
            null,
            stmtIrList,
            binaryen.none
        );
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateAssignmentStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, [node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let variableObject = getVariableById(compiler, module, nameNode.object.id);
        let expressionNode = getNodeById(compiler, module, node.childIdList[1]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

        if (variableObject.index === -1) {
            node.ir = module.ir.global.set(variableObject.name, expressionObject.ir);
        } else {
            node.ir = module.ir.local.set(variableObject.index, expressionObject.ir);
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateNothingStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        node.ir = module.ir.nop();
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateIfElseStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let ifBlockNode = getNodeById(compiler, module, node.childIdList[1]);
        let ifBlockObject = getBlockById(compiler, module, ifBlockNode.object.id);
        let elseBlockNode = getNodeById(compiler, module, node.childIdList[2]);
        let elseBlockObject = getBlockById(compiler, module, elseBlockNode.object.id);

        node.ir = module.ir.if(
            expressionObject.ir,
            ifBlockObject.ir,
            elseBlockObject.ir
        );
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateWhileStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);
        let blockNode = getNodeById(compiler, module, node.childIdList[1]);
        let blockObject = getBlockById(compiler, module, blockNode.object.id);
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
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateReturnStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

        if (expressionObject.ir === -1) {
            node.ir = module.ir.return();
        } else {
            node.ir = module.ir.return(
                expressionObject.ir
            );
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateVoid(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateReference(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = nameNode.object;
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.id);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

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
            let expressionValueId = getExpressionValueId(compiler, module, expressionObject);
            let reference = getReferenceById(compiler, module, expressionValueId);

            expressionObject.ir = module.ir.i32.add(
                module.ir.global.get(
                    '$tableOffset',
                    binaryen.i32
                ),
                module.ir.i32.const(
                    reference.pointer
                )
            );
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateIdentifier(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateExternalIdentifier(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateName(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = nameNode.object;
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.id);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);

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
                let functionToTypeIr = getTypeById(compiler, module, variableTypeObject.toId).ir;

                expressionObject.ir = module.ir.call_indirect(
                    '$table',
                    expressionObject.ir,
                    [],
                    binaryen.createType([]),
                    functionToTypeIr
                );
            }
        } else if (object.type === 'function') {
            let functionObject = getFunctionById(compiler, module, object.id);
            let functionName = getFunctionName(compiler, module, functionObject);
            let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
            let functionToTypeIr = getTypeById(compiler, module, functionTypeObject.toId).ir;

            /* Call an instruction */
            if (functionObject.name === '$getMemorySize') {
                expressionObject.ir = module.ir.memory.size(
                    '$memory'
                );
            } else {
                /* Call a custom function */
                expressionObject.ir = module.ir.call(
                    functionName,
                    [],
                    functionToTypeIr
                );
            }
        }
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateInstruction(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateCallByName(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = getNodeById(compiler, module, node.childIdList[0]);
        let object = nameNode.object;
        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let argumentIrList = [];
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
            let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
            let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

            argumentIrList.push(argumentObject.ir);
        }
        if (object.type === 'variable') {
            let variableObject = getVariableById(compiler, module, object.id);
            let variableTypeObject = getTypeById(compiler, module, variableObject.typeId);
            let targetIr = -1;
            let functionFromTypeIrList = [];
            let functionToTypeIr = getTypeById(compiler, module, variableTypeObject.toId).ir;

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
                let functionFromTypeObject = getTypeById(compiler, module, variableTypeObject.fromIdList[i]);

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
            let functionObject = getFunctionById(compiler, module, object.id);
            let functionName = getFunctionName(compiler, module, functionObject);
            let functionTypeObject = getTypeById(compiler, module, functionObject.typeId);
            let functionToTypeIr = getTypeById(compiler, module, functionTypeObject.toId).ir;

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
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $id] -> []') {
                    expressionObject.ir = module.ir.i64.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $f] -> []') {
                    expressionObject.ir = module.ir.f32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $fd] -> []') {
                    expressionObject.ir = module.ir.f64.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $b] -> []') {
                    expressionObject.ir = module.ir.i32.store(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$store8') {
                if (functionTypeObject.name === '[$iu, $i] -> []') {
                    expressionObject.ir = module.ir.i32.store8(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store8(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$store16') {
                if (functionTypeObject.name === '[$iu, $i] -> []') {
                    expressionObject.ir = module.ir.i32.store16(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                } else if (functionTypeObject.name === '[$iu, $iu] -> []') {
                    expressionObject.ir = module.ir.i32.store16(
                        0,
                        0,
                        argumentIrList[0],
                        argumentIrList[1],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$id') {
                if (functionTypeObject.name === '[$iu] -> [$id]') {
                    expressionObject.ir = module.ir.i64.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$f') {
                if (functionTypeObject.name === '[$iu] -> [$f]') {
                    expressionObject.ir = module.ir.f32.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$fd') {
                if (functionTypeObject.name === '[$iu] -> [$fd]') {
                    expressionObject.ir = module.ir.f64.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load_$b') {
                if (functionTypeObject.name === '[$iu] -> [$b]') {
                    expressionObject.ir = module.ir.i32.load(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load8_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load8_s(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load8_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load8_u(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load16_$i') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.i32.load16_s(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$load16_$iu') {
                if (functionTypeObject.name === '[$iu] -> [$iu]') {
                    expressionObject.ir = module.ir.i32.load16_u(
                        0,
                        0,
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$growMemory') {
                if (functionTypeObject.name === '[$iu] -> [$i]') {
                    expressionObject.ir = module.ir.memory.grow(
                        argumentIrList[0],
                        '$memory'
                    );
                }
            } else if (functionObject.name === '$getMemorySize') {
                if (functionTypeObject.name === '[] -> [$iu]') {
                    expressionObject.ir = module.ir.memory.size(
                        '$memory'
                    );
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
                        argumentIrList[2],
                        '$memory',
                        '$memory'
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
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateOperator(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateCallByExpression(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let $expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let $expressionObject = getExpressionById(compiler, module, $expressionNode.object.id);
        let $expressionTypeObject = getExpressionType(compiler, module, $expressionObject);
        let targetIr = $expressionObject.ir;
        let argumentNodeListNode = getNodeById(compiler, module, node.childIdList[1]);
        let argumentIrList = [];
        let functionFromTypeIrList = [];
        let functionToTypeIr = getTypeById(compiler, module, $expressionTypeObject.toId).ir;
        let expressionObject = getExpressionById(compiler, module, node.object.id);

        for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
            let argumentNode = getNodeById(compiler, module, argumentNodeListNode.childIdList[i]);
            let argumentObject = getExpressionById(compiler, module, argumentNode.object.id);

            argumentIrList.push(argumentObject.ir);
        }
        for (let i = 0; i < $expressionTypeObject.fromIdList.length; i++) {
            let functionFromTypeObject = getTypeById(compiler, module, $expressionTypeObject.fromIdList[i]);

            functionFromTypeIrList.push(functionFromTypeObject.ir);
        }
        expressionObject.ir = module.ir.call_indirect(
            '$table',
            targetIr,
            argumentIrList,
            binaryen.createType(functionFromTypeIrList),
            functionToTypeIr
        );
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

function translateExprStmt(compiler, module, node, binaryen) {
    if (node.status === 'CHECKED') {
        setActiveNodeList(compiler, module, node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = getNodeById(compiler, module, node.childIdList[0]);
        let expressionObject = getExpressionById(compiler, module, expressionNode.object.id);

        node.ir = expressionObject.ir;
        unsetActiveNode(compiler, module);
        node.status = 'TRANSLATED';
    }
}

export { translateModule };
