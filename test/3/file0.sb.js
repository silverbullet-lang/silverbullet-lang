let memory = new WebAssembly.Memory({
    initial: 0,
    maximum: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 0,
    maximum: 0
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/3/file0.sb */
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
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $2) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $3) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $4) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $5) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $6) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $7) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $8) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $9) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $10) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start (type $1)
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (memory.size)
   )
  )
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (memory.size)
   )
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (memory.grow
     (i32.const 1)
    )
   )
  )
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (memory.size)
   )
  )
  (memory.copy
   (i32.const 0)
   (i32.const 4)
   (i32.const 4)
  )
  (i32.store
   (i32.const 0)
   (i32.const 1)
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.load
     (i32.const 0)
    )
   )
  )
  (i32.store
   (i32.const 4)
   (i32.const 2)
  )
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (i32.load
     (i32.const 4)
    )
   )
  )
  (i32.store
   (i32.const 8)
   (i32.const 1)
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (i32.load
     (i32.const 8)
    )
   )
  )
  (i32.store8
   (i32.const 12)
   (i32.const 4)
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.load8_s
     (i32.const 12)
    )
   )
  )
  (i32.store8
   (i32.const 13)
   (i32.const 5)
  )
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (i32.load8_u
     (i32.const 13)
    )
   )
  )
  (i32.store16
   (i32.const 14)
   (i32.const 6)
  )
  (call $$show
   (call $"$getString_[$i]->[$s]"
    (i32.load16_s
     (i32.const 14)
    )
   )
  )
  (i32.store16
   (i32.const 16)
   (i32.const 7)
  )
  (call $$show
   (call $"$getString_[$iu]->[$s]"
    (i32.load16_u
     (i32.const 16)
    )
   )
  )
  (i64.store
   (i32.const 18)
   (i64.const 8)
  )
  (call $$show
   (call $"$getString_[$id]->[$s]"
    (i64.load
     (i32.const 18)
    )
   )
  )
  (f32.store
   (i32.const 22)
   (f32.const 9.5)
  )
  (call $$show
   (call $"$getString_[$f]->[$s]"
    (f32.load
     (i32.const 22)
    )
   )
  )
  (f64.store
   (i32.const 26)
   (f64.const 10.5)
  )
  (call $$show
   (call $"$getString_[$fd]->[$s]"
    (f64.load
     (i32.const 26)
    )
   )
  )
 )
)
*/
let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,66,11,96,1,127,1,100,111,96,0,0,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,190,3,16,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,6,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,10,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,7,9,1,5,115,116,97,114,116,0,12,9,6,1,0,35,1,11,0,10,211,1,1,208,1,0,63,0,16,1,16,7,63,0,16,1,16,7,65,1,64,0,16,0,16,7,63,0,16,1,16,7,65,0,65,4,65,4,252,10,0,0,65,0,65,1,54,2,0,65,0,40,2,0,16,0,16,7,65,4,65,2,54,2,0,65,4,40,2,0,16,1,16,7,65,8,65,1,54,2,0,65,8,40,2,0,16,5,16,7,65,12,65,4,58,0,0,65,12,44,0,0,16,0,16,7,65,13,65,5,58,0,0,65,13,45,0,0,16,1,16,7,65,14,65,6,59,1,0,65,14,46,1,0,16,0,16,7,65,16,65,7,59,1,0,65,16,47,1,0,16,1,16,7,65,18,66,8,55,3,0,65,18,41,3,0,16,2,16,7,65,22,67,0,0,24,65,56,2,0,65,22,42,2,0,16,3,16,7,65,26,68,0,0,0,0,0,0,37,64,57,3,0,65,26,43,3,0,16,4,16,7,11])).buffer;
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
    '$functions': functions
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { memory, exports_0 as 'exports' };