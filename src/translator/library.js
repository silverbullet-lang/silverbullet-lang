function getBinaryenStringType(binaryen) {
    return binaryen._BinaryenTypeFromHeapType(binaryen._BinaryenHeapTypeExt());
}

function getBinaryenArrayType(binaryen, arrayElementType) {
    let arrayType;
    let typeBuilder = binaryen._TypeBuilderCreate(1);
    let isTypeBuiltAndDisposed = 0;
    let arrayHeapTypePointer = binaryen._malloc(4);
    let arrayHeapType;
    let errorIndexPointer = binaryen._malloc(4);
    let errorIndex;
    let errorReasonPointer = binaryen._malloc(4);
    let errorReason;

    binaryen._TypeBuilderSetArrayType(typeBuilder, 0, arrayElementType, binaryen._BinaryenPackedTypeNotPacked(), 1);
    isTypeBuiltAndDisposed = binaryen._TypeBuilderBuildAndDispose(typeBuilder, arrayHeapTypePointer, errorIndexPointer, errorReasonPointer);

    if (isTypeBuiltAndDisposed === 1) {
        arrayHeapType = binaryen.HEAP32[arrayHeapTypePointer / 4];
        arrayType = binaryen._BinaryenTypeFromHeapType(arrayHeapType);
    } else {
        errorIndex = binaryen.HEAP32[errorIndexPointer / 4];
        errorReason = binaryen.HEAP32[errorReasonPointer / 4];
    }

    binaryen._free(arrayHeapTypePointer);
    binaryen._free(errorIndexPointer);
    binaryen._free(errorReasonPointer);

    if (isTypeBuiltAndDisposed === 0) {
        throw {
            code: 'E_TRANSLATE_ARRAY_TYPE',
            message: `E_TRANSLATE_ARRAY_TYPE; index = ${ errorIndex }; reason = ${ errorReason }`
        };
    }
    return arrayType;
}

function getBinaryenArrayNewFixed(binaryen, module, arrayType, arrayElementList) {
    let arrayNewFixed;
    let arrayHeapType = binaryen._BinaryenTypeGetHeapType(arrayType);
    let arrayElementListPointer = binaryen._malloc(arrayElementList.length * 4);

    binaryen.HEAP32.set(arrayElementList, arrayElementListPointer / 4);
    arrayNewFixed = binaryen._BinaryenArrayNewFixed(module, arrayHeapType, arrayElementListPointer, arrayElementList.length);
    binaryen._free(arrayElementListPointer);
    return arrayNewFixed;
}

export { getBinaryenStringType, getBinaryenArrayType, getBinaryenArrayNewFixed };
