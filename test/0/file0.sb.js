let globalObjects = {
    '$memory': new WebAssembly.Memory({
        initial: 0,
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder1/folder0/file1.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param i32)))
 (type $2 (func (result f32)))
 (type $3 (func (result i32)))
 (type $4 (func (result f64)))
 (type $5 (func (param i32 i32) (result i32)))
 (type $6 (func (param i64) (result (ref extern))))
 (type $7 (func (param f32) (result (ref extern))))
 (type $8 (func (param f64) (result (ref extern))))
 (type $9 (func (param (ref extern)) (result (ref extern))))
 (type $10 (func (param (ref extern))))
 (type $11 (func (param externref) (result i32)))
 (type $12 (func (param externref externref) (result (ref extern))))
 (type $13 (func (param externref i32 i32) (result (ref extern))))
 (type $14 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $6) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $7) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $8) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $9) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $10) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $11) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $12) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $13) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $14) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 365))
 (global $variable1 (mut i32) (i32.const 74))
 (global $variable2 (mut f64) (f64.const 123.4))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function2_[]->[$fd]" (func $"function2_[]->[$fd]"))
 (func $function0 (type $2) (result f32)
  (return
   (f32.const 159.35699462890625)
  )
 )
 (func $"function1_[]->[$i]" (type $3) (result i32)
  (return
   (i32.const 10)
  )
 )
 (func $"function1_[$b]->[]" (type $1) (param $0 i32)
  (nop)
 )
 (func $"function2_[]->[$fd]" (type $4) (result f64)
  (return
   (f64.sub
    (global.get $variable2)
    (f64.const 12.5)
   )
  )
 )
 (func $"function2_[$b]->[]" (type $1) (param $0 i32)
  (nop)
 )
 (func $"function2_[$iu,$iu]->[$iu]" (type $5) (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.div_u
    (i32.add
     (local.get $0)
     (local.get $1)
    )
    (i32.const 2)
   )
  )
 )
)
*/

let buffer_3 = (new Uint8Array([0,97,115,109,1,0,0,0,1,85,15,96,1,127,1,100,111,96,1,127,0,96,0,1,125,96,0,1,127,96,0,1,124,96,2,127,127,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,146,4,16,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,7,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,14,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,2,3,1,4,1,5,6,25,3,127,1,65,237,2,11,127,1,65,202,0,11,124,1,68,154,153,153,153,153,217,94,64,11,7,71,5,9,118,97,114,105,97,98,108,101,48,3,2,9,118,97,114,105,97,98,108,101,49,3,3,9,118,97,114,105,97,98,108,101,50,3,4,9,102,117,110,99,116,105,111,110,48,0,12,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,15,9,6,1,0,35,1,11,0,10,52,6,8,0,67,100,91,31,67,15,11,5,0,65,10,15,11,3,0,1,11,15,0,35,4,68,0,0,0,0,0,0,41,64,161,15,11,3,0,1,11,11,0,32,0,32,1,106,65,2,110,15,11])).buffer;
let module_3 = new WebAssembly.Module(buffer_3, {
    builtins: ['js-string']
});
let imports_3 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions
};
let instance_3 = new WebAssembly.Instance(module_3, imports_3);
let exports_3 = instance_3.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder1/folder0/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (result i32)))
 (type $2 (func (result f32)))
 (type $3 (func))
 (type $4 (func (param f64) (result f64)))
 (type $5 (func (param i32)))
 (type $6 (func (param i64) (result i32)))
 (type $7 (func (param i64) (result (ref extern))))
 (type $8 (func (param f32) (result (ref extern))))
 (type $9 (func (param f64) (result (ref extern))))
 (type $10 (func (param (ref extern)) (result (ref extern))))
 (type $11 (func (param (ref extern))))
 (type $12 (func (param externref) (result i32)))
 (type $13 (func (param externref externref) (result (ref extern))))
 (type $14 (func (param externref i32 i32) (result (ref extern))))
 (type $15 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "function0" (func $external-function0 (type $2) (result f32)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $7) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $8) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $9) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $10) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $11) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $12) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $13) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $14) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $15) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 45))
 (global $variable1 (mut i32) (i32.const 0))
 (global $variable2 (mut i32) (i32.const 85))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[$iu]" (func $"function1_[]->[$iu]"))
 (export "function1_[$fd]->[$fd]" (func $"function1_[$fd]->[$fd]"))
 (export "function2_[$id]->[$b]" (func $"function2_[$id]->[$b]"))
 (export "function2_[]->[$b]" (func $"function2_[]->[$b]"))
 (func $function0 (type $3)
  (nop)
 )
 (func $"function1_[]->[$iu]" (type $1) (result i32)
  (return
   (i32.sub
    (global.get $variable0)
    (i32.const 1)
   )
  )
 )
 (func $"function1_[$fd]->[$fd]" (type $4) (param $0 f64) (result f64)
  (return
   (f64.mul
    (local.get $0)
    (f64.const 2)
   )
  )
 )
 (func $"function2_[$i]->[]" (type $5) (param $0 i32)
  (nop)
 )
 (func $"function2_[$id]->[$b]" (type $6) (param $0 i64) (result i32)
  (return
   (i64.eq
    (local.get $0)
    (i64.const 7)
   )
  )
 )
 (func $"function2_[]->[$b]" (type $1) (result i32)
  (return
   (call $"function2_[$id]->[$b]"
    (i64.const 7)
   )
  )
 )
)
*/

