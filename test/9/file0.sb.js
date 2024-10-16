let globalObjects = {
    '$memory': new WebAssembly.Memory({
        initial: 0,
        maximum: 1
    }),
    '$table': new WebAssembly.Table({
        element: 'anyfunc',
        initial: 7
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/9/file0.sb */
/*
(module
 (type $0 (array (mut i32)))
 (type $1 (array (mut (ref $0))))
 (type $2 (array (mut f32)))
 (type $3 (func (param (ref extern))))
 (type $4 (func (param (ref $2))))
 (type $5 (func (param i32) (result (ref extern))))
 (type $6 (array (mut (ref $1))))
 (type $7 (func))
 (type $8 (array (mut i64)))
 (type $9 (array (mut (ref $8))))
 (type $10 (func (param (ref $0) (ref $9))))
 (type $11 (func (param i32 (ref extern))))
 (type $12 (func (param i64) (result (ref extern))))
 (type $13 (func (param f32) (result (ref extern))))
 (type $14 (func (param f64) (result (ref extern))))
 (type $15 (func (param (ref extern)) (result (ref extern))))
 (type $16 (func (param externref) (result i32)))
 (type $17 (func (param externref externref) (result (ref extern))))
 (type $18 (func (param externref i32 i32) (result (ref extern))))
 (type $19 (func (param externref externref) (result i32)))
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localObjects" "$tableOffset" (global $$tableOffset i32))
 (import "$globalFunctions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $5) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $5) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $12) (param i64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $13) (param f32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $14) (param f64) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $5) (param i32) (result (ref extern))))
 (import "$globalFunctions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $15) (param (ref extern)) (result (ref extern))))
 (import "$globalFunctions" "$show" (func $$show (type $3) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $16) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $17) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $18) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $19) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset) $h $"f_[$s]->[]" $"f_[{$f}]->[]" $"g_[{$i},{{$id}}]->[]" $"g_[{$f}]->[]" $"g_[[$i,{$fd}]->[{$s}],$s]->[]" $"g_[$s]->[]")
 (export "start" (func $start))
 (export "f_[$s]->[]" (func $"f_[$s]->[]"))
 (export "f_[{$f}]->[]" (func $"f_[{$f}]->[]"))
 (export "g_[{$i},{{$id}}]->[]" (func $"g_[{$i},{{$id}}]->[]"))
 (export "g_[{$f}]->[]" (func $"g_[{$f}]->[]"))
 (export "g_[[$i,{$fd}]->[{$s}],$s]->[]" (func $"g_[[$i,{$fd}]->[{$s}],$s]->[]"))
 (export "g_[$s]->[]" (func $"g_[$s]->[]"))
 (export "h" (func $h))
 (func $start (type $7)
  (local $0 (ref $0))
  (local $1 (ref $0))
  (local $2 (ref $1))
  (local $3 (ref $1))
  (local $4 f32)
  (local $5 f32)
  (local $6 (ref $2))
  (local $7 (ref $0))
  (local $8 (ref $0))
  (local $9 (ref $6))
  (local.set $0
   (array.new_fixed $0 0)
  )
  (local.set $1
   (array.new_fixed $0 4
    (i32.const 0)
    (i32.const 1)
    (i32.const 2)
    (i32.const 3)
   )
  )
  (local.set $2
   (array.new_fixed $1 4
    (local.get $0)
    (local.get $1)
    (array.new_fixed $0 0)
    (array.new_fixed $0 1
     (i32.const 2)
    )
   )
  )
  (local.set $3
   (local.get $2)
  )
  (call $"f_[{$f}]->[]"
   (array.new_fixed $2 0)
  )
  (local.set $4
   (f32.const 1)
  )
  (local.set $5
   (f32.const 1.5)
  )
  (local.set $6
   (array.new_fixed $2 3
    (f32.add
     (f32.mul
      (f32.const 0)
      (local.get $4)
     )
     (local.get $5)
    )
    (f32.add
     (f32.mul
      (f32.const 1)
      (local.get $4)
     )
     (local.get $5)
    )
    (f32.add
     (f32.mul
      (f32.const 2)
      (local.get $4)
     )
     (local.get $5)
    )
   )
  )
  (call $"f_[{$f}]->[]"
   (local.get $6)
  )
  (local.set $7
   (array.new_fixed $0 1
    (i32.add
     (global.get $$tableOffset)
     (i32.const 0)
    )
   )
  )
  (local.set $7
   (array.new_fixed $0 1
    (i32.add
     (global.get $$tableOffset)
     (i32.const 2)
    )
   )
  )
  (local.set $7
   (array.new_fixed $0 1
    (i32.add
     (global.get $$tableOffset)
     (i32.const 4)
    )
   )
  )
  (local.set $7
   (array.new_fixed $0 0)
  )
  (local.set $8
   (array.new_fixed $0 3
    (i32.add
     (global.get $$tableOffset)
     (i32.const 2)
    )
    (i32.add
     (global.get $$tableOffset)
     (i32.const 4)
    )
    (i32.add
     (global.get $$tableOffset)
     (i32.const 0)
    )
   )
  )
  (local.set $9
   (array.new_fixed $6 4
    (array.new_fixed $1 1
     (array.new_fixed $0 1
      (i32.add
       (global.get $$tableOffset)
       (i32.const 1)
      )
     )
    )
    (array.new_fixed $1 0)
    (array.new_fixed $1 0)
    (array.new_fixed $1 3
     (array.new_fixed $0 1
      (i32.add
       (global.get $$tableOffset)
       (i32.const 6)
      )
     )
     (array.new_fixed $0 0)
     (array.new_fixed $0 2
      (i32.add
       (global.get $$tableOffset)
       (i32.const 6)
      )
      (i32.add
       (global.get $$tableOffset)
       (i32.const 1)
      )
     )
    )
   )
  )
 )
 (func $"f_[$s]->[]" (type $3) (param $0 (ref extern))
  (nop)
 )
 (func $"f_[{$f}]->[]" (type $4) (param $0 (ref $2))
  (nop)
 )
 (func $"g_[{$i},{{$id}}]->[]" (type $10) (param $0 (ref $0)) (param $1 (ref $9))
  (nop)
 )
 (func $"g_[{$f}]->[]" (type $4) (param $0 (ref $2))
  (nop)
 )
 (func $"g_[[$i,{$fd}]->[{$s}],$s]->[]" (type $11) (param $0 i32) (param $1 (ref extern))
  (nop)
 )
 (func $"g_[$s]->[]" (type $3) (param $0 (ref extern))
  (nop)
 )
 (func $h (type $4) (param $0 (ref $2))
  (nop)
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,105,20,94,127,1,94,100,0,1,94,125,1,96,1,100,111,0,96,1,100,2,0,96,1,127,1,100,111,94,100,1,1,96,0,0,94,126,1,94,100,8,1,96,2,100,0,100,9,0,96,2,127,100,111,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,146,4,16,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,12,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,13,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,14,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,15,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,3,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,16,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,17,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,18,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,19,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,9,8,7,3,4,10,4,11,3,4,7,124,8,5,115,116,97,114,116,0,12,10,102,95,91,36,115,93,45,62,91,93,0,13,12,102,95,91,123,36,102,125,93,45,62,91,93,0,14,20,103,95,91,123,36,105,125,44,123,123,36,105,100,125,125,93,45,62,91,93,0,15,12,103,95,91,123,36,102,125,93,45,62,91,93,0,16,29,103,95,91,91,36,105,44,123,36,102,100,125,93,45,62,91,123,36,115,125,93,44,36,115,93,45,62,91,93,0,17,10,103,95,91,36,115,93,45,62,91,93,0,18,1,104,0,19,9,13,1,0,35,1,11,7,19,13,14,15,16,17,18,10,144,2,8,241,1,5,4,100,0,2,100,1,1,100,2,1,100,6,2,125,251,8,0,0,33,0,65,0,65,1,65,2,65,3,251,8,0,4,33,1,32,0,32,1,251,8,0,0,65,2,251,8,0,1,251,8,1,4,33,4,32,4,33,5,251,8,2,0,16,14,67,0,0,128,63,33,8,67,0,0,192,63,33,9,67,0,0,0,0,32,8,148,32,9,146,67,0,0,128,63,32,8,148,32,9,146,67,0,0,0,64,32,8,148,32,9,146,251,8,2,3,33,6,32,6,16,14,35,1,65,0,106,251,8,0,1,33,2,35,1,65,2,106,251,8,0,1,33,2,35,1,65,4,106,251,8,0,1,33,2,251,8,0,0,33,2,35,1,65,2,106,35,1,65,4,106,35,1,65,0,106,251,8,0,3,33,3,35,1,65,1,106,251,8,0,1,251,8,1,1,251,8,1,0,251,8,1,0,35,1,65,6,106,251,8,0,1,251,8,0,0,35,1,65,6,106,35,1,65,1,106,251,8,0,2,251,8,1,3,251,8,6,4,33,7,11,3,0,1,11,3,0,1,11,3,0,1,11,3,0,1,11,3,0,1,11,3,0,1,11,3,0,1,11])).buffer;
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
    '$globalFunctions': globalFunctions
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };