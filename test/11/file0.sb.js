let memory = new WebAssembly.Memory({
    initial: 0,
    maximum: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 6,
    maximum: 6
});
let functions = {
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/11/file1.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param i32)))
 (type $2 (func (param (ref extern))))
 (type $3 (func (param i32 i32 (ref extern))))
 (type $4 (func (param i32 (ref extern))))
 (type $5 (func (param i64) (result (ref extern))))
 (type $6 (func (param f32) (result (ref extern))))
 (type $7 (func (param f64) (result (ref extern))))
 (type $8 (func (param (ref extern)) (result (ref extern))))
 (type $9 (func (param externref) (result i32)))
 (type $10 (func (param externref externref) (result (ref extern))))
 (type $11 (func (param externref i32 i32) (result (ref extern))))
 (type $12 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $5) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $6) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $7) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $8) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $2) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $9) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $10) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $11) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $12) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "f_[$i]->[]" (func $"f_[$i]->[]"))
 (export "f_[$b]->[]" (func $"f_[$b]->[]"))
 (export "f_[$s]->[]" (func $"f_[$s]->[]"))
 (export "g_[[$i,$s]->[],$i,$s]->[]" (func $"g_[[$i,$s]->[],$i,$s]->[]"))
 (func $"f_[$i]->[]" (type $1) (param $0 i32)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $0)
   )
  )
 )
 (func $"f_[$b]->[]" (type $1) (param $0 i32)
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (local.get $0)
   )
  )
 )
 (func $"f_[$s]->[]" (type $2) (param $0 (ref extern))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $0)
   )
  )
 )
 (func $"g_[[$i,$s]->[],$i,$s]->[]" (type $3) (param $0 i32) (param $1 i32) (param $2 (ref extern))
  (call_indirect $$table (type $4)
   (local.get $1)
   (local.get $2)
   (local.get $0)
  )
 )
)
*/
let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,80,13,96,1,127,1,100,111,96,1,127,0,96,1,100,111,0,96,3,127,127,100,111,0,96,2,127,100,111,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,190,3,16,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,7,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,8,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,2,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,12,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,5,4,1,1,2,3,7,68,4,10,102,95,91,36,105,93,45,62,91,93,0,12,10,102,95,91,36,98,93,45,62,91,93,0,13,10,102,95,91,36,115,93,45,62,91,93,0,14,25,103,95,91,91,36,105,44,36,115,93,45,62,91,93,44,36,105,44,36,115,93,45,62,91,93,0,15,9,6,1,0,35,1,11,0,10,40,4,8,0,32,0,16,0,16,7,11,8,0,32,0,16,5,16,7,11,8,0,32,0,16,6,16,7,11,11,0,32,1,32,2,32,0,17,4,0,11])).buffer;
let module_1 = new WebAssembly.Module(buffer_1, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_1 = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, 0)
    },
    '$functions': functions
};
let instance_1 = new WebAssembly.Instance(module_1, imports_1);
let exports_1 = instance_1.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/11/file2.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (array (mut (ref extern))))
 (type $2 (array (mut f64)))
 (type $3 (func (param i32 (ref extern))))
 (type $4 (func (param (ref extern) (ref $1)) (result (ref extern))))
 (type $5 (func (param f64 (ref $2)) (result f64)))
 (type $6 (func (param i64) (result (ref extern))))
 (type $7 (func (param f32) (result (ref extern))))
 (type $8 (func (param f64) (result (ref extern))))
 (type $9 (func (param (ref extern)) (result (ref extern))))
 (type $10 (func (param (ref extern))))
 (type $11 (func (param externref) (result i32)))
 (type $12 (func (param externref externref) (result (ref extern))))
 (type $13 (func (param externref i32 i32) (result (ref extern))))
 (type $14 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $6) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $7) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $8) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $9) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $10) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $11) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $12) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $13) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $14) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "f_[$i,$s]->[]" (func $"f_[$i,$s]->[]"))
 (export "f_[$s,{$s}]->[$s]" (func $"f_[$s,{$s}]->[$s]"))
 (export "f_[$fd,{$fd}]->[$fd]" (func $"f_[$fd,{$fd}]->[$fd]"))
 (func $"f_[$i,$s]->[]" (type $3) (param $0 i32) (param $1 (ref extern))
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $1)
   )
  )
 )
 (func $"f_[$s,{$s}]->[$s]" (type $4) (param $0 (ref extern)) (param $1 (ref $1)) (result (ref extern))
  (local $2 i32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $0)
   )
  )
  (local.set $2
   (array.len
    (local.get $1)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $2)
   )
  )
  (if
   (i32.lt_s
    (i32.const 0)
    (local.get $2)
   )
   (then
    (return
     (array.get $1
      (local.get $1)
      (i32.const 0)
     )
    )
   )
   (else
    (return
     (local.get $0)
    )
   )
  )
 )
 (func $"f_[$fd,{$fd}]->[$fd]" (type $5) (param $0 f64) (param $1 (ref $2)) (result f64)
  (local $2 i32)
  (call $$show
   (call $"$getString_[$fd]->[$s]"
    (local.get $0)
   )
  )
  (local.set $2
   (array.len
    (local.get $1)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $2)
   )
  )
  (if
   (i32.lt_s
    (i32.const 0)
    (local.get $2)
   )
   (then
    (return
     (array.get $2
      (local.get $1)
      (i32.const 0)
     )
    )
   )
   (else
    (return
     (local.get $0)
    )
   )
  )
 )
)
*/
let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,92,15,96,1,127,1,100,111,94,100,111,1,94,124,1,96,2,127,100,111,0,96,2,100,111,100,1,1,100,111,96,2,124,100,2,1,124,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,190,3,16,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,7,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,8,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,9,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,12,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,13,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,14,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,4,3,3,4,5,7,60,3,13,102,95,91,36,105,44,36,115,93,45,62,91,93,0,12,17,102,95,91,36,115,44,123,36,115,125,93,45,62,91,36,115,93,0,13,20,102,95,91,36,102,100,44,123,36,102,100,125,93,45,62,91,36,102,100,93,0,14,9,6,1,0,35,1,11,0,10,104,3,14,0,32,0,16,0,16,7,32,1,16,6,16,7,11,43,1,1,127,32,0,16,6,16,7,32,1,251,15,33,2,32,2,16,0,16,7,65,0,32,2,72,4,64,32,1,65,0,251,11,1,15,5,32,0,15,11,0,11,43,1,1,127,32,0,16,4,16,7,32,1,251,15,33,2,32,2,16,0,16,7,65,0,32,2,72,4,64,32,1,65,0,251,11,2,15,5,32,0,15,11,0,11])).buffer;
let module_2 = new WebAssembly.Module(buffer_2, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_2 = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, 0)
    },
    '$functions': functions
};
let instance_2 = new WebAssembly.Instance(module_2, imports_2);
let exports_2 = instance_2.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/11/file0.sb */
/*
(module
 (type $0 (array (mut (ref extern))))
 (type $1 (func (param i32) (result (ref extern))))
 (type $2 (array (mut f64)))
 (type $3 (func (param i32)))
 (type $4 (func (param (ref extern))))
 (type $5 (func (param (ref extern) (ref $0)) (result (ref extern))))
 (type $6 (func (param f64 (ref $2)) (result f64)))
 (type $7 (func (param i32 (ref extern))))
 (type $8 (func (param i32 i32 (ref extern))))
 (type $9 (func))
 (type $10 (func (param i64) (result (ref extern))))
 (type $11 (func (param f32) (result (ref extern))))
 (type $12 (func (param f64) (result (ref extern))))
 (type $13 (func (param (ref extern)) (result (ref extern))))
 (type $14 (func (param externref) (result i32)))
 (type $15 (func (param externref externref) (result (ref extern))))
 (type $16 (func (param externref i32 i32) (result (ref extern))))
 (type $17 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "Hello" (global $$string_58 (ref extern)))
 (import "$strings" "a" (global $$string_63 (ref extern)))
 (import "$strings" "b" (global $$string_64 (ref extern)))
 (import "$strings" "c" (global $$string_65 (ref extern)))
 (import "$strings" "A" (global $$string_87 (ref extern)))
 (import "$strings" "A" (global $$string_94 (ref extern)))
 (import "$strings" "20" (global $$string_127 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "f_[$i]->[]" (func $"f_[$i]->[]" (type $3) (param i32)))
 (import "file1" "f_[$b]->[]" (func $"f_[$b]->[]" (type $3) (param i32)))
 (import "file1" "f_[$s]->[]" (func $"f_[$s]->[]" (type $4) (param (ref extern))))
 (import "file2" "f_[$s,{$s}]->[$s]" (func $"f_[$s,{$s}]->[$s]" (type $5) (param (ref extern) (ref $0)) (result (ref extern))))
 (import "file2" "f_[$fd,{$fd}]->[$fd]" (func $"f_[$fd,{$fd}]->[$fd]" (type $6) (param f64 (ref $2)) (result f64)))
 (import "file2" "f_[$i,$s]->[]" (func $"f_[$i,$s]->[]" (type $7) (param i32 (ref extern))))
 (import "file3" "g_[[$i,$s]->[],$i,$s]->[]" (func $"g_[[$i,$s]->[],$i,$s]->[]" (type $8) (param i32 i32 (ref extern))))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $10) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $11) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $12) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $1) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $13) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $4) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $14) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $15) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $16) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $17) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset) $"f_[$fd,{$fd}]->[$fd]" $"f_[$s,{$s}]->[$s]" $"f_[$s]->[]" $"f_[$b]->[]" $"f_[$i]->[]" $"f_[$i,$s]->[]")
 (export "start" (func $start))
 (func $start (type $9)
  (local $0 (ref $0))
  (call $"f_[$i]->[]"
   (i32.const 10)
  )
  (call $"f_[$b]->[]"
   (i32.const 1)
  )
  (call $"f_[$s]->[]"
   (global.get $$string_58)
  )
  (call $"f_[$s]->[]"
   (array.get $0
    (array.new_fixed $0 3
     (global.get $$string_63)
     (global.get $$string_64)
     (global.get $$string_65)
    )
    (i32.const 0)
   )
  )
  (local.set $0
   (array.new_fixed $0 0)
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (call $"f_[$s,{$s}]->[$s]"
      (global.get $$string_87)
      (local.get $0)
     )
     (global.get $$string_94)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (f64.eq
     (call $"f_[$fd,{$fd}]->[$fd]"
      (f64.const 10.47)
      (array.new_fixed $2 1
       (f64.neg
        (f64.const 147.36)
       )
      )
     )
     (f64.neg
      (f64.const 147.36)
     )
    )
   )
  )
  (call $"g_[[$i,$s]->[],$i,$s]->[]"
   (i32.add
    (global.get $$tableOffset)
    (i32.const 5)
   )
   (i32.const 10)
   (global.get $$string_127)
  )
 )
)
*/
let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,106,18,94,100,111,1,96,1,127,1,100,111,94,124,1,96,1,127,0,96,1,100,111,0,96,2,100,111,100,0,1,100,111,96,2,124,100,2,1,124,96,2,127,100,111,0,96,3,127,127,100,111,0,96,0,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,212,5,30,5,102,105,108,101,49,10,102,95,91,36,105,93,45,62,91,93,0,3,5,102,105,108,101,49,10,102,95,91,36,98,93,45,62,91,93,0,3,5,102,105,108,101,49,10,102,95,91,36,115,93,45,62,91,93,0,4,5,102,105,108,101,50,17,102,95,91,36,115,44,123,36,115,125,93,45,62,91,36,115,93,0,5,5,102,105,108,101,50,20,102,95,91,36,102,100,44,123,36,102,100,125,93,45,62,91,36,102,100,93,0,6,5,102,105,108,101,50,13,102,95,91,36,105,44,36,115,93,45,62,91,93,0,7,5,102,105,108,101,51,25,103,95,91,91,36,105,44,36,115,93,45,62,91,93,44,36,105,44,36,115,93,45,62,91,93,0,8,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,1,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,1,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,10,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,11,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,12,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,1,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,13,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,4,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,14,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,16,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,17,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,5,72,101,108,108,111,3,100,111,0,8,36,115,116,114,105,110,103,115,1,97,3,100,111,0,8,36,115,116,114,105,110,103,115,1,98,3,100,111,0,8,36,115,116,114,105,110,103,115,1,99,3,100,111,0,8,36,115,116,114,105,110,103,115,1,65,3,100,111,0,8,36,115,116,114,105,110,103,115,1,65,3,100,111,0,8,36,115,116,114,105,110,103,115,2,50,48,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,2,1,9,7,9,1,5,115,116,97,114,116,0,19,9,12,1,0,35,8,11,6,4,3,2,1,0,5,10,107,1,105,1,1,100,0,65,10,16,0,65,1,16,1,35,1,16,2,35,2,35,3,35,4,251,8,0,3,65,0,251,11,0,16,2,251,8,0,0,33,0,35,5,32,0,16,3,35,6,16,18,16,12,16,14,68,113,61,10,215,163,240,36,64,68,236,81,184,30,133,107,98,64,154,251,8,2,1,16,4,68,236,81,184,30,133,107,98,64,154,97,16,12,16,14,35,8,65,5,106,65,10,35,7,16,6,11])).buffer;
let module_0 = new WebAssembly.Module(buffer_0, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_0 = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, 0)
    },
    '$functions': functions,
    'file1': {
        'f_[$i]->[]': exports_1['f_[$i]->[]'],
        'f_[$b]->[]': exports_1['f_[$b]->[]'],
        'f_[$s]->[]': exports_1['f_[$s]->[]']
    },
    'file2': {
        'f_[$i,$s]->[]': exports_2['f_[$i,$s]->[]'],
        'f_[$s,{$s}]->[$s]': exports_2['f_[$s,{$s}]->[$s]'],
        'f_[$fd,{$fd}]->[$fd]': exports_2['f_[$fd,{$fd}]->[$fd]']
    },
    'file3': {
        'g_[[$i,$s]->[],$i,$s]->[]': exports_1['g_[[$i,$s]->[],$i,$s]->[]']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { memory, exports_0 as 'exports' };