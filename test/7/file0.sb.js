let globalObjects = {
    '$memory': new WebAssembly.Memory({
        initial: 1,
        maximum: 1
    }),
    '$table': new WebAssembly.Table({
        element: 'anyfunc',
        initial: 0
    })
};
let globalStrings = {
    '$string_empty': ""
};
let globalFunctions = {
    '$getString_[$i]->[$s]': function(value) {
        return (new Int32Array([value])[0]).toString();
    },
    '$getString_[$iu]->[$s]': function(value) {
        return ((new Uint32Array([value]))[0]).toString();
    },
    '$getString_[$id]->[$s]': function(value) {
        return ((new BigInt64Array([value]))[0]).toString();
    },
    '$getString_[$f]->[$s]': function(value) {
        return ((new Float32Array([value]))[0]).toString();
    },
    '$getString_[$fd]->[$s]': function(value) {
        return ((new Float64Array([value]))[0]).toString();
    },
    '$getString_[$b]->[$s]': function(value) {
        if (value === 0) {
            return 'false';
        } else {
            return 'true';
        }
    },
    '$getString_[$s]->[$s]': function(value) {
        return value;
    },
    '$show': function(value) {
        console.log(value);
    }
};

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/7/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func))
 (type $2 (func (param i64) (result (ref extern))))
 (type $3 (func (param f32) (result (ref extern))))
 (type $4 (func (param f64) (result (ref extern))))
 (type $5 (func (param (ref extern)) (result (ref extern))))
 (type $6 (func (param (ref extern))))
 (type $7 (func (param externref) (result i32)))
 (type $8 (func (param externref externref) (result (ref extern))))
 (type $9 (func (param externref i32 i32) (result (ref extern))))
 (type $10 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localStrings" "$string_8" (global $$string_8 (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $2) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $3) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $4) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $5) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $6) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $7) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $8) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $9) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $10) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start (type $1)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_8)
   )
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,66,11,96,1,127,1,100,111,96,0,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,174,4,17,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,2,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,4,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,6,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,10,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,9,36,115,116,114,105,110,103,95,56,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,7,9,1,5,115,116,97,114,116,0,12,9,6,1,0,35,2,11,0,10,10,1,8,0,35,1,16,6,16,7,11])).buffer;
let module_0 = new WebAssembly.Module(buffer_0, {
    builtins: ['js-string']
});
let imports_0 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
        '$string_8': "Hello, World!"
    },
    '$globalFunctions': globalFunctions
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };