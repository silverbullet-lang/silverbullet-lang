let memory = new WebAssembly.Memory({
    initial: 1,
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/8/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func))
 (type $2 (func (param (ref extern) (ref extern)) (result i32)))
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
 (import "$strings" "\'\"\\\n\r\0b\t\08\0c" (global $$string_3 (ref extern)))
 (import "$strings" "\n !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n" (global $$string_11 (ref extern)))
 (import "$strings" "\n !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n" (global $$string_19 (ref extern)))
 (import "$strings" "Hello, World!" (global $$string_82 (ref extern)))
 (import "$strings" "\n" (global $$string_103 (ref extern)))
 (import "$strings" "How Are You Today?" (global $$string_109 (ref extern)))
 (import "$strings" ".." (global $$string_172 (ref extern)))
 (import "$strings" "0" (global $$string_179 (ref extern)))
 (import "$strings" "0" (global $$string_180 (ref extern)))
 (import "$strings" "A" (global $$string_188 (ref extern)))
 (import "$strings" "a" (global $$string_189 (ref extern)))
 (import "$strings" "\f0\9f\8f\b4\f3\a0\81\a7\f3\a0\81\a2\f3\a0\81\b3\f3\a0\81\a3\f3\a0\81\b4\f3\a0\81\bf" (global $$string_197 (ref extern)))
 (import "$strings" "Hello" (global $$string_202 (ref extern)))
 (import "$strings" ", " (global $$string_207 (ref extern)))
 (import "$strings" "World" (global $$string_210 (ref extern)))
 (import "$strings" "!" (global $$string_215 (ref extern)))
 (import "$strings" "Hello" (global $$string_221 (ref extern)))
 (import "$strings" ", " (global $$string_222 (ref extern)))
 (import "$strings" "World" (global $$string_226 (ref extern)))
 (import "$strings" "!" (global $$string_230 (ref extern)))
 (import "$strings" "let start\n\tshow[" (global $$string_258 (ref extern)))
 (import "$strings" "]\n" (global $$string_254 (ref extern)))
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
 (global $ESCAPE-SEQUENCES (ref extern) (global.get $$string_3))
 (global $ASCII-1 (ref extern) (global.get $$string_11))
 (global $ASCII-2 (ref extern) (global.get $$string_19))
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start (type $1)
  (local $0 (ref extern))
  (local $1 (ref extern))
  (local $2 (ref extern))
  (local $3 (ref extern))
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (i32.eq
     (call $$wasm:js-string_length
      (global.get $ESCAPE-SEQUENCES)
     )
     (i32.sub
      (i32.const 10)
      (i32.const 1)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $ASCII-1)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $ASCII-2)
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (global.get $ASCII-1)
     (global.get $ASCII-1)
    )
   )
  )
  (local.set $0
   (global.get $$string_82)
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (i32.eq
     (call $$wasm:js-string_length
      (local.get $0)
     )
     (i32.const 13)
    )
   )
  )
  (local.set $1
   (global.get $$string_103)
  )
  (local.set $2
   (global.get $$string_109)
  )
  (local.set $3
   (call $$wasm:js-string_concat
    (local.get $0)
    (call $$wasm:js-string_concat
     (local.get $1)
     (local.get $2)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $3)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (call $$wasm:js-string_substring
      (local.get $3)
      (i32.sub
       (call $$wasm:js-string_length
        (local.get $3)
       )
       (i32.const 6)
      )
      (call $$wasm:js-string_length
       (local.get $3)
      )
     )
     (global.get $$string_172)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (global.get $$string_179)
     (global.get $$string_180)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $!=
     (global.get $$string_188)
     (global.get $$string_189)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_197)
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (call $$wasm:js-string_concat
      (call $$wasm:js-string_concat
       (call $"$getString_[$s]->[$s]"
        (global.get $$string_202)
       )
       (global.get $$string_207)
      )
      (call $$wasm:js-string_concat
       (call $"$getString_[$s]->[$s]"
        (global.get $$string_210)
       )
       (global.get $$string_215)
      )
     )
     (call $$wasm:js-string_concat
      (call $$wasm:js-string_concat
       (call $$wasm:js-string_concat
        (global.get $$string_221)
        (global.get $$string_222)
       )
       (global.get $$string_226)
      )
      (global.get $$string_230)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (global.get $$string_258)
     (call $$wasm:js-string_concat
      (call $"$getString_[$i]->[$s]"
       (i32.add
        (i32.add
         (i32.const 10)
         (i32.const 20)
        )
        (i32.const 30)
       )
      )
      (global.get $$string_254)
     )
    )
   )
  )
 )
 (func $!= (type $2) (param $0 (ref extern)) (param $1 (ref extern)) (result i32)
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $1)
   )
  )
  (return
   (i32.xor
    (call $$wasm:js-string_equals
     (local.get $0)
     (local.get $1)
    )
    (i32.const 1)
   )
  )
 )
)
*/
let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,74,12,96,1,127,1,100,111,96,0,0,96,2,100,111,100,111,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,171,8,38,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,9,39,34,92,10,13,11,9,8,12,3,100,111,0,8,36,115,116,114,105,110,103,115,97,10,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,10,3,100,111,0,8,36,115,116,114,105,110,103,115,97,10,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,10,3,100,111,0,8,36,115,116,114,105,110,103,115,13,72,101,108,108,111,44,32,87,111,114,108,100,33,3,100,111,0,8,36,115,116,114,105,110,103,115,1,10,3,100,111,0,8,36,115,116,114,105,110,103,115,18,72,111,119,32,65,114,101,32,89,111,117,32,84,111,100,97,121,63,3,100,111,0,8,36,115,116,114,105,110,103,115,2,46,46,3,100,111,0,8,36,115,116,114,105,110,103,115,1,48,3,100,111,0,8,36,115,116,114,105,110,103,115,1,48,3,100,111,0,8,36,115,116,114,105,110,103,115,1,65,3,100,111,0,8,36,115,116,114,105,110,103,115,1,97,3,100,111,0,8,36,115,116,114,105,110,103,115,28,240,159,143,180,243,160,129,167,243,160,129,162,243,160,129,179,243,160,129,163,243,160,129,180,243,160,129,191,3,100,111,0,8,36,115,116,114,105,110,103,115,5,72,101,108,108,111,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,5,87,111,114,108,100,3,100,111,0,8,36,115,116,114,105,110,103,115,1,33,3,100,111,0,8,36,115,116,114,105,110,103,115,5,72,101,108,108,111,3,100,111,0,8,36,115,116,114,105,110,103,115,2,44,32,3,100,111,0,8,36,115,116,114,105,110,103,115,5,87,111,114,108,100,3,100,111,0,8,36,115,116,114,105,110,103,115,1,33,3,100,111,0,8,36,115,116,114,105,110,103,115,16,108,101,116,32,115,116,97,114,116,10,9,115,104,111,119,91,3,100,111,0,8,36,115,116,114,105,110,103,115,2,93,10,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,3,2,1,2,6,19,3,100,111,0,35,1,11,100,111,0,35,2,11,100,111,0,35,3,11,7,9,1,5,115,116,97,114,116,0,12,9,6,1,0,35,23,11,0,10,219,1,2,191,1,1,4,100,111,35,24,16,8,65,10,65,1,107,70,16,5,16,7,35,25,16,6,16,7,35,26,16,6,16,7,35,25,35,25,16,11,16,5,16,7,35,4,33,0,32,0,16,8,65,13,70,16,5,16,7,35,5,33,1,35,6,33,2,32,0,32,1,32,2,16,9,16,9,33,3,32,3,16,6,16,7,32,3,32,3,16,8,65,6,107,32,3,16,8,16,10,35,7,16,9,16,6,16,7,35,8,35,9,16,11,16,5,16,7,35,10,35,11,16,13,16,5,16,7,35,12,16,6,16,7,35,13,16,6,35,14,16,9,35,15,16,6,35,16,16,9,16,9,35,17,35,18,16,9,35,19,16,9,35,20,16,9,16,11,16,5,16,7,35,21,65,10,65,20,106,65,30,106,16,0,35,22,16,9,16,9,16,6,16,7,11,24,0,32,0,16,6,16,7,32,1,16,6,16,7,32,0,32,1,16,11,65,1,115,15,11])).buffer;
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