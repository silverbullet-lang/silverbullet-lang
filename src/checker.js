import throwError from './error.js';

function check(module) {

    //console.log(module.nodes.list);

    let node;

    module.setActiveNodeList([module.getLastNode().id]);
    node = module.getActiveNode();
    while (node) {

        //console.log(module.nodes.stack);

        if (node.name === 'moduleStmt') {
            checkModuleStmt(module, node);
        } else if (node.name === 'module') {
            checkModule(module, node);
        } else if (node.name === 'moduleBlock') {
            checkModuleBlock(module, node);
        } else if (node.name === 'importStmt') {
            checkImportStmt(module, node);
        } else if (node.name === 'list') {
            checkList(module, node);
        } else if (node.name === 'variable') {
            checkVariable(module, node);
        } else if (node.name === 'basicType') {
            checkBasicType(module, node);
        } else if (node.name === 'function') {
            checkFunction(module, node);
        } else if (node.name === 'referenceType') {
            checkReferenceType(module, node);
        } else if (node.name === 'initializationStmt') {
            checkInitializationStmt(module, node);
        } else if (node.name === 'integerSingleSigned') {
            checkIntegerSingleSigned(module, node);
        } else if (node.name === 'integerSingleUnsigned') {
            checkIntegerSingleUnsigned(module, node);
        } else if (node.name === 'integerDouble') {
            checkIntegerDouble(module, node);
        } else if (node.name === 'floatingPointSingle') {
            checkFloatingPointSingle(module, node);
        } else if (node.name === 'floatingPointDouble') {
            checkFloatingPointDouble(module, node);
        } else if (node.name === 'boolean') {
            checkBoolean(module, node);
        } else if (node.name === 'functionStmt') {
            checkFunctionStmt(module, node);
        } else if (node.name === 'nonModuleBlock') {
            checkNonModuleBlock(module, node);
        } else if (node.name === 'assignmentStmt') {
            checkAssignmentStmt(module, node);
        } else if (node.name === 'nothingStmt') {
            checkNothingStmt(module, node);
        } else if (node.name === 'ifElseStmt') {
            checkIfElseStmt(module, node);
        } else if (node.name === 'whileStmt') {
            checkWhileStmt(module, node);
        } else if (node.name === 'returnStmt') {
            checkReturnStmt(module, node);
        } else if (node.name === 'void') {
            checkVoid(module, node);
        } else if (node.name === 'reference') {
            checkReference(module, node);
        } else if (node.name === 'name') {
            checkName(module, node);
        } else if (node.name === 'callByName') {
            checkCallByName(module, node);
        } else if (node.name === 'callByExpression') {
            checkCallByExpression(module, node);
        } else if (node.name === 'targetStmt') {
            checkTargetStmt(module, node);
        }
        node = module.getActiveNode();
    }
}

function checkModuleStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let moduleNode = module.getNodeById(node.childIdList[0]);
        let moduleObject = module.getModuleById(moduleNode.object.id);
        let blockObject = module.getNewBlock('module', moduleObject.id);

        moduleObject.blockId = blockObject.id;
        module.setActiveBlock(moduleObject.blockId);

        /* Register basic types */
        module.getNewType('', '$v', [], -1);
        module.getNewType('', '$i', [], -1);
        module.getNewType('', '$iu', [], -1);
        module.getNewType('', '$id', [], -1);
        module.getNewType('', '$f', [], -1);
        module.getNewType('', '$fd', [], -1);
        module.getNewType('', '$b', [], -1);

        /* Register reference types related to instructions */
        module.getNewType('reference', '[$i] -> [$i]', [module.getTypeByName('$i').id], module.getTypeByName('$i').id);
        module.getNewType('reference', '[$iu] -> [$iu]', [module.getTypeByName('$iu').id], module.getTypeByName('$iu').id);
        module.getNewType('reference', '[$id] -> [$id]', [module.getTypeByName('$id').id], module.getTypeByName('$id').id);
        module.getNewType('reference', '[$f] -> [$f]', [module.getTypeByName('$f').id], module.getTypeByName('$f').id);
        module.getNewType('reference', '[$fd] -> [$fd]', [module.getTypeByName('$fd').id], module.getTypeByName('$fd').id);
        module.getNewType('reference', '[$i, $i] -> [$i]', [module.getTypeByName('$i').id, module.getTypeByName('$i').id], module.getTypeByName('$i').id);
        module.getNewType('reference', '[$iu, $iu] -> [$iu]', [module.getTypeByName('$iu').id, module.getTypeByName('$iu').id], module.getTypeByName('$iu').id);
        module.getNewType('reference', '[$id, $id] -> [$id]', [module.getTypeByName('$id').id, module.getTypeByName('$id').id], module.getTypeByName('$id').id);
        module.getNewType('reference', '[$f, $f] -> [$f]', [module.getTypeByName('$f').id, module.getTypeByName('$f').id], module.getTypeByName('$f').id);
        module.getNewType('reference', '[$fd, $fd] -> [$fd]', [module.getTypeByName('$fd').id, module.getTypeByName('$fd').id], module.getTypeByName('$fd').id);
        module.getNewType('reference', '[$i, $i] -> [$b]', [module.getTypeByName('$i').id, module.getTypeByName('$i').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$iu, $iu] -> [$b]', [module.getTypeByName('$iu').id, module.getTypeByName('$iu').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$id, $id] -> [$b]', [module.getTypeByName('$id').id, module.getTypeByName('$id').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$f, $f] -> [$b]', [module.getTypeByName('$f').id, module.getTypeByName('$f').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$fd, $fd] -> [$b]', [module.getTypeByName('$fd').id, module.getTypeByName('$fd').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$b] -> [$b]', [module.getTypeByName('$b').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$b, $b] -> [$b]', [module.getTypeByName('$b').id, module.getTypeByName('$b').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[$iu, $i] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$i').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu, $iu] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$iu').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu, $id] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$id').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu, $f] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$f').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu, $fd] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$fd').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu, $b] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$b').id], module.getTypeByName('$v').id);
        module.getNewType('reference', '[$iu] -> [$i]', [module.getTypeByName('$iu').id], module.getTypeByName('$i').id);
        module.getNewType('reference', '[$iu] -> [$id]', [module.getTypeByName('$iu').id], module.getTypeByName('$id').id);
        module.getNewType('reference', '[$iu] -> [$f]', [module.getTypeByName('$iu').id], module.getTypeByName('$f').id);
        module.getNewType('reference', '[$iu] -> [$fd]', [module.getTypeByName('$iu').id], module.getTypeByName('$fd').id);
        module.getNewType('reference', '[$iu] -> [$b]', [module.getTypeByName('$iu').id], module.getTypeByName('$b').id);
        module.getNewType('reference', '[] -> [$iu]', [], module.getTypeByName('$iu').id);
        module.getNewType('reference', '[$iu, $iu, $iu] -> []', [module.getTypeByName('$iu').id, module.getTypeByName('$iu').id, module.getTypeByName('$iu').id], module.getTypeByName('$v').id);

        /* Register instructions */

        /* $sub */
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$i] -> [$i]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$iu] -> [$iu]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$id] -> [$id]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$f] -> [$f]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$fd] -> [$fd]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$f, $f] -> [$f]').id).id);
        module.setObject('$sub', 'function', module.getNewFunction(-1, true, '$sub', module.getTypeByName('[$fd, $fd] -> [$fd]').id).id);

        /* $add */
        module.setObject('$add', 'function', module.getNewFunction(-1, true, '$add', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$add', 'function', module.getNewFunction(-1, true, '$add', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$add', 'function', module.getNewFunction(-1, true, '$add', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$add', 'function', module.getNewFunction(-1, true, '$add', module.getTypeByName('[$f, $f] -> [$f]').id).id);
        module.setObject('$add', 'function', module.getNewFunction(-1, true, '$add', module.getTypeByName('[$fd, $fd] -> [$fd]').id).id);

        /* $mul */
        module.setObject('$mul', 'function', module.getNewFunction(-1, true, '$mul', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$mul', 'function', module.getNewFunction(-1, true, '$mul', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$mul', 'function', module.getNewFunction(-1, true, '$mul', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$mul', 'function', module.getNewFunction(-1, true, '$mul', module.getTypeByName('[$f, $f] -> [$f]').id).id);
        module.setObject('$mul', 'function', module.getNewFunction(-1, true, '$mul', module.getTypeByName('[$fd, $fd] -> [$fd]').id).id);

        /* $div */
        module.setObject('$div', 'function', module.getNewFunction(-1, true, '$div', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$div', 'function', module.getNewFunction(-1, true, '$div', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$div', 'function', module.getNewFunction(-1, true, '$div', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$div', 'function', module.getNewFunction(-1, true, '$div', module.getTypeByName('[$f, $f] -> [$f]').id).id);
        module.setObject('$div', 'function', module.getNewFunction(-1, true, '$div', module.getTypeByName('[$fd, $fd] -> [$fd]').id).id);

        /* $rem */
        module.setObject('$rem', 'function', module.getNewFunction(-1, true, '$rem', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$rem', 'function', module.getNewFunction(-1, true, '$rem', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$rem', 'function', module.getNewFunction(-1, true, '$rem', module.getTypeByName('[$id, $id] -> [$id]').id).id);

        /* $eq */
        module.setObject('$eq', 'function', module.getNewFunction(-1, true, '$eq', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$eq', 'function', module.getNewFunction(-1, true, '$eq', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$eq', 'function', module.getNewFunction(-1, true, '$eq', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$eq', 'function', module.getNewFunction(-1, true, '$eq', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$eq', 'function', module.getNewFunction(-1, true, '$eq', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $ne */
        module.setObject('$ne', 'function', module.getNewFunction(-1, true, '$ne', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$ne', 'function', module.getNewFunction(-1, true, '$ne', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$ne', 'function', module.getNewFunction(-1, true, '$ne', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$ne', 'function', module.getNewFunction(-1, true, '$ne', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$ne', 'function', module.getNewFunction(-1, true, '$ne', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $lt */
        module.setObject('$lt', 'function', module.getNewFunction(-1, true, '$lt', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$lt', 'function', module.getNewFunction(-1, true, '$lt', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$lt', 'function', module.getNewFunction(-1, true, '$lt', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$lt', 'function', module.getNewFunction(-1, true, '$lt', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$lt', 'function', module.getNewFunction(-1, true, '$lt', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $gt */
        module.setObject('$gt', 'function', module.getNewFunction(-1, true, '$gt', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$gt', 'function', module.getNewFunction(-1, true, '$gt', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$gt', 'function', module.getNewFunction(-1, true, '$gt', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$gt', 'function', module.getNewFunction(-1, true, '$gt', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$gt', 'function', module.getNewFunction(-1, true, '$gt', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $le */
        module.setObject('$le', 'function', module.getNewFunction(-1, true, '$le', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$le', 'function', module.getNewFunction(-1, true, '$le', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$le', 'function', module.getNewFunction(-1, true, '$le', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$le', 'function', module.getNewFunction(-1, true, '$le', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$le', 'function', module.getNewFunction(-1, true, '$le', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $ge */
        module.setObject('$ge', 'function', module.getNewFunction(-1, true, '$ge', module.getTypeByName('[$i, $i] -> [$b]').id).id);
        module.setObject('$ge', 'function', module.getNewFunction(-1, true, '$ge', module.getTypeByName('[$iu, $iu] -> [$b]').id).id);
        module.setObject('$ge', 'function', module.getNewFunction(-1, true, '$ge', module.getTypeByName('[$id, $id] -> [$b]').id).id);
        module.setObject('$ge', 'function', module.getNewFunction(-1, true, '$ge', module.getTypeByName('[$f, $f] -> [$b]').id).id);
        module.setObject('$ge', 'function', module.getNewFunction(-1, true, '$ge', module.getTypeByName('[$fd, $fd] -> [$b]').id).id);

        /* $not */
        module.setObject('$not', 'function', module.getNewFunction(-1, true, '$not', module.getTypeByName('[$i] -> [$i]').id).id);
        module.setObject('$not', 'function', module.getNewFunction(-1, true, '$not', module.getTypeByName('[$iu] -> [$iu]').id).id);
        module.setObject('$not', 'function', module.getNewFunction(-1, true, '$not', module.getTypeByName('[$id] -> [$id]').id).id);
        module.setObject('$not', 'function', module.getNewFunction(-1, true, '$not', module.getTypeByName('[$b] -> [$b]').id).id);

        /* $and */
        module.setObject('$and', 'function', module.getNewFunction(-1, true, '$and', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$and', 'function', module.getNewFunction(-1, true, '$and', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$and', 'function', module.getNewFunction(-1, true, '$and', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$and', 'function', module.getNewFunction(-1, true, '$and', module.getTypeByName('[$b, $b] -> [$b]').id).id);

        /* $or */
        module.setObject('$or', 'function', module.getNewFunction(-1, true, '$or', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$or', 'function', module.getNewFunction(-1, true, '$or', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$or', 'function', module.getNewFunction(-1, true, '$or', module.getTypeByName('[$id, $id] -> [$id]').id).id);
        module.setObject('$or', 'function', module.getNewFunction(-1, true, '$or', module.getTypeByName('[$b, $b] -> [$b]').id).id);

        /* $store */
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $i] -> []').id).id);
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $iu] -> []').id).id);
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $id] -> []').id).id);
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $f] -> []').id).id);
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $fd] -> []').id).id);
        module.setObject('$store', 'function', module.getNewFunction(-1, true, '$store', module.getTypeByName('[$iu, $b] -> []').id).id);

        /* $store8 */
        module.setObject('$store8', 'function', module.getNewFunction(-1, true, '$store8', module.getTypeByName('[$iu, $i] -> []').id).id);
        module.setObject('$store8', 'function', module.getNewFunction(-1, true, '$store8', module.getTypeByName('[$iu, $iu] -> []').id).id);

        /* $store16 */
        module.setObject('$store16', 'function', module.getNewFunction(-1, true, '$store16', module.getTypeByName('[$iu, $i] -> []').id).id);
        module.setObject('$store16', 'function', module.getNewFunction(-1, true, '$store16', module.getTypeByName('[$iu, $iu] -> []').id).id);

        /* $load_$i */
        module.setObject('$load_$i', 'function', module.getNewFunction(-1, true, '$load_$i', module.getTypeByName('[$iu] -> [$i]').id).id);

        /* $load_$iu */
        module.setObject('$load_$iu', 'function', module.getNewFunction(-1, true, '$load_$iu', module.getTypeByName('[$iu] -> [$iu]').id).id);

        /* $load_$id */
        module.setObject('$load_$id', 'function', module.getNewFunction(-1, true, '$load_$id', module.getTypeByName('[$iu] -> [$id]').id).id);

        /* $load_$f */
        module.setObject('$load_$f', 'function', module.getNewFunction(-1, true, '$load_$f', module.getTypeByName('[$iu] -> [$f]').id).id);

        /* $load_$fd */
        module.setObject('$load_$fd', 'function', module.getNewFunction(-1, true, '$load_$fd', module.getTypeByName('[$iu] -> [$fd]').id).id);

        /* $load_$b */
        module.setObject('$load_$b', 'function', module.getNewFunction(-1, true, '$load_$b', module.getTypeByName('[$iu] -> [$b]').id).id);

        /* $load8_$i */
        module.setObject('$load8_$i', 'function', module.getNewFunction(-1, true, '$load8_$i', module.getTypeByName('[$iu] -> [$i]').id).id);

        /* $load8_$iu */
        module.setObject('$load8_$iu', 'function', module.getNewFunction(-1, true, '$load8_$iu', module.getTypeByName('[$iu] -> [$iu]').id).id);

        /* $load16_$i */
        module.setObject('$load16_$i', 'function', module.getNewFunction(-1, true, '$load16_$i', module.getTypeByName('[$iu] -> [$i]').id).id);

        /* $load16_$iu */
        module.setObject('$load16_$iu', 'function', module.getNewFunction(-1, true, '$load16_$iu', module.getTypeByName('[$iu] -> [$iu]').id).id);

        /* $growMemory */
        module.setObject('$growMemory', 'function', module.getNewFunction(-1, true, '$growMemory', module.getTypeByName('[$iu] -> [$i]').id).id);

        /* $getMemorySize */
        module.setObject('$getMemorySize', 'function', module.getNewFunction(-1, true, '$getMemorySize', module.getTypeByName('[] -> [$iu]').id).id);

        /* $shl */
        module.setObject('$shl', 'function', module.getNewFunction(-1, true, '$shl', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$shl', 'function', module.getNewFunction(-1, true, '$shl', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$shl', 'function', module.getNewFunction(-1, true, '$shl', module.getTypeByName('[$id, $id] -> [$id]').id).id);

        /* $shr */
        module.setObject('$shr', 'function', module.getNewFunction(-1, true, '$shr', module.getTypeByName('[$i, $i] -> [$i]').id).id);
        module.setObject('$shr', 'function', module.getNewFunction(-1, true, '$shr', module.getTypeByName('[$iu, $iu] -> [$iu]').id).id);
        module.setObject('$shr', 'function', module.getNewFunction(-1, true, '$shr', module.getTypeByName('[$id, $id] -> [$id]').id).id);

        /* $copyMemory */
        module.setObject('$copyMemory', 'function', module.getNewFunction(-1, true, '$copyMemory', module.getTypeByName('[$iu, $iu, $iu] -> []').id).id);

        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '2';

        //console.log(JSON.stringify(module.types, null, 2), JSON.stringify(module.functions, null, 2));
        //process.exit();

    } else if (node.status === '2') {
        module.unsetActiveBlock();
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkModule(module, node) {
    if (node.status === 'CREATED') {
        let moduleObject = module.getNewModule();

        module.setNodeObject(node, 'module', moduleObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkModuleBlock(module, node) {
    if (node.status === 'CREATED') {
        let blockObject = module.getNewBlock('', -1);

        module.setActiveBlock(blockObject.id);
        module.setNodeObject(node, 'block', blockObject.id);
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        module.setActiveNodeList(node.childIdList);
        node.status = '2';
    } else if (node.status === '2') {
        module.unsetActiveBlock();
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkImportStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        module.unsetActiveNode();
    }
}

function checkList(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkVariable(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        let modifierNodeListNode = module.getNodeById(node.childIdList[0]);
        let nameNode = module.getNodeById(node.childIdList[1]);
        let object = module.getObjectByName(nameNode.value);
        let typeNode = module.getNodeById(node.childIdList[2]);
        let typeObject = module.getTypeById(typeNode.object.id);
        let variableObject = module.getNewVariable(node.id, false, false, nameNode.value, typeObject.id);

        /* Set modifiers */
        for (let i = 0; i < modifierNodeListNode.childIdList.length; i++) {
            let modifierNode = module.getNodeById(modifierNodeListNode.childIdList[i]);

            if (modifierNode.value === 'constant') {
                if (!variableObject.isConstant) {
                    variableObject.isConstant = true;
                } else {
                    throwError(module, {
                        code: 'E_CHECK_VARIABLE_REPETITIVE_MODIFIER',
                        message: 'the modifier \'constant\' is already declared',
                        location: modifierNode.location
                    });
                }
            } else if (modifierNode.value === 'private') {
                if (variableObject.index === -1) {
                    if (!variableObject.isPrivate) {
                        variableObject.isPrivate = true;
                    } else {
                        throwError(module, {
                            code: 'E_CHECK_VARIABLE_REPETITIVE_MODIFIER',
                            message: 'the modifier \'private\' is already declared',
                            location: modifierNode.location
                        });
                    }
                } else {
                    throwError(module, {
                        code: 'E_CHECK_VARIABLE_PRIVATE_LOCAL',
                        message: 'the modifier \'private\' is not valid for a local variable',
                        location: modifierNode.location
                    });
                }
            } else {
                throwError(module, {
                    code: 'E_CHECK_VARIABLE_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a variable`,
                    location: modifierNode.location,
                    note: 'the following modifiers are valid for a variable: constant, private'
                });
            }
        }

        /* Check name */
        if (variableObject.name === 'start') {
            /* The name 'start' is reserved for the starting function */
            throwError(module, {
                code: 'E_CEHCK_VARIABLE_START',
                message: `the name '${ variableObject.name }' is reserved for the optional starting function of the module`,
                location: nameNode.location
            });
        }

        /* Register this variable */
        if (object.type === 'variable') {
            let $variableObject = module.getVariableById(object.idList[0]);
            let $variableNode = module.getNodeById($variableObject.nodeId);

            throwError(module, {
                code: 'E_CHECK_VARIABLE_REPETITIVE_NAME',
                message: `variable '${ variableObject.name }' cannot be created, because there is already a variable with the same name defined on the line ${ $variableNode.location.first_line }`,
                location: nameNode.location
            });
        } else if (object.type === 'function') {
            let functionObject = module.getFunctionById(object.idList[0]);
            let functionNode = module.getNodeById(functionObject.nodeId);

            throwError(module, {
                code: 'E_CHECK_VARIABLE_REPETITIVE_NAME',
                message: `variable '${ variableObject.name }' cannot be created, because there is already a function with the same name defined on the line ${ functionNode.location.first_line }`,
                location: nameNode.location
            });
        } else if (object.type === '') {
            module.setObject(variableObject.name, 'variable', variableObject.id);
        }

        module.setNodeObject(node, 'variable', variableObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkBasicType(module, node) {
    if (node.status === 'CREATED') {
        let typeObject = module.getTypeByName(node.value);

        module.setNodeObject(node, 'type', typeObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        module.unsetActiveNode();
    }
}

function checkFunction(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[2]]);
        node.status = '1';
    } else if (node.status === '1') {
        let modifierNodeListNode = module.getNodeById(node.childIdList[0]);
        let nameNode = module.getNodeById(node.childIdList[1]);
        let object = module.getObjectByName(nameNode.value);
        let typeNode = module.getNodeById(node.childIdList[2]);
        let typeObject = module.getTypeById(typeNode.object.id);
        let functionObject = module.getNewFunction(node.id, false, nameNode.value, typeObject.id);

        /* Set modifiers */
        for (let i = 0; i < modifierNodeListNode.childIdList.length; i++) {
            let modifierNode = module.getNodeById(modifierNodeListNode.childIdList[i]);

            if (modifierNode.value === 'private') {
                if (!functionObject.isPrivate) {
                    functionObject.isPrivate = true;
                } else {
                    throwError(module, {
                        code: 'E_CHECK_FUNCTION_REPETITIVE_MODIFIER',
                        message: 'the modifier \'private\' is already declared',
                        location: modifierNode.location
                    });
                }
            } else {
                throwError(module, {
                    code: 'E_CHECK_FUNCTION_INVALID_MODIFIER',
                    message: `the modifier '${ modifierNode.value }' is not valid for a function`,
                    location: modifierNode.location,
                    note: 'the following modifier is valid for a function: private'
                });
            }
        }
        /* Check name */
        if (functionObject.name === 'start') {
            /* Check if the signature of the starting function is correct */
            if ((typeObject.fromIdList.length === 0) && (typeObject.toId === module.getTypeByName('$v').id)) {
                module.setActiveModuleMainFunction(functionObject);
            } else {
                throwError(module, {
                    code: 'E_CHECK_FUNCTION_START_SIGNATURE',
                    message: `the signature of the starting function '${ functionObject.name }' is ${ module.getTypeName(typeObject) }; expected [] -> []`,
                    location: nameNode.location
                });
            }
        }

        /* Register this function */
        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.idList[0]);
            let variableNode = module.getNodeById(variableObject.nodeId);

            throwError(module, {
                code: 'E_CHECK_FUNCTION_REPETITIVE_NAME',
                message: `the function '${ functionObject.name }' cannot be created, because there is already a variable with the same name defined on the line ${ variableNode.location.first_line }`,
                location: nameNode.location
            });
        } else if (object.type === 'function') {
            /* There is already at least one function with the same name */
            /* Let's compare the types of parameters */
            /* If they match, then throw an error */

            for (let i = 0; i < object.idList.length; i++) {
                let $functionObject = module.getFunctionById(object.idList[i]);
                let $functionTypeObject = module.getTypeById($functionObject.typeId);

                if (typeObject.fromIdList.length === $functionTypeObject.fromIdList.length) {
                    let j = 0;
                    let isMatch = true;

                    while ((j < typeObject.fromIdList.length) && isMatch) {
                        let fromTypeObject = module.getTypeById(typeObject.fromIdList[j]);
                        let $functionFromTypeObject = module.getTypeById($functionTypeObject.fromIdList[j]);

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
                        let $functionNode = module.getNodeById($functionObject.nodeId);

                        throwError(module, {
                            code: 'E_CHECK_FUNCTION_REPETITIVE_NAME_AND_TYPES_OF_PARAMETERS',
                            message: `the function '${ functionObject.name }' cannot be created, because there is already a function with the same name and the same types of parameters defined on the line ${ $functionNode.location.first_line }`,
                            location: nameNode.location,
                            note: 'if two different functions with the same name have a parameter at the same position that is a reference, then we assume that types of such parameters match; for instance, the following two functions cannot be created: f[x | [] -> []] and f[x | [$i] -> []]'
                        });
                    }
                }
            }
            module.setObject(functionObject.name, 'function', functionObject.id);
        } else if (object.type === '') {
            module.setObject(functionObject.name, 'function', functionObject.id);
        }

        module.setNodeObject(node, 'function', functionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkReferenceType(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let name = '[';
        let fromTypeNodeListNode = module.getNodeById(node.childIdList[0]);
        let fromTypeIdList = [];
        let toTypeNode = module.getNodeById(node.childIdList[1]);
        let toTypeObject = module.getTypeById(toTypeNode.object.id);
        let toTypeId = toTypeObject.id;
        let typeObject;

        /* Construct the name of the type */
        for (let i = 0; i < fromTypeNodeListNode.childIdList.length; i++) {
            let fromTypeNode = module.getNodeById(fromTypeNodeListNode.childIdList[i]);
            let fromTypeObject = module.getTypeById(fromTypeNode.object.id);

            if (i > 0) {
                name += ', ';
            }
            name += fromTypeObject.name;
            fromTypeIdList.push(fromTypeObject.id);
        }
        name += '] -> [';
        if (toTypeObject.id !== module.getTypeByName('$v').id) {
            name += toTypeObject.name;
        }
        name += ']';

        /* Check if there is a type with the same name */
        typeObject = module.getTypeByName(name);
        if (!typeObject) {
            /* Create a new type with the constructed name */
            typeObject = module.getNewType('reference', name, fromTypeIdList, toTypeId);
        }

        module.setNodeObject(node, 'type', typeObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        module.unsetActiveNode();
    }
}

function checkVoid(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, false, [module.getTypeByName('$v').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkInitializationStmt(module, node) {
    if (node.status === 'CREATED') {
        /* First of all, we process the expression, later we process the variable */
        /* This allows us to avoid the case when the expression contains the name of the variable */
        module.setActiveNodeList([node.childIdList[1], node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        let variableNode = module.getNodeById(node.childIdList[0]);
        let variableObject = module.getVariableById(variableNode.object.id);
        let variableTypeObject = module.getTypeById(variableObject.typeId);
        let expressionNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        if ((variableObject.index > -1) || expressionObject.isLiteral) {
            if (variableTypeObject.id === module.getTypeByName('$v').id) {
                /* The type of variable is not declared */
                /* Let's try to infer it */
                let expressionTypeObject = module.getExpressionType(expressionObject);

                if (expressionTypeObject && (expressionTypeObject.id !== module.getTypeByName('$v').id)) {
                    /* The type of expression is unique and is not equal to 'void' */
                    /* The type of variable is now equal to the type of the expression */
                    variableObject.typeId = expressionTypeObject.id;
                } else {
                    throwError(module, {
                        code: 'E_CHECK_INITIALIZATION_EXPRESSION_TYPE_IS_INVALID',
                        message: `the type of variable '${ variableObject.name }' cannot be inferred, because the type of expression is ${ module.getExpressionTypeName(expressionObject) }`,
                        location: expressionNode.location
                    });
                }
            } else {
                if (!module.isExpressionInstanceOf(expressionObject, variableTypeObject)) {
                    throwError(module, {
                        code: 'E_CHECK_INITIALIZATION_TYPE_MISMATCH',
                        message: `the type of the expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(variableTypeObject) }`,
                        location: expressionNode.location
                    });
                }
            }
        } else {
            throwError(module, {
                code: 'E_CHECK_INITIALIZATION_GLOBAL_NON_LITERAL_VALUE',
                message: 'a global variable cannot be initialized with a non-literal value',
                location: expressionNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    } else if (node.status === 'CHECKED') {
        module.unsetActiveNode();
    }
}

function checkIntegerSingleSigned(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$i').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkIntegerSingleUnsigned(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$iu').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkIntegerDouble(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$id').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkFloatingPointSingle(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$f').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkFloatingPointDouble(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$fd').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkBoolean(module, node) {
    if (node.status === 'CREATED') {
        let expressionObject = module.getNewExpression(node.id, true, [module.getTypeByName('$b').id], 0);

        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkFunctionStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[0]]);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveNode();
        node.status = '2';
    } else if (node.status === '2') {
        let functionNode = module.getNodeById(node.childIdList[0]);
        let functionObject = module.getFunctionById(functionNode.object.id);
        let blockObject = module.getNewBlock('function', functionObject.id);

        functionObject.blockId = blockObject.id;
        module.setActiveBlock(functionObject.blockId);
        module.setActiveNodeList([node.childIdList[1], node.childIdList[2]]);
        node.status = '3';
    } else if (node.status === '3') {
        let functionNode = module.getNodeById(node.childIdList[0]);
        let functionObject = module.getFunctionById(functionNode.object.id);
        let functionTypeObject = module.getTypeById(functionObject.typeId);
        let functionToTypeObject = module.getTypeById(functionTypeObject.toId);

        if (functionToTypeObject.id !== module.getTypeByName('$v').id) {
            /* This function should return an expression */
            let blockNode = module.getNodeById(node.childIdList[2]);
            let blockNodeIdStack = [];

            while (blockNode) {
                let lastStmtNode = module.getNodeById(blockNode.childIdList[blockNode.childIdList.length - 1]);

                if (lastStmtNode.name !== 'returnStmt') {
                    if (lastStmtNode.name === 'ifElseStmt') {
                        let ifBlockNode = module.getNodeById(lastStmtNode.childIdList[1]);
                        let elseBlockNode = module.getNodeById(lastStmtNode.childIdList[2]);

                        blockNodeIdStack.unshift(ifBlockNode.id, elseBlockNode.id);
                    } else {
                        throwError(module, {
                            code: 'E_CHECK_FUNCTION_RETURN_IS_MISSING',
                            message: `the function '${ functionObject.name }' defined on line ${ functionNode.location.first_line } doesn't return on every branch; it must return an expression of type ${ module.getTypeName(functionToTypeObject) } above the line ${ lastStmtNode.location.last_line }`
                        });
                    }
                }
                blockNode = module.getNodeById(blockNodeIdStack.shift());
            }
        }
        module.unsetActiveBlock();
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkNonModuleBlock(module, node) {
    if (node.status === 'CREATED') {
        let blockObject = module.getNewBlock('', -1);

        module.setActiveBlock(blockObject.id);
        module.setNodeObject(node, 'block', blockObject.id);
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        module.unsetActiveBlock();
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkAssignmentStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = module.getObjectByName(nameNode.value);
        let expressionNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.idList[0]);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            module.setNodeObject(nameNode, 'variable', variableObject.id);
            if (!variableObject.isConstant) {
                if (!module.isExpressionInstanceOf(expressionObject, variableTypeObject)) {
                    throwError(module, {
                        code: 'E_CHECK_ASSIGNMENT_TYPE_MISMATCH',
                        message: `the type of the expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(variableTypeObject) }`,
                        location: expressionNode.location
                    });
                }
            } else {
                throwError(module, {
                    code: 'E_CHECK_ASSIGNMENT_TO_CONSTANT',
                    message: 'assignment to a variable with the modifier \'constant\' is not allowed',
                    location: nameNode.location
                });
            }
        } else if (object.type === 'function') {
            throwError(module, {
                code: 'E_CHECK_ASSIGNMENT_TO_FUNCTION',
                message: 'assignment to a function is not allowed',
                location: nameNode.location
            });
        } else if (object.type === '') {
            throwError(module, {
                code: 'E_CHECK_ASSIGNMENT_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkNothingStmt(module, node) {
    if (node.status === 'CREATED') {
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkIfElseStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let expectedExpressionTypeObject = module.getTypeByName('$b');

        if (!module.isExpressionInstanceOf(expressionObject, expectedExpressionTypeObject)) {
            throwError(module, {
                code: 'E_CHECK_IF_ELSE_TYPE_MISMATCH',
                message: `the type of the 'if-else' expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(expectedExpressionTypeObject) }`,
                location: expressionNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkWhileStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let expectedExpressionTypeObject = module.getTypeByName('$b');

        if (!module.isExpressionInstanceOf(expressionObject, expectedExpressionTypeObject)) {
            throwError(module, {
                code: 'E_CHECK_WHILE_TYPE_MISMATCH',
                message: `the type of the 'while' expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(expectedExpressionTypeObject) }`,
                location: expressionNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkReturnStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let functionObject = module.getActiveFunction();
        let functionTypeObject = module.getTypeById(functionObject.typeId);
        let functionToTypeObject = module.getTypeById(functionTypeObject.toId);

        if (!module.isExpressionInstanceOf(expressionObject, functionToTypeObject)) {
            throwError(module, {
                code: 'E_CHECK_RETURN_TYPE_MISMATCH',
                message: `the type of the returned expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(functionToTypeObject) }`,
                location: expressionNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkReference(module, node) {
    if (node.status === 'CREATED') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = module.getObjectByName(nameNode.value);
        let expressionObject = module.getNewExpression(node.id, false, [], -1);

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.idList[0]);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            module.setNodeObject(nameNode, 'variable', variableObject.id);
            module.setExpressionTypeId(expressionObject, variableTypeObject.id, 0);
            if (variableTypeObject.kind !== 'reference') {
                throwError(module, {
                    code: 'E_CHECK_REFERENCE_VARIABLE_IS_NOT_REFERENCE',
                    message: `value of the variable '${ nameNode.value }' is not a reference to a function`,
                    location: nameNode.location
                });
            }
        } else if (object.type === 'function') {
            for (let i = 0; i < object.idList.length; i++) {
                let functionObject = module.getFunctionById(object.idList[i]);
                let functionTypeObject = module.getTypeById(functionObject.typeId);

                module.setNodeObject(nameNode, 'function', functionObject.id);
                if (i === 0) {
                    module.setExpressionTypeId(expressionObject, functionTypeObject.id, i);
                } else {
                    module.setExpressionTypeId(expressionObject, functionTypeObject.id, -1);
                }
                if (functionObject.index === -1) {
                    /* This functions is not added to the table of functions */
                    /* Let's add it */
                    module.setFunctionIndex(functionObject);
                }
            }
        } else if (object.type === '') {
            throwError(module, {
                code: 'E_CHECK_REFERENCE_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            });
        }
        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkName(module, node) {
    if (node.status === 'CREATED') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = module.getObjectByName(nameNode.value);
        let expressionObject = module.getNewExpression(node.id, false, [], -1);

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.idList[0]);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            module.setNodeObject(nameNode, 'variable', variableObject.id);
            if (variableTypeObject.kind === 'reference') {
                module.setExpressionTypeId(expressionObject, variableTypeObject.toId, 0);
                if (variableTypeObject.fromIdList.length !== 0) {
                    throwError(module, {
                        code: 'E_CHECK_NAME_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                        message: `the value of variable '${ nameNode.value }' is a reference to a function defined with ${ variableTypeObject.fromIdList.length } parameter(s), but the given number of arguments is 0`,
                        location: nameNode.location
                    });
                }
            } else {
                module.setExpressionTypeId(expressionObject, variableTypeObject.id, 0);
            }
        } else if (object.type === 'function') {
            let i = 0;
            let isMatch = false;

            while ((i < object.idList.length) && !isMatch) {
                let functionObject = module.getFunctionById(object.idList[i]);
                let functionTypeObject = module.getTypeById(functionObject.typeId);

                module.setNodeObject(nameNode, 'function', functionObject.id);
                module.setExpressionTypeId(expressionObject, functionTypeObject.toId, i);
                if (functionTypeObject.fromIdList.length === 0) {
                    isMatch = true;
                }
                i++;
            }
            if (!isMatch) {
                throwError(module, {
                    code: 'E_CHECK_NAME_FUNCTION_NOT_FOUND',
                    message: `function '${ nameNode.value }' is defined with at least one parameter, but the given number of arguments is 0`,
                    location: nameNode.location
                });
            }
        } else if (object.type === '') {
            throwError(module, {
                code: 'E_CHECK_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            });
        }
        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkCallByName(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList([node.childIdList[1]]);
        node.status = '1';
    } else if (node.status === '1') {
        let nameNode = module.getNodeById(node.childIdList[0]);
        let object = module.getObjectByName(nameNode.value);
        let argumentNodeListNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getNewExpression(node.id, false, [], -1);

        /* Operator overloading */
        if (nameNode.name === 'operator') {
            let idList = [];

            if (nameNode.value === '-') {
                idList = module.getObjectByName('$sub').idList;
            } else if (nameNode.value === '+') {
                idList = module.getObjectByName('$add').idList;
            } else if (nameNode.value === '*') {
                idList = module.getObjectByName('$mul').idList;
            } else if (nameNode.value === '/') {
                idList = module.getObjectByName('$div').idList;
            } else if (nameNode.value === '%') {
                idList = module.getObjectByName('$rem').idList;
            } else if (nameNode.value === '==') {
                idList = module.getObjectByName('$eq').idList
            } else if (nameNode.value === '!=') {
                idList = module.getObjectByName('$ne').idList;
            } else if (nameNode.value === '<') {
                idList = module.getObjectByName('$lt').idList;
            } else if (nameNode.value === '>') {
                idList = module.getObjectByName('$gt').idList;
            } else if (nameNode.value === '<=') {
                idList = module.getObjectByName('$le').idList;
            } else if (nameNode.value === '>=') {
                idList = module.getObjectByName('$ge').idList;
            } else if (nameNode.value === 'not') {
                idList = module.getObjectByName('$not').idList;
            } else if (nameNode.value === 'and') {
                idList = module.getObjectByName('$and').idList;
            } else if (nameNode.value === 'or') {
                idList = module.getObjectByName('$or').idList;
            }
            object.type = 'function';
            object.idList = object.idList.concat(idList);
        }

        if (object.type === 'variable') {
            let variableObject = module.getVariableById(object.idList[0]);
            let variableTypeObject = module.getTypeById(variableObject.typeId);

            module.setNodeObject(nameNode, 'variable', variableObject.id);
            if (variableTypeObject.kind === 'reference') {
                module.setExpressionTypeId(expressionObject, variableTypeObject.toId, 0);
                if (variableTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                    for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                        let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[i]);
                        let argumentObject = module.getExpressionById(argumentNode.object.id);
                        let expectedArgumentTypeObject = module.getTypeById(variableTypeObject.fromIdList[i]);

                        if (!module.isExpressionInstanceOf(argumentObject, expectedArgumentTypeObject)) {
                            throwError(module, {
                                code: 'E_CHECK_CALL_BY_NAME_TYPE_MISMATCH',
                                message: `the type of the argument number ${ i + 1 } is ${ module.getExpressionTypeName(argumentObject) }; expected ${ module.getTypeName(expectedArgumentTypeObject) }`,
                                location: argumentNode.location
                            });
                        }
                    }
                } else {
                    throwError(module, {
                        code: 'E_CHECK_CALL_BY_NAME_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                        message: `value of the variable '${ nameNode.value  }' is a reference to a function defined with ${ variableTypeObject.fromIdList.length } parameter(s), but the given number of arguments is ${ argumentNodeListNode.childIdList.length }`,
                        location: nameNode.location
                    });
                }
            } else {
                throwError(module, {
                    code: 'E_CHECK_CALL_BY_NAME_VARIABLE_IS_NOT_REFERENCE',
                    message: `value of the variable '${ nameNode.value }' is not a reference to a function`,
                    location: nameNode.location
                });
            }
        } else if (object.type === 'function') {
            let i = 0;
            let isMatch = false;

            while ((i < object.idList.length) && !isMatch) {
                let functionObject = module.getFunctionById(object.idList[i]);
                let functionTypeObject = module.getTypeById(functionObject.typeId);

                module.setNodeObject(nameNode, 'function', functionObject.id);
                module.setExpressionTypeId(expressionObject, functionTypeObject.toId, i);
                if (functionTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                    let j = 0;

                    isMatch = true;
                    while ((j < argumentNodeListNode.childIdList.length) && isMatch) {
                        let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[j]);
                        let argumentObject = module.getExpressionById(argumentNode.object.id);
                        let expectedArgumentTypeObject = module.getTypeById(functionTypeObject.fromIdList[j]);

                        if (!module.isExpressionInstanceOf(argumentObject, expectedArgumentTypeObject)) {
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
                        let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[i]);
                        let argumentObject = module.getExpressionById(argumentNode.object.id);

                        if (i > 0) {
                            message += ', ';
                        }
                        message += module.getExpressionTypeName(argumentObject);
                    }
                }
                throwError(module, {
                    code: 'E_CHECK_CALL_BY_NAME_FUNCTION_NOT_FOUND',
                    message: message,
                    location: nameNode.location
                });
            }
        } else if (object.type === '') {
            throwError(module, {
                code: 'E_CHECK_CALL_BY_NAME_OBJECT_NOT_FOUND',
                message: `there is no object associated with the name '${ nameNode.value }'`,
                location: nameNode.location
            });
        }
        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkCallByExpression(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let $expressionNode = module.getNodeById(node.childIdList[0]);
        let $expressionObject = module.getExpressionById($expressionNode.object.id);
        let $expressionTypeObject = module.getExpressionType($expressionObject);
        let argumentNodeListNode = module.getNodeById(node.childIdList[1]);
        let expressionObject = module.getNewExpression(node.id, false, [], -1);

        if ($expressionTypeObject.kind === 'reference') {
            module.setExpressionTypeId(expressionObject, $expressionTypeObject.toId, 0);
            if ($expressionTypeObject.fromIdList.length === argumentNodeListNode.childIdList.length) {
                for (let i = 0; i < argumentNodeListNode.childIdList.length; i++) {
                    let argumentNode = module.getNodeById(argumentNodeListNode.childIdList[i]);
                    let argumentObject = module.getExpressionById(argumentNode.object.id);
                    let expectedArgumentTypeObject = module.getTypeById($expressionTypeObject.fromIdList[i]);

                    if (!module.isExpressionInstanceOf(argumentObject, expectedArgumentTypeObject)) {
                        throwError(module, {
                            code: 'E_CHECK_CALL_BY_EXPRESSION_TYPE_MISMATCH',
                            message: `the type of the argument number ${ i + 1 } is ${ module.getExpressionTypeName(argumentObject) }; expected ${ module.getTypeName(expectedArgumentTypeObject) }`,
                            location: argumentNode.location
                        });
                    }
                }
            } else {
                throwError(module, {
                    code: 'E_CHECK_CALL_BY_EXPRESSION_PARAMETER_ARGUMENT_NUMBER_MISMATCH',
                    message: `value of the expression is a reference to a function defined with ${ $expressionTypeObject.fromIdList.length } parameter(s), but the given number of arguments is ${ argumentNodeListNode.childIdList.length }`,
                    location: $expressionNode.location
                });
            }
        } else {
            throwError(module, {
                code: 'E_CHECK_CALL_BY_EXPRESSION_EXPRESSION_IS_NOT_REFERENCE',
                message: 'value of the expression is not a reference to a function',
                location: $expressionNode.location
            });
        }
        module.setNodeObject(node, 'expression', expressionObject.id);
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

function checkTargetStmt(module, node) {
    if (node.status === 'CREATED') {
        module.setActiveNodeList(node.childIdList);
        node.status = '1';
    } else if (node.status === '1') {
        let expressionNode = module.getNodeById(node.childIdList[0]);
        let expressionObject = module.getExpressionById(expressionNode.object.id);
        let expectedExpressionTypeObject = module.getTypeByName('$v');

        if (!module.isExpressionInstanceOf(expressionObject, expectedExpressionTypeObject)) {
            throwError(module, {
                code: 'E_CHECK_TARGET_TYPE_MISMATCH',
                message: `the type of the expression is ${ module.getExpressionTypeName(expressionObject) }; expected ${ module.getTypeName(expectedExpressionTypeObject) }`,
                location: expressionNode.location
            });
        }
        module.unsetActiveNode();
        node.status = 'CHECKED';
    }
}

export default check;