let buffer_5 = (new Uint8Array([0,97,115,109,1,0,0,0,1,88,16,96,1,127,1,100,111,96,0,1,127,96,0,1,125,96,0,0,96,1,124,1,124,96,1,127,0,96,1,126,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,164,4,17,5,102,105,108,101,49,9,102,117,110,99,116,105,111,110,48,0,2,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,7,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,15,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,1,4,5,6,1,6,17,3,127,1,65,45,11,127,1,65,0,11,127,1,65,213,0,11,7,141,1,8,9,118,97,114,105,97,98,108,101,48,3,2,9,118,97,114,105,97,98,108,101,49,3,3,9,118,97,114,105,97,98,108,101,50,3,4,9,102,117,110,99,116,105,111,110,48,0,13,19,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,105,117,93,0,14,22,102,117,110,99,116,105,111,110,49,95,91,36,102,100,93,45,62,91,36,102,100,93,0,15,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,17,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,18,9,6,1,0,35,1,11,0,10,51,6,3,0,1,11,8,0,35,2,65,1,107,15,11,15,0,32,0,68,0,0,0,0,0,0,0,64,162,15,11,3,0,1,11,8,0,32,0,66,7,81,15,11,7,0,66,7,16,17,15,11])).buffer;
let module_5 = new WebAssembly.Module(buffer_5, {
    builtins: ['js-string']
});
let imports_5 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'file1': {
        'function0': exports_3['function0']
    }
};
let instance_5 = new WebAssembly.Instance(module_5, imports_5);
let exports_5 = instance_5.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder2/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (result f64)))
 (type $2 (func (param i64) (result i32)))
 (type $3 (func (result i32)))
 (type $4 (func (param i64) (result i64)))
 (type $5 (func (result i64)))
 (type $6 (func (param i32 i32)))
 (type $7 (func (param f64) (result f64)))
 (type $8 (func (param i64) (result (ref extern))))
 (type $9 (func (param f32) (result (ref extern))))
 (type $10 (func (param f64) (result (ref extern))))
 (type $11 (func (param (ref extern)) (result (ref extern))))
 (type $12 (func (param (ref extern))))
 (type $13 (func (param externref) (result i32)))
 (type $14 (func (param externref externref) (result (ref extern))))
 (type $15 (func (param externref i32 i32) (result (ref extern))))
 (type $16 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "folderUp-folder1-folder0-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "folderUp-folder1-folder0-file1" "function2_[]->[$fd]" (func $"external-function2_[]->[$fd]" (type $1) (result f64)))
 (import "folderUp-folder1-folder0-file0" "function2_[$id]->[$b]" (func $"external-function2_[$id]->[$b]" (type $2) (param i64) (result i32)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $8) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $9) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $10) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $11) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $12) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $13) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $14) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $15) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $16) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 65))
 (global $variable1 (mut i32) (i32.const 123))
 (global $variable2 (mut i32) (i32.const 0))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function1_[$id]->[$id]" (func $"function1_[$id]->[$id]"))
 (func $function0 (type $3) (result i32)
  (return
   (global.get $variable2)
  )
 )
 (func $"function1_[$id]->[$id]" (type $4) (param $0 i64) (result i64)
  (return
   (i64.sub
    (i64.const 35741)
    (i64.const 258)
   )
  )
 )
 (func $"function1_[]->[$id]" (type $5) (result i64)
  (return
   (call $"function1_[$id]->[$id]"
    (i64.const 123)
   )
  )
 )
 (func $"function2_[$i,$i]->[]" (type $6) (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $"function2_[$fd]->[$fd]" (type $7) (param $0 f64) (result f64)
  (return
   (f64.sub
    (f64.mul
     (local.get $0)
     (f64.const 3)
    )
    (f64.const 0.8)
   )
  )
 )
 (func $"function2_[]->[$fd]" (type $1) (result f64)
  (return
   (call $"function2_[$fd]->[$fd]"
    (f64.const 123456)
   )
  )
 )
)
*/

let buffer_4 = (new Uint8Array([0,97,115,109,1,0,0,0,1,95,17,96,1,127,1,100,111,96,0,1,124,96,1,126,1,127,96,0,1,127,96,1,126,1,126,96,0,1,126,96,2,127,127,0,96,1,124,1,124,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,170,5,19,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,1,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,2,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,11,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,16,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,4,5,6,7,1,6,18,3,127,1,65,193,0,11,127,1,65,251,0,11,127,1,65,0,11,7,50,3,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,50,3,5,22,102,117,110,99,116,105,111,110,49,95,91,36,105,100,93,45,62,91,36,105,100,93,0,15,9,6,1,0,35,2,11,0,10,73,6,5,0,35,5,15,11,11,0,66,157,151,2,66,130,2,125,15,11,8,0,66,251,0,16,15,15,11,3,0,1,11,25,0,32,0,68,0,0,0,0,0,0,8,64,162,68,154,153,153,153,153,153,233,63,161,15,11,14,0,68,0,0,0,0,0,36,254,64,16,18,15,11])).buffer;
let module_4 = new WebAssembly.Module(buffer_4, {
    builtins: ['js-string']
});
let imports_4 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'folderUp-folder1-folder0-file1': {
        'function2_[]->[$fd]': exports_3['function2_[]->[$fd]']
    },
    'folderUp-folder1-folder0-file0': {
        'variable2': exports_5['variable2'],
        'function2_[$id]->[$b]': exports_5['function2_[$id]->[$b]']
    }
};
let instance_4 = new WebAssembly.Instance(module_4, imports_4);
let exports_4 = instance_4.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/file2.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (result f64)))
 (type $2 (func (param i64) (result i64)))
 (type $3 (func (result i32)))
 (type $4 (func))
 (type $5 (func (param i32 i32) (result i32)))
 (type $6 (func (param i32)))
 (type $7 (func (param f64) (result i32)))
 (type $8 (func (param i64) (result (ref extern))))
 (type $9 (func (param f32) (result (ref extern))))
 (type $10 (func (param f64) (result (ref extern))))
 (type $11 (func (param (ref extern)) (result (ref extern))))
 (type $12 (func (param (ref extern))))
 (type $13 (func (param externref) (result i32)))
 (type $14 (func (param externref externref) (result (ref extern))))
 (type $15 (func (param externref i32 i32) (result (ref extern))))
 (type $16 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "folder1-folder0-file1" "variable2" (global $external-variable2 (mut f64)))
 (import "folder2-file0" "variable0" (global $external-variable0 (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "folder1-folder0-file1" "function2_[]->[$fd]" (func $external-function2 (type $1) (result f64)))
 (import "folder2-file0" "function1_[$id]->[$id]" (func $external-function1 (type $2) (param i64) (result i64)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $8) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $9) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $10) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $11) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $12) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $13) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $14) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $15) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $16) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 1))
 (global $variable1 (mut f64) (f64.const 45))
 (global $variable2 i32 (i32.const 456))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[]" (func $"function1_[]->[]"))
 (export "function1_[$i,$i]->[$b]" (func $"function1_[$i,$i]->[$b]"))
 (export "function2_[]->[$fd]" (func $"function2_[]->[$fd]"))
 (export "function2_[$b]->[]" (func $"function2_[$b]->[]"))
 (export "function2_[$fd]->[$iu]" (func $"function2_[$fd]->[$iu]"))
 (func $function0 (type $3) (result i32)
  (return
   (i32.mul
    (i32.const 2)
    (global.get $variable2)
   )
  )
 )
 (func $"function1_[]->[]" (type $4)
  (nop)
 )
 (func $"function1_[$i,$i]->[$b]" (type $5) (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.gt_s
    (local.get $0)
    (local.get $1)
   )
  )
 )
 (func $"function2_[]->[$fd]" (type $1) (result f64)
  (return
   (f64.mul
    (global.get $variable1)
    (f64.const 3)
   )
  )
 )
 (func $"function2_[$b]->[]" (type $6) (param $0 i32)
  (nop)
 )
 (func $"function2_[$fd]->[$iu]" (type $7) (param $0 f64) (result i32)
  (return
   (i32.const 7)
  )
 )
)
*/

let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,94,17,96,1,127,1,100,111,96,0,1,124,96,1,126,1,126,96,0,1,127,96,0,0,96,2,127,127,1,127,96,1,127,0,96,1,124,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,163,5,20,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,1,13,102,111,108,100,101,114,50,45,102,105,108,101,48,22,102,117,110,99,116,105,111,110,49,95,91,36,105,100,93,45,62,91,36,105,100,93,0,2,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,11,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,16,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,9,118,97,114,105,97,98,108,101,50,3,124,1,13,102,111,108,100,101,114,50,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,48,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,4,5,1,6,7,6,24,3,127,1,65,1,11,124,1,68,0,0,0,0,0,128,70,64,11,127,0,65,200,3,11,7,150,1,8,9,118,97,114,105,97,98,108,101,48,3,4,9,118,97,114,105,97,98,108,101,50,3,6,9,102,117,110,99,116,105,111,110,48,0,14,16,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,93,0,15,23,102,117,110,99,116,105,111,110,49,95,91,36,105,44,36,105,93,45,62,91,36,98,93,0,16,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,17,18,102,117,110,99,116,105,111,110,50,95,91,36,98,93,45,62,91,93,0,18,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,105,117,93,0,19,9,6,1,0,35,3,11,0,10,49,6,8,0,65,2,35,6,108,15,11,3,0,1,11,8,0,32,0,32,1,74,15,11,15,0,35,5,68,0,0,0,0,0,0,8,64,162,15,11,3,0,1,11,5,0,65,7,15,11])).buffer;
let module_2 = new WebAssembly.Module(buffer_2, {
    builtins: ['js-string']
});
let imports_2 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'folder1-folder0-file1': {
        'variable2': exports_3['variable2'],
        'function2_[]->[$fd]': exports_3['function2_[]->[$fd]']
    },
    'folder2-file0': {
        'variable0': exports_4['variable0'],
        'function1_[$id]->[$id]': exports_4['function1_[$id]->[$id]']
    }
};
let instance_2 = new WebAssembly.Instance(module_2, imports_2);
let exports_2 = instance_2.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder1/file0.sb */
/*
(module
 (type $0 (func (result i32)))
 (type $1 (func (param i32) (result (ref extern))))
 (type $2 (func (result f64)))
 (type $3 (func (param i64) (result i32)))
 (type $4 (func (param i32) (result i32)))
 (type $5 (func (param f64) (result f64)))
 (type $6 (func (param i64 i64) (result i64)))
 (type $7 (func (param i64) (result (ref extern))))
 (type $8 (func (param f32) (result (ref extern))))
 (type $9 (func (param f64) (result (ref extern))))
 (type $10 (func (param (ref extern)) (result (ref extern))))
 (type $11 (func (param (ref extern))))
 (type $12 (func (param externref) (result i32)))
 (type $13 (func (param externref externref) (result (ref extern))))
 (type $14 (func (param externref i32 i32) (result (ref extern))))
 (type $15 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "folder0-file0" "variable1" (global $external-variable1 (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "folder0-file1" "function2_[]->[$fd]" (func $"external-function2_[]->[$fd]" (type $2) (result f64)))
 (import "folder0-file0" "function2_[$id]->[$b]" (func $"external-function2_[$id]->[$b]" (type $3) (param i64) (result i32)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $7) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $8) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $9) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $10) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $11) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $12) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $13) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $14) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $15) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 0))
 (global $variable1 f32 (f32.const 147.36900329589844))
 (global $variable2 (mut i32) (i32.const 357951))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function2_[$fd]->[$fd]" (func $"function2_[$fd]->[$fd]"))
 (export "function2_[$id,$id]->[$id]" (func $"function2_[$id,$id]->[$id]"))
 (func $function0 (type $0) (result i32)
  (return
   (i32.gt_u
    (global.get $variable2)
    (i32.const 159753)
   )
  )
 )
 (func $"function1_[$iu]->[$iu]" (type $4) (param $0 i32) (result i32)
  (return
   (i32.sub
    (global.get $variable2)
    (local.get $0)
   )
  )
 )
 (func $"function1_[]->[$b]" (type $0) (result i32)
  (return
   (i32.xor
    (global.get $variable0)
    (i32.const 1)
   )
  )
 )
 (func $"function2_[$fd]->[$fd]" (type $5) (param $0 f64) (result f64)
  (return
   (f64.mul
    (local.get $0)
    (f64.const 2)
   )
  )
 )
 (func $"function2_[]->[$i]" (type $0) (result i32)
  (return
   (i32.sub
    (i32.const 0)
    (i32.const 15)
   )
  )
 )
 (func $"function2_[$id,$id]->[$id]" (type $6) (param $0 i64) (param $1 i64) (result i64)
  (return
   (i64.div_s
    (i64.add
     (local.get $0)
     (local.get $1)
    )
    (i64.const 3)
   )
  )
 )
)
*/

let buffer_6 = (new Uint8Array([0,97,115,109,1,0,0,0,1,92,16,96,0,1,127,96,1,127,1,100,111,96,0,1,124,96,1,126,1,127,96,1,127,1,127,96,1,124,1,124,96,2,126,126,1,126,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,247,4,19,13,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,2,13,102,111,108,100,101,114,48,45,102,105,108,101,48,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,7,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,15,13,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,49,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,0,4,0,5,0,6,6,21,3,127,1,65,0,11,125,0,67,119,94,19,67,11,127,1,65,191,236,21,11,7,91,5,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,50,3,5,9,102,117,110,99,116,105,111,110,48,0,14,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,102,100,93,0,17,26,102,117,110,99,116,105,111,110,50,95,91,36,105,100,44,36,105,100,93,45,62,91,36,105,100,93,0,19,9,6,1,0,35,2,11,0,10,67,6,10,0,35,5,65,137,224,9,75,15,11,8,0,35,5,32,0,107,15,11,8,0,35,3,65,1,115,15,11,15,0,32,0,68,0,0,0,0,0,0,0,64,162,15,11,8,0,65,0,65,15,107,15,11,11,0,32,0,32,1,124,66,3,127,15,11])).buffer;
let module_6 = new WebAssembly.Module(buffer_6, {
    builtins: ['js-string']
});
let imports_6 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'folder0-file1': {
        'function2_[]->[$fd]': exports_3['function2_[]->[$fd]']
    },
    'folder0-file0': {
        'variable1': exports_5['variable1'],
        'function2_[$id]->[$b]': exports_5['function2_[$id]->[$b]']
    }
};
let instance_6 = new WebAssembly.Instance(module_6, imports_6);
let exports_6 = instance_6.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/file1.sb */
/*
(module
 (type $0 (func (result i32)))
 (type $1 (func (param i32) (result (ref extern))))
 (type $2 (func (param i32 f64) (result i64)))
 (type $3 (func (param f32)))
 (type $4 (func (param i32 f64 i32)))
 (type $5 (func (param f32) (result f32)))
 (type $6 (func (param i64) (result (ref extern))))
 (type $7 (func (param f32) (result (ref extern))))
 (type $8 (func (param f64) (result (ref extern))))
 (type $9 (func (param (ref extern)) (result (ref extern))))
 (type $10 (func (param (ref extern))))
 (type $11 (func (param externref) (result i32)))
 (type $12 (func (param externref externref) (result (ref extern))))
 (type $13 (func (param externref i32 i32) (result (ref extern))))
 (type $14 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "file2" "variable2" (global $external-variable2 i32))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "folder1-file0" "function0" (func $external-function0 (type $0) (result i32)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $6) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $7) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $8) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $9) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $10) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $11) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $12) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $13) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $14) (param externref externref) (result i32)))
 (global $variable0 (mut f32) (f32.const 18.5))
 (global $variable1 (mut i32) (i32.const 1))
 (global $variable2 (mut i32) (i32.const 95))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[$i]" (func $"function1_[]->[$i]"))
 (export "function1_[$f]->[]" (func $"function1_[$f]->[]"))
 (export "function2_[$iu,$fd,$b]->[]" (func $"function2_[$iu,$fd,$b]->[]"))
 (export "function2_[]->[$b]" (func $"function2_[]->[$b]"))
 (export "function2_[$f]->[$f]" (func $"function2_[$f]->[$f]"))
 (func $function0 (type $2) (param $0 i32) (param $1 f64) (result i64)
  (return
   (i64.const 17)
  )
 )
 (func $"function1_[]->[$i]" (type $0) (result i32)
  (return
   (i32.const 19)
  )
 )
 (func $"function1_[$f]->[]" (type $3) (param $0 f32)
  (nop)
 )
 (func $"function2_[$iu,$fd,$b]->[]" (type $4) (param $0 i32) (param $1 f64) (param $2 i32)
  (nop)
 )
 (func $"function2_[]->[$b]" (type $0) (result i32)
  (return
   (i32.or
    (i32.const 1)
    (i32.const 0)
   )
  )
 )
 (func $"function2_[$f]->[$f]" (type $5) (param $0 f32) (result f32)
  (return
   (f32.add
    (local.get $0)
    (global.get $variable0)
   )
  )
 )
)
*/

let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,88,15,96,0,1,127,96,1,127,1,100,111,96,2,127,124,1,126,96,1,125,0,96,3,127,124,127,0,96,1,125,1,125,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,191,4,18,13,102,111,108,100,101,114,49,45,102,105,108,101,48,9,102,117,110,99,116,105,111,110,48,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,7,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,14,5,102,105,108,101,50,9,118,97,114,105,97,98,108,101,50,3,127,0,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,2,0,3,4,0,5,6,20,3,125,1,67,0,0,148,65,11,127,1,65,1,11,127,1,65,223,0,11,7,164,1,9,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,49,3,4,9,118,97,114,105,97,98,108,101,50,3,5,9,102,117,110,99,116,105,111,110,48,0,13,18,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,105,93,0,14,18,102,117,110,99,116,105,111,110,49,95,91,36,102,93,45,62,91,93,0,15,26,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,44,36,98,93,45,62,91,93,0,16,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,17,20,102,117,110,99,116,105,111,110,50,95,91,36,102,93,45,62,91,36,102,93,0,18,9,6,1,0,35,2,11,0,10,39,6,5,0,66,17,15,11,5,0,65,19,15,11,3,0,1,11,3,0,1,11,8,0,65,1,65,0,114,15,11,8,0,32,0,35,3,146,15,11])).buffer;
let module_1 = new WebAssembly.Module(buffer_1, {
    builtins: ['js-string']
});
let imports_1 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'file2': {
        'variable2': exports_2['variable2']
    },
    'folder1-file0': {
        'function0': exports_6['function0']
    }
};
let instance_1 = new WebAssembly.Instance(module_1, imports_1);
let exports_1 = instance_1.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder0/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func))
 (type $2 (func (param f64) (result f64)))
 (type $3 (func (param i64 i64) (result i64)))
 (type $4 (func (result f64)))
 (type $5 (func (param i32)))
 (type $6 (func (param i32) (result i32)))
 (type $7 (func (param i64) (result f32)))
 (type $8 (func (param i64) (result (ref extern))))
 (type $9 (func (param f32) (result (ref extern))))
 (type $10 (func (param f64) (result (ref extern))))
 (type $11 (func (param (ref extern)) (result (ref extern))))
 (type $12 (func (param (ref extern))))
 (type $13 (func (param externref) (result i32)))
 (type $14 (func (param externref externref) (result (ref extern))))
 (type $15 (func (param externref i32 i32) (result (ref extern))))
 (type $16 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "folderUp-folder2-file0" "variable0" (global $external-variable0 (mut i32)))
 (import "folderUp-folder1-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "folderUp-folder1-file0" "function2_[$fd]->[$fd]" (func $"external-function2_[$fd]->[$fd]" (type $2) (param f64) (result f64)))
 (import "folderUp-folder1-file0" "function2_[$id,$id]->[$id]" (func $"external-function2_[$id,$id]->[$id]" (type $3) (param i64 i64) (result i64)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $8) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $9) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $10) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $11) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $12) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $13) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $14) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $15) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $16) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 0))
 (global $variable1 (mut i32) (i32.const 64))
 (global $variable3 (mut f64) (f64.const 158.36))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable3" (global $variable3))
 (export "function1_[]->[$fd]" (func $"function1_[]->[$fd]"))
 (export "function1_[$iu]->[]" (func $"function1_[$iu]->[]"))
 (export "function2_[$b]->[$b]" (func $"function2_[$b]->[$b]"))
 (export "function2_[]->[]" (func $"function2_[]->[]"))
 (func $function0 (type $1)
  (nop)
 )
 (func $"function1_[]->[$fd]" (type $4) (result f64)
  (return
   (f64.sub
    (global.get $variable3)
    (f64.const 1)
   )
  )
 )
 (func $"function1_[$iu]->[]" (type $5) (param $0 i32)
  (nop)
 )
 (func $"function2_[$b]->[$b]" (type $6) (param $0 i32) (result i32)
  (return
   (i32.xor
    (local.get $0)
    (i32.const 1)
   )
  )
 )
 (func $"function2_[]->[]" (type $1)
  (nop)
 )
 (func $"function2_[$id]->[$f]" (type $7) (param $0 i64) (result f32)
  (return
   (f32.add
    (f32.const 2.799999952316284)
    (f32.const 6.199999809265137)
   )
  )
 )
)
*/

