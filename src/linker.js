function link(module) {
    module.executable = `let wasm = new Uint8Array([${ module.ir.emitBinary() }]);
let wat = \`${ module.ir.emitText().trim() }\`;
let getExports = function(imports) {
    let module = new WebAssembly.Module(wasm);
    let instance = new WebAssembly.Instance(module, imports);

    return instance.exports;
};

export { wasm, wat, getExports };
`;
}

export default link;
