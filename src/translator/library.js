function getBinaryenStringType(binaryen) {
    return binaryen._BinaryenTypeFromHeapType(
        binaryen._BinaryenHeapTypeExt()
    );
}

export { getBinaryenStringType };