let buffer_7 = (new Uint8Array([0,97,115,109,1,0,0,0,1,95,17,96,1,127,1,100,111,96,0,0,96,1,124,1,124,96,2,126,126,1,126,96,0,1,124,96,1,127,0,96,1,127,1,127,96,1,126,1,125,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,190,5,20,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,102,100,93,0,2,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,26,102,117,110,99,116,105,111,110,50,95,91,36,105,100,44,36,105,100,93,45,62,91,36,105,100,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,8,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,9,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,11,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,16,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,50,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,48,3,127,1,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,1,4,5,6,1,7,6,24,3,127,1,65,0,11,127,1,65,192,0,11,124,1,68,236,81,184,30,133,203,99,64,11,7,123,7,9,118,97,114,105,97,98,108,101,48,3,4,9,118,97,114,105,97,98,108,101,49,3,5,9,118,97,114,105,97,98,108,101,51,3,6,19,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,102,100,93,0,15,19,102,117,110,99,116,105,111,110,49,95,91,36,105,117,93,45,62,91,93,0,16,20,102,117,110,99,116,105,111,110,50,95,91,36,98,93,45,62,91,36,98,93,0,17,16,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,93,0,18,9,6,1,0,35,3,11,0,10,53,6,3,0,1,11,15,0,35,6,68,0,0,0,0,0,0,240,63,161,15,11,3,0,1,11,8,0,32,0,65,1,115,15,11,3,0,1,11,14,0,67,51,51,51,64,67,102,102,198,64,146,15,11])).buffer;
let module_7 = new WebAssembly.Module(buffer_7, {
    builtins: ['js-string']
});
let imports_7 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'folderUp-folder2-file0': {
        'variable0': exports_4['variable0']
    },
    'folderUp-folder1-file0': {
        'function2_[$fd]->[$fd]': exports_6['function2_[$fd]->[$fd]'],
        'function2_[$id,$id]->[$id]': exports_6['function2_[$id,$id]->[$id]'],
        'variable2': exports_6['variable2']
    }
};
let instance_7 = new WebAssembly.Instance(module_7, imports_7);
let exports_7 = instance_7.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/file0.sb */
/*
(module
 (type $0 (func))
 (type $1 (func (param i32) (result (ref extern))))
 (type $2 (func (param i32 f64 i32)))
 (type $3 (func (result i32)))
 (type $4 (func (param f32) (result f32)))
 (type $5 (func (param i32)))
 (type $6 (func (param f32)))
 (type $7 (func (result i64)))
 (type $8 (func (param f64)))
 (type $9 (func (param i32 f64)))
 (type $10 (func (param i64) (result (ref extern))))
 (type $11 (func (param f32) (result (ref extern))))
 (type $12 (func (param f64) (result (ref extern))))
 (type $13 (func (param (ref extern)) (result (ref extern))))
 (type $14 (func (param (ref extern))))
 (type $15 (func (param externref) (result i32)))
 (type $16 (func (param externref externref) (result (ref extern))))
 (type $17 (func (param externref i32 i32) (result (ref extern))))
 (type $18 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "file1" "variable0" (global $external-variable0 (mut f32)))
 (import "folder1-folder0-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "function2_[$iu,$fd,$b]->[]" (func $"external-function2_[$iu,$fd,$b]->[]" (type $2) (param i32 f64 i32)))
 (import "file1" "function2_[]->[$b]" (func $"external-function2_[]->[$b]" (type $3) (result i32)))
 (import "file1" "function2_[$f]->[$f]" (func $"external-function2_[$f]->[$f]" (type $4) (param f32) (result f32)))
 (import "folder0-file0" "function1_[$iu]->[]" (func $external-function1 (type $5) (param i32)))
 (import "folder1-folder0-file0" "function0" (func $external-function0 (type $0)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $10) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $11) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $12) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $13) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $14) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $15) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $16) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $17) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $18) (param externref externref) (result i32)))
 (global $variable0 (mut i32) (i32.const 763))
 (global $variable1 (mut i32) (i32.const 0))
 (global $variable2 (mut f32) (f32.const 4956.7001953125))
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[$f]->[]" (func $"function1_[$f]->[]"))
 (export "function1_[]->[]" (func $"function1_[]->[]"))
 (export "function2_[]->[$id]" (func $"function2_[]->[$id]"))
 (export "function2_[$fd]->[]" (func $"function2_[$fd]->[]"))
 (export "function2_[$iu,$fd]->[]" (func $"function2_[$iu,$fd]->[]"))
 (func $function0 (type $0)
  (nop)
 )
 (func $"function1_[$f]->[]" (type $6) (param $0 f32)
  (nop)
 )
 (func $"function1_[]->[]" (type $0)
  (nop)
 )
 (func $"function2_[]->[$id]" (type $7) (result i64)
  (return
   (i64.const 14)
  )
 )
 (func $"function2_[$fd]->[]" (type $8) (param $0 f64)
  (nop)
 )
 (func $"function2_[$iu,$fd]->[]" (type $9) (param $0 i32) (param $1 f64)
  (nop)
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,102,19,96,0,0,96,1,127,1,100,111,96,3,127,124,127,0,96,0,1,127,96,1,125,1,125,96,1,127,0,96,1,125,0,96,0,1,126,96,1,124,0,96,2,127,124,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,233,5,23,5,102,105,108,101,49,26,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,44,36,98,93,45,62,91,93,0,2,5,102,105,108,101,49,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,3,5,102,105,108,101,49,20,102,117,110,99,116,105,111,110,50,95,91,36,102,93,45,62,91,36,102,93,0,4,13,102,111,108,100,101,114,48,45,102,105,108,101,48,19,102,117,110,99,116,105,111,110,49,95,91,36,105,117,93,45,62,91,93,0,5,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,102,117,110,99,116,105,111,110,48,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,10,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,11,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,12,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,13,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,16,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,17,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,18,5,102,105,108,101,49,9,118,97,114,105,97,98,108,101,48,3,125,1,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,7,6,0,6,0,7,8,9,6,20,3,127,1,65,251,5,11,127,1,65,0,11,125,1,67,154,229,154,69,11,7,159,1,9,9,118,97,114,105,97,98,108,101,48,3,4,9,118,97,114,105,97,98,108,101,49,3,5,9,118,97,114,105,97,98,108,101,50,3,6,9,102,117,110,99,116,105,111,110,48,0,17,18,102,117,110,99,116,105,111,110,49,95,91,36,102,93,45,62,91,93,0,18,16,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,93,0,19,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,105,100,93,0,20,19,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,93,0,21,23,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,93,45,62,91,93,0,22,9,6,1,0,35,3,11,0,10,27,6,3,0,1,11,3,0,1,11,3,0,1,11,5,0,66,14,15,11,3,0,1,11,3,0,1,11])).buffer;
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
    },
    '$globalFunctions': globalFunctions,
    'file1': {
        'variable0': exports_1['variable0'],
        'function2_[$iu,$fd,$b]->[]': exports_1['function2_[$iu,$fd,$b]->[]'],
        'function2_[]->[$b]': exports_1['function2_[]->[$b]'],
        'function2_[$f]->[$f]': exports_1['function2_[$f]->[$f]']
    },
    'folder0-file0': {
        'function1_[$iu]->[]': exports_7['function1_[$iu]->[]']
    },
    'folder1-folder0-file0': {
        'variable2': exports_5['variable2'],
        'function0': exports_5['function0']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };