let globalObjects = {
    '$memory': new WebAssembly.Memory({
        initial: 0,
        maximum: 1
    }),
    '$table': new WebAssembly.Table({
        element: 'anyfunc',
        initial: 5
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file2.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func))
 (type $2 (func (param i32)))
 (type $3 (func (param i64) (result (ref extern))))
 (type $4 (func (param f32) (result (ref extern))))
 (type $5 (func (param f64) (result (ref extern))))
 (type $6 (func (param (ref extern)) (result (ref extern))))
 (type $7 (func (param (ref extern))))
 (type $8 (func (param externref) (result i32)))
 (type $9 (func (param externref externref) (result (ref extern))))
 (type $10 (func (param externref i32 i32) (result (ref extern))))
 (type $11 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $3) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $4) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $5) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $6) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $7) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $8) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $9) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $10) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $11) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset) $g)
 (export "f_[]->[]" (func $"f_[]->[]"))
 (export "g" (func $g))
 (export "f_[$b]->[]" (func $"f_[$b]->[]"))
 (func $"f_[]->[]" (type $1)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 21)
   )
  )
 )
 (func $g (type $1)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 22)
   )
  )
 )
 (func $"f_[$b]->[]" (type $2) (param $0 i32)
  (local $1 i32)
  (local.set $1
   (i32.add
    (global.get $$tableOffset)
    (i32.const 0)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 23)
   )
  )
 )
)
*/

let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,70,12,96,1,127,1,100,111,96,0,0,96,1,127,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,146,4,16,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,4,3,1,1,2,7,29,3,8,102,95,91,93,45,62,91,93,0,12,1,103,0,13,10,102,95,91,36,98,93,45,62,91,93,0,14,9,7,1,0,35,1,11,1,13,10,37,3,8,0,65,21,16,0,16,7,11,8,0,65,22,16,0,16,7,11,17,1,1,127,35,1,65,0,106,33,1,65,23,16,0,16,7,11])).buffer;
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
    '$globalFunctions': globalFunctions
};
let instance_2 = new WebAssembly.Instance(module_2, imports_2);
let exports_2 = instance_2.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file1.sb */
/*
(module
 (type $0 (func (param i32)))
 (type $1 (func (param i32) (result (ref extern))))
 (type $2 (func))
 (type $3 (func (param f64)))
 (type $4 (func (param i64) (result (ref extern))))
 (type $5 (func (param f32) (result (ref extern))))
 (type $6 (func (param f64) (result (ref extern))))
 (type $7 (func (param (ref extern)) (result (ref extern))))
 (type $8 (func (param (ref extern))))
 (type $9 (func (param externref) (result i32)))
 (type $10 (func (param externref externref) (result (ref extern))))
 (type $11 (func (param externref i32 i32) (result (ref extern))))
 (type $12 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "file2" "f_[$b]->[]" (func $"F_[$b]->[]" (type $0) (param i32)))
 (import "file2" "f_[]->[]" (func $"F_[]->[]" (type $2)))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $4) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $5) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $6) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $7) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $8) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $9) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $10) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $11) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $12) (param externref externref) (result i32)))
 (global $Y (mut i32) (i32.const 17))
 (elem $$functions (global.get $$tableOffset) $"f_[[$i]->[]]->[]" $"f_[$fd]->[]" $"f_[$b]->[]" $"f_[]->[]")
 (export "Y" (global $Y))
 (export "f_[$b]->[]" (func $"f_[$b]->[]"))
 (export "f_[[$i]->[]]->[]" (func $"f_[[$i]->[]]->[]"))
 (func $"f_[]->[]" (type $2)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 11)
   )
  )
 )
 (func $"f_[$b]->[]" (type $0) (param $0 i32)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 12)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (global.get $Y)
   )
  )
 )
 (func $"f_[$fd]->[]" (type $3) (param $0 f64)
  (local $1 i32)
  (local.set $1
   (i32.add
    (global.get $$tableOffset)
    (i32.const 2)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 13)
   )
  )
 )
 (func $"f_[[$i]->[]]->[]" (type $0) (param $0 i32)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.const 14)
   )
  )
  (call_indirect $$table (type $0)
   (i32.const 144)
   (local.get $0)
  )
 )
)
*/

let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,74,13,96,1,127,0,96,1,127,1,100,111,96,0,0,96,1,124,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,182,4,18,5,102,105,108,101,50,10,102,95,91,36,98,93,45,62,91,93,0,0,5,102,105,108,101,50,8,102,95,91,93,45,62,91,93,0,2,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,4,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,1,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,7,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,12,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,5,4,2,0,3,0,6,6,1,127,1,65,17,11,7,37,3,1,89,3,2,10,102,95,91,36,98,93,45,62,91,93,0,15,16,102,95,91,91,36,105,93,45,62,91,93,93,45,62,91,93,0,17,9,10,1,0,35,1,11,4,17,16,15,14,10,60,4,8,0,65,11,16,2,16,9,11,14,0,65,12,16,2,16,9,35,2,16,2,16,9,11,17,1,1,127,35,1,65,2,106,33,1,65,13,16,2,16,9,11,16,0,65,14,16,2,16,9,65,144,1,32,0,17,0,0,11])).buffer;
let module_1 = new WebAssembly.Module(buffer_1, {
    builtins: ['js-string']
});
let imports_1 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 1)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'file2': {
        'f_[$b]->[]': exports_2['f_[$b]->[]'],
        'f_[]->[]': exports_2['f_[]->[]']
    }
};
let instance_1 = new WebAssembly.Instance(module_1, imports_1);
let exports_1 = instance_1.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param i32)))
 (type $2 (func))
 (type $3 (func (param i64) (result (ref extern))))
 (type $4 (func (param f32) (result (ref extern))))
 (type $5 (func (param f64) (result (ref extern))))
 (type $6 (func (param (ref extern)) (result (ref extern))))
 (type $7 (func (param (ref extern))))
 (type $8 (func (param externref) (result i32)))
 (type $9 (func (param externref externref) (result (ref extern))))
 (type $10 (func (param externref i32 i32) (result (ref extern))))
 (type $11 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "file1" "Y" (global $Y (mut i32)))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $3) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $4) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $5) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $6) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $7) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $8) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $9) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $10) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $11) (param externref externref) (result i32)))
 (global $X (mut i32) (i32.const 14))
 (elem $$functions (global.get $$tableOffset))
 (export "X" (global $X))
 (func $f (type $1) (param $0 i32)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $0)
   )
  )
 )
 (func $start (type $2)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (global.get $Y)
   )
  )
  (global.set $Y
   (i32.const 159)
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,70,12,96,1,127,1,100,111,96,1,127,0,96,0,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,157,4,17,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,5,102,105,108,101,49,1,89,3,127,1,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,3,2,1,2,6,6,1,127,1,65,14,11,7,5,1,1,88,3,3,9,6,1,0,35,2,11,0,10,24,2,8,0,32,0,16,0,16,7,11,13,0,35,0,16,0,16,7,65,159,1,36,0,11])).buffer;
let module_0 = new WebAssembly.Module(buffer_0, {
    builtins: ['js-string']
});
let imports_0 = {
    '$globalObjects': globalObjects,
    '$localObjects': {
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 5)
    },
    '$globalStrings': globalStrings,
    '$localStrings': {
    },
    '$globalFunctions': globalFunctions,
    'file1': {
        'Y': exports_1['Y']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };