let memory = new WebAssembly.Memory({
    initial: 0,
    maximum: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 11,
    maximum: 11
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/10/file2.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param f32 f32) (result (ref extern))))
 (type $2 (func (param i32 f32 f32)))
 (type $3 (func (param i64) (result (ref extern))))
 (type $4 (func (param f32) (result (ref extern))))
 (type $5 (func (param f64) (result (ref extern))))
 (type $6 (func (param (ref extern)) (result (ref extern))))
 (type $7 (func (param (ref extern))))
 (type $8 (func (param externref) (result i32)))
 (type $9 (func (param externref externref) (result (ref extern))))
 (type $10 (func (param externref i32 i32) (result (ref extern))))
 (type $11 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" " / " (global $$string_25 (ref extern)))
 (import "$strings" " = " (global $$string_36 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $3) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $4) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $5) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $6) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $7) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $8) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $9) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $10) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $11) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "f" (func $f))
 (export "g" (func $g))
 (func $f (type $1) (param $0 f32) (param $1 f32) (result (ref extern))
  (return
   (call $$wasm:js-string_concat
    (call $$wasm:js-string_concat
     (call $$wasm:js-string_concat
      (call $"$getString_[$f]->[$s]"
       (local.get $0)
      )
      (global.get $$string_25)
     )
     (call $$wasm:js-string_concat
      (call $"$getString_[$f]->[$s]"
       (local.get $1)
      )
      (global.get $$string_36)
     )
    )
    (call $"$getString_[$f]->[$s]"
     (f32.div
      (local.get $0)
      (local.get $1)
     )
    )
   )
  )
 )
 (func $g (type $2) (param $0 i32) (param $1 f32) (param $2 f32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $1)
     (local.get $1)
     (local.get $2)
     (local.get $0)
    )
   )
  )
 )
)
*/
let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,76,12,96,1,127,1,100,111,96,2,125,125,1,100,111,96,3,127,125,125,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,224,3,18,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,47,32,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,61,32,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,3,2,1,2,7,9,2,1,102,0,12,1,103,0,13,9,6,1,0,35,3,11,0,10,48,2,30,0,32,0,16,3,35,1,16,9,32,1,16,3,35,2,16,9,16,9,32,0,32,1,149,16,3,16,9,15,11,15,0,32,1,32,2,32,0,17,1,0,16,6,16,7,11])).buffer;
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
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/10/file1.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param f32 f32) (result (ref extern))))
 (type $2 (func (param i32) (result i32)))
 (type $3 (func (param i64) (result (ref extern))))
 (type $4 (func (param f32) (result (ref extern))))
 (type $5 (func (param f64) (result (ref extern))))
 (type $6 (func (param (ref extern)) (result (ref extern))))
 (type $7 (func (param (ref extern))))
 (type $8 (func (param externref) (result i32)))
 (type $9 (func (param externref externref) (result (ref extern))))
 (type $10 (func (param externref i32 i32) (result (ref extern))))
 (type $11 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" " * " (global $$string_35 (ref extern)))
 (import "$strings" " = " (global $$string_46 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "file2" "f" (func $F (type $1) (param f32 f32) (result (ref extern))))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $3) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $4) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $5) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $6) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $7) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $8) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $9) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $10) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $11) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset) $f $F)
 (export "f" (func $f))
 (export "g" (func $g))
 (func $f (type $1) (param $0 f32) (param $1 f32) (result (ref extern))
  (return
   (call $$wasm:js-string_concat
    (call $$wasm:js-string_concat
     (call $$wasm:js-string_concat
      (call $"$getString_[$f]->[$s]"
       (local.get $0)
      )
      (global.get $$string_35)
     )
     (call $$wasm:js-string_concat
      (call $"$getString_[$f]->[$s]"
       (local.get $1)
      )
      (global.get $$string_46)
     )
    )
    (call $"$getString_[$f]->[$s]"
     (f32.mul
      (local.get $0)
      (local.get $1)
     )
    )
   )
  )
 )
 (func $g (type $2) (param $0 i32) (result i32)
  (if
   (i32.eq
    (local.get $0)
    (i32.const 0)
   )
   (then
    (return
     (i32.add
      (global.get $$tableOffset)
      (i32.const 0)
     )
    )
   )
   (else
    (return
     (i32.add
      (global.get $$tableOffset)
      (i32.const 1)
     )
    )
   )
  )
 )
)
*/
let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,75,12,96,1,127,1,100,111,96,2,125,125,1,100,111,96,1,127,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,234,3,19,5,102,105,108,101,50,1,102,0,1,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,42,32,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,61,32,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,3,2,1,2,7,9,2,1,102,0,13,1,103,0,14,9,8,1,0,35,3,11,2,13,0,10,57,2,30,0,32,0,16,4,35,1,16,10,32,1,16,4,35,2,16,10,16,10,32,0,32,1,148,16,4,16,10,15,11,24,0,32,0,65,0,70,4,64,35,3,65,0,106,15,5,35,3,65,1,106,15,11,0,11])).buffer;
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
    '$functions': functions,
    'file2': {
        'f': exports_2['f']
    }
};
let instance_1 = new WebAssembly.Instance(module_1, imports_1);
let exports_1 = instance_1.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/10/file3.sb */
/*
(module
 (type $0 (array (mut i32)))
 (type $1 (array (mut (ref extern))))
 (type $2 (array (mut (ref $0))))
 (type $3 (func (param i32) (result (ref extern))))
 (type $4 (func))
 (type $5 (func (param i32) (result (ref $0))))
 (type $6 (func (param (ref $1)) (result (ref extern))))
 (type $7 (func (param (ref $0))))
 (type $8 (func (param (ref $0)) (result (ref extern))))
 (type $9 (func (param (ref $0) (ref $0)) (result (ref $0))))
 (type $10 (func (param (ref $2) i32 i32) (result i32)))
 (type $11 (func (param i64) (result (ref extern))))
 (type $12 (func (param f32) (result (ref extern))))
 (type $13 (func (param f64) (result (ref extern))))
 (type $14 (func (param (ref extern)) (result (ref extern))))
 (type $15 (func (param (ref extern))))
 (type $16 (func (param externref) (result i32)))
 (type $17 (func (param externref externref) (result (ref extern))))
 (type $18 (func (param externref i32 i32) (result (ref extern))))
 (type $19 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "abc" (global $$string_22 (ref extern)))
 (import "$strings" "defg" (global $$string_23 (ref extern)))
 (import "$strings" "hijkl" (global $$string_24 (ref extern)))
 (import "$strings" "Array before: " (global $$string_41 (ref extern)))
 (import "$strings" "{" (global $$string_1960 (ref extern)))
 (import "$strings" ", " (global $$string_2003 (ref extern)))
 (import "$strings" "}" (global $$string_2060 (ref extern)))
 (import "$strings" "Hello" (global $$string_49 (ref extern)))
 (import "$strings" "Array after: " (global $$string_66 (ref extern)))
 (import "$strings" "{" (global $$string_2130 (ref extern)))
 (import "$strings" ", " (global $$string_2173 (ref extern)))
 (import "$strings" "}" (global $$string_2230 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $3) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $3) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $11) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $12) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $13) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $3) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $14) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $15) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $16) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $17) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $18) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $19) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (export "f" (func $f))
 (export "g" (func $g))
 (export "$getString_[{$s}]->[$s]" (func $"$getString_[{$s}]->[$s]"))
 (export "show_[{$i}]->[]" (func $"show_[{$i}]->[]"))
 (export "$getString_[{$i}]->[$s]" (func $"$getString_[{$i}]->[$s]"))
 (export "$getElement_[{$i},{$i}]->[{$i}]" (func $"$getElement_[{$i},{$i}]->[{$i}]"))
 (export "$getElement_[{{$i}},$i,$i]->[$i]" (func $"$getElement_[{{$i}},$i,$i]->[$i]"))
 (func $start (type $4)
  (call $f)
 )
 (func $f (type $4)
  (local $0 (ref $1))
  (local $1 (ref $0))
  (local $2 (ref $2))
  (local.set $0
   (array.new_fixed $1 3
    (global.get $$string_22)
    (global.get $$string_23)
    (global.get $$string_24)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (global.get $$string_41)
     (call $"$getString_[{$s}]->[$s]"
      (local.get $0)
     )
    )
   )
  )
  (array.set $1
   (local.get $0)
   (i32.const 1)
   (global.get $$string_49)
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (global.get $$string_66)
     (call $"$getString_[{$s}]->[$s]"
      (local.get $0)
     )
    )
   )
  )
  (call $"show_[{$i}]->[]"
   (call $g
    (i32.const 0)
   )
  )
  (array.set $0
   (call $g
    (i32.const 0)
   )
   (i32.const 1)
   (i32.const 10)
  )
  (call $"show_[{$i}]->[]"
   (call $g
    (i32.const 0)
   )
  )
  (local.set $1
   (array.new_fixed $0 6
    (i32.const 0)
    (i32.const 10)
    (i32.const 20)
    (i32.const 30)
    (i32.const 40)
    (i32.const 50)
   )
  )
  (call $"show_[{$i}]->[]"
   (call $"$getElement_[{$i},{$i}]->[{$i}]"
    (local.get $1)
    (array.new_fixed $0 3
     (i32.const 0)
     (i32.const 2)
     (i32.const 4)
    )
   )
  )
  (local.set $2
   (array.new_fixed $2 3
    (array.new_fixed $0 3
     (i32.const 0)
     (i32.const 1)
     (i32.const 2)
    )
    (array.new_fixed $0 6
     (i32.const 3)
     (i32.const 4)
     (i32.const 5)
     (i32.const 6)
     (i32.const 7)
     (i32.const 8)
    )
    (array.new_fixed $0 7
     (i32.const 9)
     (i32.const 10)
     (i32.const 11)
     (i32.const 12)
     (i32.const 13)
     (i32.const 14)
     (i32.const 15)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (i32.eq
     (call $"$getElement_[{{$i}},$i,$i]->[$i]"
      (local.get $2)
      (i32.const 2)
      (i32.const 0)
     )
     (i32.const 9)
    )
   )
  )
 )
 (func $g (type $5) (param $0 i32) (result (ref $0))
  (return
   (array.new_fixed $0 5
    (local.get $0)
    (i32.add
     (local.get $0)
     (i32.const 1)
    )
    (i32.add
     (local.get $0)
     (i32.const 2)
    )
    (i32.add
     (local.get $0)
     (i32.const 3)
    )
    (i32.add
     (local.get $0)
     (i32.const 4)
    )
   )
  )
 )
 (func $"$getString_[{$s}]->[$s]" (type $6) (param $0 (ref $1)) (result (ref extern))
  (local $1 (ref extern))
  (local $2 i32)
  (local $3 i32)
  (local $4 (ref extern))
  (local.set $1
   (global.get $$string_1960)
  )
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (loop $loop_8
   (if
    (i32.lt_s
     (local.get $2)
     (local.get $3)
    )
    (then
     (block
      (if
       (i32.lt_s
        (i32.const 0)
        (local.get $2)
       )
       (then
        (local.set $1
         (call $$wasm:js-string_concat
          (local.get $1)
          (global.get $$string_2003)
         )
        )
       )
       (else
        (nop)
       )
      )
      (local.set $4
       (array.get $1
        (local.get $0)
        (local.get $2)
       )
      )
      (local.set $1
       (call $$wasm:js-string_concat
        (local.get $1)
        (call $"$getString_[$s]->[$s]"
         (local.get $4)
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
     )
     (br $loop_8)
    )
   )
  )
  (local.set $1
   (call $$wasm:js-string_concat
    (local.get $1)
    (global.get $$string_2060)
   )
  )
  (return
   (local.get $1)
  )
 )
 (func $"show_[{$i}]->[]" (type $7) (param $0 (ref $0))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"$getString_[{$i}]->[$s]"
     (local.get $0)
    )
   )
  )
 )
 (func $"$getString_[{$i}]->[$s]" (type $8) (param $0 (ref $0)) (result (ref extern))
  (local $1 (ref extern))
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $1
   (global.get $$string_2130)
  )
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (loop $loop_15
   (if
    (i32.lt_s
     (local.get $2)
     (local.get $3)
    )
    (then
     (block
      (if
       (i32.lt_s
        (i32.const 0)
        (local.get $2)
       )
       (then
        (local.set $1
         (call $$wasm:js-string_concat
          (local.get $1)
          (global.get $$string_2173)
         )
        )
       )
       (else
        (nop)
       )
      )
      (local.set $4
       (array.get $0
        (local.get $0)
        (local.get $2)
       )
      )
      (local.set $1
       (call $$wasm:js-string_concat
        (local.get $1)
        (call $"$getString_[$i]->[$s]"
         (local.get $4)
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
     )
     (br $loop_15)
    )
   )
  )
  (local.set $1
   (call $$wasm:js-string_concat
    (local.get $1)
    (global.get $$string_2230)
   )
  )
  (return
   (local.get $1)
  )
 )
 (func $"$getElement_[{$i},{$i}]->[{$i}]" (type $9) (param $0 (ref $0)) (param $1 (ref $0)) (result (ref $0))
  (local $2 (ref $0))
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local.set $2
   (array.new_fixed $0 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (local.set $4
   (array.len
    (local.get $1)
   )
  )
  (if
   (i32.and
    (i32.lt_s
     (i32.const 0)
     (local.get $3)
    )
    (i32.lt_s
     (i32.const 0)
     (local.get $4)
    )
   )
   (then
    (local.set $5
     (local.get $3)
    )
    (if
     (i32.lt_s
      (local.get $4)
      (local.get $5)
     )
     (then
      (local.set $5
       (local.get $4)
      )
     )
     (else
      (nop)
     )
    )
    (local.set $2
     (array.new $0
      (array.get $0
       (local.get $0)
       (i32.const 0)
      )
      (local.get $5)
     )
    )
    (local.set $6
     (i32.const 0)
    )
    (loop $loop_23
     (if
      (i32.lt_s
       (local.get $6)
       (local.get $5)
      )
      (then
       (block
        (local.set $7
         (array.get $0
          (local.get $1)
          (local.get $6)
         )
        )
        (if
         (i32.and
          (i32.le_s
           (i32.const 0)
           (local.get $7)
          )
          (i32.lt_s
           (local.get $7)
           (i32.sub
            (local.get $3)
            (i32.const 1)
           )
          )
         )
         (then
          (array.set $0
           (local.get $2)
           (local.get $6)
           (array.get $0
            (local.get $0)
            (local.get $7)
           )
          )
         )
         (else
          (nop)
         )
        )
        (local.set $6
         (i32.add
          (local.get $6)
          (i32.const 1)
         )
        )
       )
       (br $loop_23)
      )
     )
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $2)
  )
 )
 (func $"$getElement_[{{$i}},$i,$i]->[$i]" (type $10) (param $0 (ref $2)) (param $1 i32) (param $2 i32) (result i32)
  (return
   (array.get $0
    (array.get $2
     (local.get $0)
     (local.get $1)
    )
    (local.get $2)
   )
  )
 )
)
*/
let buffer_3 = (new Uint8Array([0,97,115,109,1,0,0,0,1,119,20,94,127,1,94,100,111,1,94,100,0,1,96,1,127,1,100,111,96,0,0,96,1,127,1,100,0,96,1,100,1,1,100,111,96,1,100,0,0,96,1,100,0,1,100,111,96,2,100,0,100,0,1,100,0,96,3,100,2,127,127,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,154,5,28,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,11,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,12,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,13,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,14,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,15,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,16,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,17,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,18,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,19,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,3,97,98,99,3,100,111,0,8,36,115,116,114,105,110,103,115,4,100,101,102,103,3,100,111,0,8,36,115,116,114,105,110,103,115,5,104,105,106,107,108,3,100,111,0,8,36,115,116,114,105,110,103,115,14,65,114,114,97,121,32,98,101,102,111,114,101,58,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,123,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,125,3,100,111,0,8,36,115,116,114,105,110,103,115,5,72,101,108,108,111,3,100,111,0,8,36,115,116,114,105,110,103,115,13,65,114,114,97,121,32,97,102,116,101,114,58,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,123,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,125,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,9,8,4,4,5,6,7,8,9,10,7,156,1,8,5,115,116,97,114,116,0,12,1,102,0,13,1,103,0,14,23,36,103,101,116,83,116,114,105,110,103,95,91,123,36,115,125,93,45,62,91,36,115,93,0,15,15,115,104,111,119,95,91,123,36,105,125,93,45,62,91,93,0,16,23,36,103,101,116,83,116,114,105,110,103,95,91,123,36,105,125,93,45,62,91,36,115,93,0,17,31,36,103,101,116,69,108,101,109,101,110,116,95,91,123,36,105,125,44,123,36,105,125,93,45,62,91,123,36,105,125,93,0,18,32,36,103,101,116,69,108,101,109,101,110,116,95,91,123,123,36,105,125,125,44,36,105,44,36,105,93,45,62,91,36,105,93,0,19,9,6,1,0,35,13,11,0,10,183,4,8,4,0,16,13,11,178,1,3,1,100,1,1,100,0,1,100,2,35,1,35,2,35,3,251,8,1,3,33,0,35,4,32,0,16,15,16,9,16,6,16,7,32,0,65,1,35,8,251,14,1,35,9,32,0,16,15,16,9,16,6,16,7,65,0,16,14,16,16,65,0,16,14,65,1,65,10,251,14,0,65,0,16,14,16,16,65,0,65,10,65,20,65,30,65,40,65,50,251,8,0,6,33,1,32,1,65,0,65,2,65,4,251,8,0,3,16,18,16,16,65,0,65,1,65,2,251,8,0,3,65,3,65,4,65,5,65,6,65,7,65,8,251,8,0,6,65,9,65,10,65,11,65,12,65,13,65,14,65,15,251,8,0,7,251,8,2,3,33,2,32,2,65,2,65,0,16,19,65,9,70,16,5,16,7,11,29,0,32,0,32,0,65,1,106,32,0,65,2,106,32,0,65,3,106,32,0,65,4,106,251,8,0,5,15,11,89,2,2,100,111,2,127,35,5,33,1,65,0,33,3,32,0,251,15,33,4,3,64,32,3,32,4,72,4,64,65,0,32,3,72,4,64,32,1,35,6,16,9,33,1,5,1,11,32,0,32,3,251,11,1,33,2,32,1,32,2,16,6,16,9,33,1,32,3,65,1,106,33,3,12,1,11,11,32,1,35,7,16,9,33,1,32,1,15,11,10,0,32,0,16,17,16,6,16,7,11,89,2,1,100,111,3,127,35,10,33,1,65,0,33,2,32,0,251,15,33,3,3,64,32,2,32,3,72,4,64,65,0,32,2,72,4,64,32,1,35,11,16,9,33,1,5,1,11,32,0,32,2,251,11,0,33,4,32,1,32,4,16,0,16,9,33,1,32,2,65,1,106,33,2,12,1,11,11,32,1,35,12,16,9,33,1,32,1,15,11,142,1,2,1,100,0,5,127,251,8,0,0,33,2,32,0,251,15,33,3,32,1,251,15,33,4,65,0,32,3,72,65,0,32,4,72,113,4,64,32,3,33,5,32,4,32,5,72,4,64,32,4,33,5,5,1,11,32,0,65,0,251,11,0,32,5,251,6,0,33,2,65,0,33,6,3,64,32,6,32,5,72,4,64,32,1,32,6,251,11,0,33,7,65,0,32,7,76,32,7,32,3,65,1,107,72,113,4,64,32,2,32,6,32,0,32,7,251,11,0,251,14,0,5,1,11,32,6,65,1,106,33,6,12,1,11,11,5,1,11,32,2,15,11,15,0,32,0,32,1,251,11,2,32,2,251,11,0,15,11])).buffer;
let module_3 = new WebAssembly.Module(buffer_3, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_3 = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, 2)
    },
    '$functions': functions
};
let instance_3 = new WebAssembly.Instance(module_3, imports_3);
let exports_3 = instance_3.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/10/file4.sb */
/*
(module
 (type $0 (array (mut i32)))
 (type $1 (array (mut (ref $0))))
 (type $2 (func (param i32) (result (ref extern))))
 (type $3 (func (param (ref $1) (ref $1)) (result i32)))
 (type $4 (func (param (ref $0) (ref $0)) (result i32)))
 (type $5 (func))
 (type $6 (func (param (ref $1))))
 (type $7 (func (param (ref $1)) (result (ref extern))))
 (type $8 (func (param (ref $0)) (result (ref extern))))
 (type $9 (func (param (ref $1) (ref $1)) (result (ref $1))))
 (type $10 (func (param (ref $0) i32 i32) (result (ref $0))))
 (type $11 (func (param (ref $0))))
 (type $12 (func (param (ref $1) i32 i32) (result (ref $1))))
 (type $13 (func (param i64) (result (ref extern))))
 (type $14 (func (param f32) (result (ref extern))))
 (type $15 (func (param f64) (result (ref extern))))
 (type $16 (func (param (ref extern)) (result (ref extern))))
 (type $17 (func (param (ref extern))))
 (type $18 (func (param externref) (result i32)))
 (type $19 (func (param externref externref) (result (ref extern))))
 (type $20 (func (param externref i32 i32) (result (ref extern))))
 (type $21 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "{" (global $$string_2072 (ref extern)))
 (import "$strings" ", " (global $$string_2115 (ref extern)))
 (import "$strings" "{" (global $$string_2211 (ref extern)))
 (import "$strings" ", " (global $$string_2254 (ref extern)))
 (import "$strings" "}" (global $$string_2311 (ref extern)))
 (import "$strings" "}" (global $$string_2172 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $13) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $14) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $15) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $16) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $17) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $18) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $19) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $20) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $21) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "f" (func $f))
 (export "show_[{{$i}}]->[]" (func $"show_[{{$i}}]->[]"))
 (export "$getString_[{{$i}}]->[$s]" (func $"$getString_[{{$i}}]->[$s]"))
 (export "$getString_[{$i}]->[$s]" (func $"$getString_[{$i}]->[$s]"))
 (export "$eq_[{{$i}},{{$i}}]->[$b]" (func $"$eq_[{{$i}},{{$i}}]->[$b]"))
 (export "$ne_[{$i},{$i}]->[$b]" (func $"$ne_[{$i},{$i}]->[$b]"))
 (export "$eq_[{$i},{$i}]->[$b]" (func $"$eq_[{$i},{$i}]->[$b]"))
 (export "$ne_[{{$i}},{{$i}}]->[$b]" (func $"$ne_[{{$i}},{{$i}}]->[$b]"))
 (export "$join_[{{$i}},{{$i}}]->[{{$i}}]" (func $"$join_[{{$i}},{{$i}}]->[{{$i}}]"))
 (export "$slice_[{$i},$i,$i]->[{$i}]" (func $"$slice_[{$i},$i,$i]->[{$i}]"))
 (export "show_[{$i}]->[]" (func $"show_[{$i}]->[]"))
 (export "$slice_[{{$i}},$i,$i]->[{{$i}}]" (func $"$slice_[{{$i}},$i,$i]->[{{$i}}]"))
 (func $f (type $5)
  (local $0 (ref $1))
  (local $1 (ref $1))
  (local $2 (ref $0))
  (local.set $0
   (array.new_fixed $1 4
    (array.new_fixed $0 1
     (i32.sub
      (i32.const 0)
      (i32.const 5)
     )
    )
    (array.new_fixed $0 2
     (i32.const 3)
     (i32.sub
      (i32.const 0)
      (i32.const 1)
     )
    )
    (array.new_fixed $0 2
     (i32.const 1)
     (i32.sub
      (i32.const 0)
      (i32.const 3)
     )
    )
    (array.new_fixed $0 1
     (i32.const 5)
    )
   )
  )
  (local.set $1
   (array.new_fixed $1 4
    (array.new_fixed $0 1
     (i32.sub
      (i32.const 0)
      (i32.const 5)
     )
    )
    (array.new_fixed $0 2
     (i32.const 3)
     (i32.sub
      (i32.const 0)
      (i32.const 1)
     )
    )
    (array.new_fixed $0 2
     (i32.const 1)
     (i32.const 3)
    )
    (array.new_fixed $0 1
     (i32.const 5)
    )
   )
  )
  (call $"show_[{{$i}}]->[]"
   (local.get $0)
  )
  (call $"show_[{{$i}}]->[]"
   (local.get $1)
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $"$eq_[{{$i}},{{$i}}]->[$b]"
     (local.get $0)
     (local.get $1)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $"$ne_[{{$i}},{{$i}}]->[$b]"
     (local.get $0)
     (local.get $1)
    )
   )
  )
  (call $"show_[{{$i}}]->[]"
   (call $"$join_[{{$i}},{{$i}}]->[{{$i}}]"
    (local.get $0)
    (local.get $1)
   )
  )
  (local.set $2
   (array.new_fixed $0 0)
  )
  (call $"show_[{$i}]->[]"
   (call $"$slice_[{$i},$i,$i]->[{$i}]"
    (local.get $2)
    (i32.const 0)
    (i32.const 1)
   )
  )
  (call $"show_[{{$i}}]->[]"
   (call $"$slice_[{{$i}},$i,$i]->[{{$i}}]"
    (local.get $0)
    (i32.const 1)
    (i32.const 100)
   )
  )
  (call $"show_[{{$i}}]->[]"
   (call $"$slice_[{{$i}},$i,$i]->[{{$i}}]"
    (local.get $1)
    (i32.const 3)
    (i32.const 4)
   )
  )
  (call $"show_[{{$i}}]->[]"
   (call $"$slice_[{{$i}},$i,$i]->[{{$i}}]"
    (local.get $1)
    (i32.const 4)
    (i32.const 5)
   )
  )
 )
 (func $"show_[{{$i}}]->[]" (type $6) (param $0 (ref $1))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"$getString_[{{$i}}]->[$s]"
     (local.get $0)
    )
   )
  )
 )
 (func $"$getString_[{{$i}}]->[$s]" (type $7) (param $0 (ref $1)) (result (ref extern))
  (local $1 (ref extern))
  (local $2 i32)
  (local $3 i32)
  (local $4 (ref $0))
  (local.set $1
   (global.get $$string_2072)
  )
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (loop $loop_8
   (if
    (i32.lt_s
     (local.get $2)
     (local.get $3)
    )
    (then
     (block
      (if
       (i32.lt_s
        (i32.const 0)
        (local.get $2)
       )
       (then
        (local.set $1
         (call $$wasm:js-string_concat
          (local.get $1)
          (global.get $$string_2115)
         )
        )
       )
       (else
        (nop)
       )
      )
      (local.set $4
       (array.get $1
        (local.get $0)
        (local.get $2)
       )
      )
      (local.set $1
       (call $$wasm:js-string_concat
        (local.get $1)
        (call $"$getString_[{$i}]->[$s]"
         (local.get $4)
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
     )
     (br $loop_8)
    )
   )
  )
  (local.set $1
   (call $$wasm:js-string_concat
    (local.get $1)
    (global.get $$string_2172)
   )
  )
  (return
   (local.get $1)
  )
 )
 (func $"$getString_[{$i}]->[$s]" (type $8) (param $0 (ref $0)) (result (ref extern))
  (local $1 (ref extern))
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $1
   (global.get $$string_2211)
  )
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (loop $loop_13
   (if
    (i32.lt_s
     (local.get $2)
     (local.get $3)
    )
    (then
     (block
      (if
       (i32.lt_s
        (i32.const 0)
        (local.get $2)
       )
       (then
        (local.set $1
         (call $$wasm:js-string_concat
          (local.get $1)
          (global.get $$string_2254)
         )
        )
       )
       (else
        (nop)
       )
      )
      (local.set $4
       (array.get $0
        (local.get $0)
        (local.get $2)
       )
      )
      (local.set $1
       (call $$wasm:js-string_concat
        (local.get $1)
        (call $"$getString_[$i]->[$s]"
         (local.get $4)
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
     )
     (br $loop_13)
    )
   )
  )
  (local.set $1
   (call $$wasm:js-string_concat
    (local.get $1)
    (global.get $$string_2311)
   )
  )
  (return
   (local.get $1)
  )
 )
 (func $"$eq_[{{$i}},{{$i}}]->[$b]" (type $3) (param $0 (ref $1)) (param $1 (ref $1)) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 (ref $0))
  (local $7 (ref $0))
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (local.set $4
   (array.len
    (local.get $1)
   )
  )
  (if
   (i32.eq
    (local.get $3)
    (local.get $4)
   )
   (then
    (local.set $2
     (i32.const 1)
    )
    (local.set $5
     (i32.const 0)
    )
    (loop $loop_19
     (if
      (i32.and
       (local.get $2)
       (i32.lt_s
        (local.get $5)
        (local.get $3)
       )
      )
      (then
       (block
        (local.set $6
         (array.get $1
          (local.get $0)
          (local.get $5)
         )
        )
        (local.set $7
         (array.get $1
          (local.get $1)
          (local.get $5)
         )
        )
        (if
         (call $"$ne_[{$i},{$i}]->[$b]"
          (local.get $6)
          (local.get $7)
         )
         (then
          (local.set $2
           (i32.const 0)
          )
         )
         (else
          (nop)
         )
        )
        (local.set $5
         (i32.add
          (local.get $5)
          (i32.const 1)
         )
        )
       )
       (br $loop_19)
      )
     )
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $2)
  )
 )
 (func $"$ne_[{$i},{$i}]->[$b]" (type $4) (param $0 (ref $0)) (param $1 (ref $0)) (result i32)
  (return
   (i32.xor
    (call $"$eq_[{$i},{$i}]->[$b]"
     (local.get $0)
     (local.get $1)
    )
    (i32.const 1)
   )
  )
 )
 (func $"$eq_[{$i},{$i}]->[$b]" (type $4) (param $0 (ref $0)) (param $1 (ref $0)) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local.set $2
   (i32.const 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (local.set $4
   (array.len
    (local.get $1)
   )
  )
  (if
   (i32.eq
    (local.get $3)
    (local.get $4)
   )
   (then
    (local.set $2
     (i32.const 1)
    )
    (local.set $5
     (i32.const 0)
    )
    (loop $loop_25
     (if
      (i32.and
       (local.get $2)
       (i32.lt_s
        (local.get $5)
        (local.get $3)
       )
      )
      (then
       (block
        (local.set $6
         (array.get $0
          (local.get $0)
          (local.get $5)
         )
        )
        (local.set $7
         (array.get $0
          (local.get $1)
          (local.get $5)
         )
        )
        (if
         (i32.ne
          (local.get $6)
          (local.get $7)
         )
         (then
          (local.set $2
           (i32.const 0)
          )
         )
         (else
          (nop)
         )
        )
        (local.set $5
         (i32.add
          (local.get $5)
          (i32.const 1)
         )
        )
       )
       (br $loop_25)
      )
     )
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $2)
  )
 )
 (func $"$ne_[{{$i}},{{$i}}]->[$b]" (type $3) (param $0 (ref $1)) (param $1 (ref $1)) (result i32)
  (return
   (i32.xor
    (call $"$eq_[{{$i}},{{$i}}]->[$b]"
     (local.get $0)
     (local.get $1)
    )
    (i32.const 1)
   )
  )
 )
 (func $"$join_[{{$i}},{{$i}}]->[{{$i}}]" (type $9) (param $0 (ref $1)) (param $1 (ref $1)) (result (ref $1))
  (local $2 (ref $1))
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 (ref $0))
  (local $7 (ref $0))
  (local.set $2
   (array.new_fixed $1 0)
  )
  (local.set $3
   (array.len
    (local.get $0)
   )
  )
  (local.set $4
   (array.len
    (local.get $1)
   )
  )
  (local.set $5
   (i32.add
    (local.get $3)
    (local.get $4)
   )
  )
  (if
   (i32.lt_s
    (i32.const 0)
    (local.get $5)
   )
   (then
    (if
     (i32.lt_s
      (i32.const 0)
      (local.get $3)
     )
     (then
      (local.set $6
       (array.get $1
        (local.get $0)
        (i32.const 0)
       )
      )
      (local.set $2
       (array.new $1
        (local.get $6)
        (local.get $5)
       )
      )
     )
     (else
      (local.set $7
       (array.get $1
        (local.get $1)
        (i32.const 0)
       )
      )
      (local.set $2
       (array.new $1
        (local.get $7)
        (local.get $5)
       )
      )
     )
    )
    (array.copy $1 $1
     (local.get $2)
     (i32.const 0)
     (local.get $0)
     (i32.const 0)
     (local.get $3)
    )
    (array.copy $1 $1
     (local.get $2)
     (local.get $3)
     (local.get $1)
     (i32.const 0)
     (local.get $4)
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $2)
  )
 )
 (func $"$slice_[{$i},$i,$i]->[{$i}]" (type $10) (param $0 (ref $0)) (param $1 i32) (param $2 i32) (result (ref $0))
  (local $3 (ref $0))
  (local $4 i32)
  (local $5 i32)
  (local.set $3
   (array.new_fixed $0 0)
  )
  (local.set $4
   (array.len
    (local.get $0)
   )
  )
  (if
   (i32.and
    (i32.and
     (i32.le_s
      (i32.const 0)
      (local.get $1)
     )
     (i32.lt_s
      (local.get $1)
      (local.get $4)
     )
    )
    (i32.lt_s
     (local.get $1)
     (local.get $2)
    )
   )
   (then
    (if
     (i32.lt_s
      (local.get $4)
      (local.get $2)
     )
     (then
      (local.set $2
       (local.get $4)
      )
     )
     (else
      (nop)
     )
    )
    (local.set $4
     (i32.sub
      (local.get $2)
      (local.get $1)
     )
    )
    (local.set $5
     (array.get $0
      (local.get $0)
      (local.get $1)
     )
    )
    (local.set $3
     (array.new $0
      (local.get $5)
      (local.get $4)
     )
    )
    (array.copy $0 $0
     (local.get $3)
     (i32.const 0)
     (local.get $0)
     (local.get $1)
     (local.get $4)
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $3)
  )
 )
 (func $"show_[{$i}]->[]" (type $11) (param $0 (ref $0))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"$getString_[{$i}]->[$s]"
     (local.get $0)
    )
   )
  )
 )
 (func $"$slice_[{{$i}},$i,$i]->[{{$i}}]" (type $12) (param $0 (ref $1)) (param $1 i32) (param $2 i32) (result (ref $1))
  (local $3 (ref $1))
  (local $4 i32)
  (local $5 (ref $0))
  (local.set $3
   (array.new_fixed $1 0)
  )
  (local.set $4
   (array.len
    (local.get $0)
   )
  )
  (if
   (i32.and
    (i32.and
     (i32.le_s
      (i32.const 0)
      (local.get $1)
     )
     (i32.lt_s
      (local.get $1)
      (local.get $4)
     )
    )
    (i32.lt_s
     (local.get $1)
     (local.get $2)
    )
   )
   (then
    (if
     (i32.lt_s
      (local.get $4)
      (local.get $2)
     )
     (then
      (local.set $2
       (local.get $4)
      )
     )
     (else
      (nop)
     )
    )
    (local.set $4
     (i32.sub
      (local.get $2)
      (local.get $1)
     )
    )
    (local.set $5
     (array.get $1
      (local.get $0)
      (local.get $1)
     )
    )
    (local.set $3
     (array.new $1
      (local.get $5)
      (local.get $4)
     )
    )
    (array.copy $1 $1
     (local.get $3)
     (i32.const 0)
     (local.get $0)
     (local.get $1)
     (local.get $4)
    )
   )
   (else
    (nop)
   )
  )
  (return
   (local.get $3)
  )
 )
)
*/
let buffer_4 = (new Uint8Array([0,97,115,109,1,0,0,0,1,140,1,22,94,127,1,94,100,0,1,96,1,127,1,100,111,96,2,100,1,100,1,1,127,96,2,100,0,100,0,1,127,96,0,0,96,1,100,1,0,96,1,100,1,1,100,111,96,1,100,0,1,100,111,96,2,100,1,100,1,1,100,1,96,3,100,0,127,127,1,100,0,96,1,100,0,0,96,3,100,1,127,127,1,100,1,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,154,4,22,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,13,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,14,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,15,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,16,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,17,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,18,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,19,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,20,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,21,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,1,123,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,123,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,125,3,100,111,0,8,36,115,116,114,105,110,103,115,1,125,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,13,12,5,6,7,8,3,4,4,3,9,10,11,12,7,171,2,12,1,102,0,12,17,115,104,111,119,95,91,123,123,36,105,125,125,93,45,62,91,93,0,13,25,36,103,101,116,83,116,114,105,110,103,95,91,123,123,36,105,125,125,93,45,62,91,36,115,93,0,14,23,36,103,101,116,83,116,114,105,110,103,95,91,123,36,105,125,93,45,62,91,36,115,93,0,15,25,36,101,113,95,91,123,123,36,105,125,125,44,123,123,36,105,125,125,93,45,62,91,36,98,93,0,16,21,36,110,101,95,91,123,36,105,125,44,123,36,105,125,93,45,62,91,36,98,93,0,17,21,36,101,113,95,91,123,36,105,125,44,123,36,105,125,93,45,62,91,36,98,93,0,18,25,36,110,101,95,91,123,123,36,105,125,125,44,123,123,36,105,125,125,93,45,62,91,36,98,93,0,19,31,36,106,111,105,110,95,91,123,123,36,105,125,125,44,123,123,36,105,125,125,93,45,62,91,123,123,36,105,125,125,93,0,20,27,36,115,108,105,99,101,95,91,123,36,105,125,44,36,105,44,36,105,93,45,62,91,123,36,105,125,93,0,21,15,115,104,111,119,95,91,123,36,105,125,93,45,62,91,93,0,22,31,36,115,108,105,99,101,95,91,123,123,36,105,125,125,44,36,105,44,36,105,93,45,62,91,123,123,36,105,125,125,93,0,23,9,6,1,0,35,7,11,0,10,159,7,12,174,1,2,2,100,1,1,100,0,65,0,65,5,107,251,8,0,1,65,3,65,0,65,1,107,251,8,0,2,65,1,65,0,65,3,107,251,8,0,2,65,5,251,8,0,1,251,8,1,4,33,0,65,0,65,5,107,251,8,0,1,65,3,65,0,65,1,107,251,8,0,2,65,1,65,3,251,8,0,2,65,5,251,8,0,1,251,8,1,4,33,1,32,0,16,13,32,1,16,13,32,0,32,1,16,16,16,5,16,7,32,0,32,1,16,19,16,5,16,7,32,0,32,1,16,20,16,13,251,8,0,0,33,2,32,2,65,0,65,1,16,21,16,22,32,0,65,1,65,228,0,16,23,16,13,32,1,65,3,65,4,16,23,16,13,32,1,65,4,65,5,16,23,16,13,11,10,0,32,0,16,14,16,6,16,7,11,92,3,1,100,111,1,100,0,2,127,35,1,33,1,65,0,33,3,32,0,251,15,33,4,3,64,32,3,32,4,72,4,64,65,0,32,3,72,4,64,32,1,35,2,16,9,33,1,5,1,11,32,0,32,3,251,11,1,33,2,32,1,32,2,16,15,16,9,33,1,32,3,65,1,106,33,3,12,1,11,11,32,1,35,6,16,9,33,1,32,1,15,11,89,2,1,100,111,3,127,35,3,33,1,65,0,33,2,32,0,251,15,33,3,3,64,32,2,32,3,72,4,64,65,0,32,2,72,4,64,32,1,35,4,16,9,33,1,5,1,11,32,0,32,2,251,11,0,33,4,32,1,32,4,16,0,16,9,33,1,32,2,65,1,106,33,2,12,1,11,11,32,1,35,5,16,9,33,1,32,1,15,11,100,2,4,127,2,100,0,65,0,33,2,32,0,251,15,33,3,32,1,251,15,33,4,32,3,32,4,70,4,64,65,1,33,2,65,0,33,5,3,64,32,2,32,5,32,3,72,113,4,64,32,0,32,5,251,11,1,33,6,32,1,32,5,251,11,1,33,7,32,6,32,7,16,17,4,64,65,0,33,2,5,1,11,32,5,65,1,106,33,5,12,1,11,11,5,1,11,32,2,15,11,12,0,32,0,32,1,16,18,65,1,115,15,11,96,1,6,127,65,0,33,2,32,0,251,15,33,3,32,1,251,15,33,4,32,3,32,4,70,4,64,65,1,33,2,65,0,33,5,3,64,32,2,32,5,32,3,72,113,4,64,32,0,32,5,251,11,0,33,6,32,1,32,5,251,11,0,33,7,32,6,32,7,71,4,64,65,0,33,2,5,1,11,32,5,65,1,106,33,5,12,1,11,11,5,1,11,32,2,15,11,12,0,32,0,32,1,16,16,65,1,115,15,11,121,3,1,100,1,2,100,0,3,127,251,8,1,0,33,2,32,0,251,15,33,5,32,1,251,15,33,6,32,5,32,6,106,33,7,65,0,32,7,72,4,64,65,0,32,5,72,4,64,32,0,65,0,251,11,1,33,3,32,3,32,7,251,6,1,33,2,5,32,1,65,0,251,11,1,33,4,32,4,32,7,251,6,1,33,2,11,32,2,65,0,32,0,65,0,32,5,251,17,1,1,32,2,32,5,32,1,65,0,32,6,251,17,1,1,5,1,11,32,2,15,11,97,2,1,100,0,2,127,251,8,0,0,33,3,32,0,251,15,33,4,65,0,32,1,76,32,1,32,4,72,113,32,1,32,2,72,113,4,64,32,4,32,2,72,4,64,32,4,33,2,5,1,11,32,2,32,1,107,33,4,32,0,32,1,251,11,0,33,5,32,5,32,4,251,6,0,33,3,32,3,65,0,32,0,32,1,32,4,251,17,0,0,5,1,11,32,3,15,11,10,0,32,0,16,15,16,6,16,7,11,100,3,1,100,1,1,100,0,1,127,251,8,1,0,33,3,32,0,251,15,33,5,65,0,32,1,76,32,1,32,5,72,113,32,1,32,2,72,113,4,64,32,5,32,2,72,4,64,32,5,33,2,5,1,11,32,2,32,1,107,33,5,32,0,32,1,251,11,1,33,4,32,4,32,5,251,6,1,33,3,32,3,65,0,32,0,32,1,32,5,251,17,1,1,5,1,11,32,3,15,11])).buffer;
let module_4 = new WebAssembly.Module(buffer_4, {
    builtins: ['js-string'],
    importedStringConstants: '$strings'
});
let imports_4 = {
    '$objects': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32',
            mutable: false
        }, 2)
    },
    '$functions': functions
};
let instance_4 = new WebAssembly.Instance(module_4, imports_4);
let exports_4 = instance_4.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/10/file0.sb */
/*
(module
 (type $0 (func (param i32 i32) (result (ref extern))))
 (type $1 (func (param i32) (result i32)))
 (type $2 (func (param i32) (result (ref extern))))
 (type $3 (func (param f32 f32) (result (ref extern))))
 (type $4 (array (mut i32)))
 (type $5 (func))
 (type $6 (array (mut (ref extern))))
 (type $7 (func (param (ref extern) i32) (result (ref extern))))
 (type $8 (func (param i32 f32 f32)))
 (type $9 (func (param i32 i32)))
 (type $10 (func (param f32) (result i32)))
 (type $11 (func (param i32) (result (ref $6))))
 (type $12 (func (result f64)))
 (type $13 (func (result i32)))
 (type $14 (func (param i32) (result (ref $4))))
 (type $15 (func (param i32)))
 (type $16 (func (param i64) (result (ref extern))))
 (type $17 (func (param f32) (result (ref extern))))
 (type $18 (func (param f64) (result (ref extern))))
 (type $19 (func (param (ref extern)) (result (ref extern))))
 (type $20 (func (param (ref extern))))
 (type $21 (func (param externref) (result i32)))
 (type $22 (func (param externref externref) (result (ref extern))))
 (type $23 (func (param externref i32 i32) (result (ref extern))))
 (type $24 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "5 + 5" (global $$string_200 (ref extern)))
 (import "$strings" " + " (global $$string_326 (ref extern)))
 (import "$strings" " = " (global $$string_337 (ref extern)))
 (import "$strings" " - " (global $$string_412 (ref extern)))
 (import "$strings" " = " (global $$string_423 (ref extern)))
 (import "$strings" "f" (global $$string_517 (ref extern)))
 (import "$strings" "g" (global $$string_542 (ref extern)))
 (import "$strings" "h_" (global $$string_561 (ref extern)))
 (import "$strings" "h_$s" (global $$string_587 (ref extern)))
 (import "$strings" " = " (global $$string_599 (ref extern)))
 (import "$strings" "Hello, World!" (global $$string_650 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "f" (func $F-1 (type $3) (param f32 f32) (result (ref extern))))
 (import "file1" "g" (func $G-1 (type $1) (param i32) (result i32)))
 (import "file2" "f" (func $F-2 (type $3) (param f32 f32) (result (ref extern))))
 (import "file2" "g" (func $G-2 (type $8) (param i32 f32 f32)))
 (import "file3" "f" (func $F-3 (type $5)))
 (import "file4" "f" (func $F-4 (type $5)))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $16) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $17) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $18) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $2) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $19) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $20) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $21) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $22) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $23) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $24) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset) $g $F-1 $F-2 $"f_[[$i,$i]->[$s]]->[]" $"f_[$i,$i]->[$s]" $"f_[$i,[$i,$i]->[$s]]->[]" $"k_[$s,$i]->[$s]" $"k_[]->[$fd]" $m)
 (export "start" (func $start))
 (export "f_[$i,[$i,$i]->[$s]]->[]" (func $"f_[$i,[$i,$i]->[$s]]->[]"))
 (export "f_[$i,$i]->[$s]" (func $"f_[$i,$i]->[$s]"))
 (export "g" (func $g))
 (export "h" (func $h))
 (export "i_[$i]->[$s]" (func $"i_[$i]->[$s]"))
 (export "i_[$f]->[[$s,$i]->[$s]]" (func $"i_[$f]->[[$s,$i]->[$s]]"))
 (export "j" (func $j))
 (export "k_[]->[$fd]" (func $"k_[]->[$fd]"))
 (export "k_[$s,$i]->[$s]" (func $"k_[$s,$i]->[$s]"))
 (export "l_[]->[[$i]->[$b]]" (func $"l_[]->[[$i]->[$b]]"))
 (export "l_[$i]->[$s]" (func $"l_[$i]->[$s]"))
 (export "l_[$b]->[{[$i]->[$b]}]" (func $"l_[$b]->[{[$i]->[$b]}]"))
 (export "m" (func $m))
 (export "f_[[$i,$i]->[$s]]->[]" (func $"f_[[$i,$i]->[$s]]->[]"))
 (func $start (type $5)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 (ref extern))
  (call $"f_[$i,[$i,$i]->[$s]]->[]"
   (i32.const 1)
   (i32.add
    (global.get $$tableOffset)
    (i32.const 0)
   )
  )
  (call $"f_[[$i,$i]->[$s]]->[]"
   (i32.add
    (global.get $$tableOffset)
    (i32.const 0)
   )
  )
  (local.set $0
   (i32.const 0)
  )
  (local.set $1
   (call $h
    (local.get $0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $0)
     (local.get $0)
     (i32.add
      (local.get $0)
      (i32.const 1)
     )
     (local.get $1)
    )
   )
  )
  (local.set $1
   (call $h
    (i32.add
     (local.get $0)
     (i32.const 2)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $0)
     (i32.add
      (local.get $0)
      (i32.const 3)
     )
     (i32.add
      (local.get $0)
      (i32.const 4)
     )
     (local.get $1)
    )
   )
  )
  (local.set $2
   (call $G-1
    (local.get $0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $3)
     (f32.const 100)
     (f32.const 300)
     (local.get $2)
    )
   )
  )
  (local.set $2
   (call $G-1
    (i32.const 1)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $3)
     (f32.const 200)
     (f32.const 400)
     (local.get $2)
    )
   )
  )
  (call $G-2
   (i32.add
    (global.get $$tableOffset)
    (i32.const 1)
   )
   (f32.const 5)
   (f32.const 5)
  )
  (call $G-2
   (i32.add
    (global.get $$tableOffset)
    (i32.const 2)
   )
   (f32.const 25)
   (f32.const 5)
  )
  (local.set $3
   (call_indirect $$table (type $7)
    (global.get $$string_200)
    (i32.const 10)
    (call $"i_[$f]->[[$s,$i]->[$s]]"
     (f32.const 3.5)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $3)
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call_indirect $$table (type $1)
     (i32.const 0)
     (call $"l_[]->[[$i]->[$b]]")
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_substring
     (call $"l_[$i]->[$s]"
      (i32.const 10)
     )
     (i32.const 5)
     (i32.add
      (i32.const 5)
      (i32.const 1)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call_indirect $$table (type $1)
     (i32.const 20)
     (array.get $4
      (call $"l_[$b]->[{[$i]->[$b]}]"
       (i32.const 0)
      )
      (i32.const 0)
     )
    )
   )
  )
  (call $F-3)
  (call $F-4)
 )
 (func $"f_[$i,[$i,$i]->[$s]]->[]" (type $9) (param $0 i32) (param $1 i32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $0)
     (local.get $0)
     (local.get $0)
     (local.get $1)
    )
   )
  )
 )
 (func $"f_[$i,$i]->[$s]" (type $0) (param $0 i32) (param $1 i32) (result (ref extern))
  (return
   (call $$wasm:js-string_concat
    (call $$wasm:js-string_concat
     (call $$wasm:js-string_concat
      (call $"$getString_[$i]->[$s]"
       (local.get $0)
      )
      (global.get $$string_326)
     )
     (call $$wasm:js-string_concat
      (call $"$getString_[$i]->[$s]"
       (local.get $1)
      )
      (global.get $$string_337)
     )
    )
    (call $"$getString_[$i]->[$s]"
     (i32.add
      (local.get $0)
      (local.get $1)
     )
    )
   )
  )
 )
 (func $g (type $0) (param $0 i32) (param $1 i32) (result (ref extern))
  (return
   (call $$wasm:js-string_concat
    (call $$wasm:js-string_concat
     (call $$wasm:js-string_concat
      (call $"$getString_[$i]->[$s]"
       (local.get $0)
      )
      (global.get $$string_412)
     )
     (call $$wasm:js-string_concat
      (call $"$getString_[$i]->[$s]"
       (local.get $1)
      )
      (global.get $$string_423)
     )
    )
    (call $"$getString_[$i]->[$s]"
     (i32.sub
      (local.get $0)
      (local.get $1)
     )
    )
   )
  )
 )
 (func $h (type $1) (param $0 i32) (result i32)
  (if
   (i32.eq
    (local.get $0)
    (i32.const 0)
   )
   (then
    (return
     (i32.add
      (global.get $$tableOffset)
      (i32.const 4)
     )
    )
   )
   (else
    (return
     (i32.add
      (global.get $$tableOffset)
      (i32.const 0)
     )
    )
   )
  )
 )
 (func $"i_[$i]->[$s]" (type $2) (param $0 i32) (result (ref extern))
  (return
   (global.get $$string_empty)
  )
 )
 (func $"i_[$f]->[[$s,$i]->[$s]]" (type $10) (param $0 f32) (result i32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_517)
   )
  )
  (return
   (i32.add
    (global.get $$tableOffset)
    (i32.const 6)
   )
  )
 )
 (func $j (type $11) (param $0 i32) (result (ref $6))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_542)
   )
  )
  (return
   (array.new_fixed $6 1
    (global.get $$string_empty)
   )
  )
 )
 (func $"k_[]->[$fd]" (type $12) (result f64)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_561)
   )
  )
  (return
   (f64.const 0)
  )
 )
 (func $"k_[$s,$i]->[$s]" (type $7) (param $0 (ref extern)) (param $1 i32) (result (ref extern))
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_587)
   )
  )
  (return
   (call $$wasm:js-string_concat
    (call $$wasm:js-string_concat
     (call $"$getString_[$s]->[$s]"
      (local.get $0)
     )
     (global.get $$string_599)
    )
    (call $"$getString_[$i]->[$s]"
     (local.get $1)
    )
   )
  )
 )
 (func $"l_[]->[[$i]->[$b]]" (type $13) (result i32)
  (return
   (i32.add
    (global.get $$tableOffset)
    (i32.const 8)
   )
  )
 )
 (func $"l_[$i]->[$s]" (type $2) (param $0 i32) (result (ref extern))
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $0)
   )
  )
  (return
   (global.get $$string_650)
  )
 )
 (func $"l_[$b]->[{[$i]->[$b]}]" (type $14) (param $0 i32) (result (ref $4))
  (return
   (array.new_fixed $4 1
    (i32.add
     (global.get $$tableOffset)
     (i32.const 8)
    )
   )
  )
 )
 (func $m (type $1) (param $0 i32) (result i32)
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (local.get $0)
   )
  )
  (return
   (i32.const 1)
  )
 )
 (func $"f_[[$i,$i]->[$s]]->[]" (type $15) (param $0 i32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call_indirect $$table (type $0)
     (i32.const 1)
     (i32.const 2)
     (local.get $0)
    )
   )
  )
 )
)
*/
let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,140,1,25,96,2,127,127,1,100,111,96,1,127,1,127,96,1,127,1,100,111,96,2,125,125,1,100,111,94,127,1,96,0,0,94,100,111,1,96,2,100,111,127,1,100,111,96,3,127,125,125,0,96,2,127,127,0,96,1,125,1,127,96,1,127,1,100,6,96,0,1,124,96,0,1,127,96,1,127,1,100,4,96,1,127,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,189,5,33,5,102,105,108,101,49,1,102,0,3,5,102,105,108,101,49,1,103,0,1,5,102,105,108,101,50,1,102,0,3,5,102,105,108,101,50,1,103,0,8,5,102,105,108,101,51,1,102,0,5,5,102,105,108,101,52,1,102,0,5,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,16,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,17,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,18,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,19,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,20,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,21,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,22,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,23,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,24,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,5,53,32,43,32,53,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,43,32,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,61,32,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,45,32,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,61,32,3,100,111,0,8,36,115,116,114,105,110,103,115,1,102,3,100,111,0,8,36,115,116,114,105,110,103,115,1,103,3,100,111,0,8,36,115,116,114,105,110,103,115,2,104,95,3,100,111,0,8,36,115,116,114,105,110,103,115,4,104,95,36,115,3,100,111,0,8,36,115,116,114,105,110,103,115,3,32,61,32,3,100,111,0,8,36,115,116,114,105,110,103,115,13,72,101,108,108,111,44,32,87,111,114,108,100,33,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,16,15,5,9,0,0,1,2,10,11,12,7,13,2,14,1,15,7,228,1,15,5,115,116,97,114,116,0,18,24,102,95,91,36,105,44,91,36,105,44,36,105,93,45,62,91,36,115,93,93,45,62,91,93,0,19,15,102,95,91,36,105,44,36,105,93,45,62,91,36,115,93,0,20,1,103,0,21,1,104,0,22,12,105,95,91,36,105,93,45,62,91,36,115,93,0,23,23,105,95,91,36,102,93,45,62,91,91,36,115,44,36,105,93,45,62,91,36,115,93,93,0,24,1,106,0,25,11,107,95,91,93,45,62,91,36,102,100,93,0,26,15,107,95,91,36,115,44,36,105,93,45,62,91,36,115,93,0,27,18,108,95,91,93,45,62,91,91,36,105,93,45,62,91,36,98,93,93,0,28,12,108,95,91,36,105,93,45,62,91,36,115,93,0,29,22,108,95,91,36,98,93,45,62,91,123,91,36,105,93,45,62,91,36,98,93,125,93,0,30,1,109,0,31,21,102,95,91,91,36,105,44,36,105,93,45,62,91,36,115,93,93,45,62,91,93,0,32,9,15,1,0,35,12,11,9,21,0,2,32,20,19,27,26,31,10,225,3,15,233,1,2,3,127,1,100,111,65,1,35,12,65,0,106,16,19,35,12,65,0,106,16,32,65,0,33,0,32,0,16,22,33,1,32,0,32,0,65,1,106,32,1,17,0,0,16,12,16,13,32,0,65,2,106,16,22,33,1,32,0,65,3,106,32,0,65,4,106,32,1,17,0,0,16,12,16,13,32,0,16,1,33,2,67,0,0,200,66,67,0,0,150,67,32,2,17,3,0,16,12,16,13,65,1,16,1,33,2,67,0,0,72,67,67,0,0,200,67,32,2,17,3,0,16,12,16,13,35,12,65,1,106,67,0,0,160,64,67,0,0,160,64,16,3,35,12,65,2,106,67,0,0,200,65,67,0,0,160,64,16,3,35,1,65,10,67,0,0,96,64,16,24,17,7,0,33,3,32,3,16,12,16,13,65,0,16,28,17,1,0,16,11,16,13,65,10,16,29,65,5,65,5,65,1,106,16,16,16,12,16,13,65,20,65,0,16,30,65,0,251,11,4,17,1,0,16,11,16,13,16,4,16,5,11,15,0,32,0,32,0,32,1,17,0,0,16,12,16,13,11,30,0,32,0,16,6,35,2,16,15,32,1,16,6,35,3,16,15,16,15,32,0,32,1,106,16,6,16,15,15,11,30,0,32,0,16,6,35,4,16,15,32,1,16,6,35,5,16,15,16,15,32,0,32,1,107,16,6,16,15,15,11,24,0,32,0,65,0,70,4,64,35,12,65,4,106,15,5,35,12,65,0,106,15,11,0,11,5,0,35,0,15,11,14,0,35,6,16,12,16,13,35,12,65,6,106,15,11,15,0,35,7,16,12,16,13,35,0,251,8,6,1,15,11,18,0,35,8,16,12,16,13,68,0,0,0,0,0,0,0,0,15,11,23,0,35,9,16,12,16,13,32,0,16,12,35,10,16,15,32,1,16,6,16,15,15,11,8,0,35,12,65,8,106,15,11,11,0,32,0,16,6,16,13,35,11,15,11,12,0,35,12,65,8,106,251,8,4,1,15,11,11,0,32,0,16,6,16,13,65,1,15,11,15,0,65,1,65,2,32,0,17,0,0,16,12,16,13,11])).buffer;
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
        }, 2)
    },
    '$functions': functions,
    'file1': {
        'f': exports_1['f'],
        'g': exports_1['g']
    },
    'file2': {
        'f': exports_2['f'],
        'g': exports_2['g']
    },
    'file3': {
        'f': exports_3['f']
    },
    'file4': {
        'f': exports_4['f']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { memory, exports_0 as 'exports' };