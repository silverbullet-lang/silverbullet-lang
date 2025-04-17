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
 (import "$globalObjects" "$memory" (memory $$memory 0))
 (import "$globalObjects" "$table" (table $$table 0 funcref))
 (import "$globalStrings" "$string_empty" (global $$string_empty (ref extern)))
 (import "$localStrings" "$string_3" (global $$string_3 (ref extern)))
 (import "$localStrings" "$string_11" (global $$string_11 (ref extern)))
 (import "$localStrings" "$string_19" (global $$string_19 (ref extern)))
 (import "$localStrings" "$string_32" (global $$string_32 (ref extern)))
 (import "$localStrings" "$string_53" (global $$string_53 (ref extern)))
 (import "$localStrings" "$string_59" (global $$string_59 (ref extern)))
 (import "$localStrings" "$string_122" (global $$string_122 (ref extern)))
 (import "$localStrings" "$string_129" (global $$string_129 (ref extern)))
 (import "$localStrings" "$string_130" (global $$string_130 (ref extern)))
 (import "$localStrings" "$string_138" (global $$string_138 (ref extern)))
 (import "$localStrings" "$string_139" (global $$string_139 (ref extern)))
 (import "$localStrings" "$string_177" (global $$string_177 (ref extern)))
 (import "$localStrings" "$string_182" (global $$string_182 (ref extern)))
 (import "$localStrings" "$string_187" (global $$string_187 (ref extern)))
 (import "$localStrings" "$string_190" (global $$string_190 (ref extern)))
 (import "$localStrings" "$string_195" (global $$string_195 (ref extern)))
 (import "$localStrings" "$string_201" (global $$string_201 (ref extern)))
 (import "$localStrings" "$string_202" (global $$string_202 (ref extern)))
 (import "$localStrings" "$string_206" (global $$string_206 (ref extern)))
 (import "$localStrings" "$string_210" (global $$string_210 (ref extern)))
 (import "$localStrings" "$string_238" (global $$string_238 (ref extern)))
 (import "$localStrings" "$string_234" (global $$string_234 (ref extern)))
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
  (local.set $0
   (global.get $$string_32)
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
   (global.get $$string_53)
  )
  (local.set $2
   (global.get $$string_59)
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
     (global.get $$string_122)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (global.get $$string_129)
     (global.get $$string_130)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $!=
     (global.get $$string_138)
     (global.get $$string_139)
    )
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (i32.eq
     (call $$wasm:js-string_length
      (global.get $ESCAPE-SEQUENCES)
     )
     (i32.const 10)
    )
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
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $$string_177)
   )
  )
  (call $$show
   (call $"$getString_[$b]->[$s]"
    (call $$wasm:js-string_equals
     (call $$wasm:js-string_concat
      (call $$wasm:js-string_concat
       (call $"$getString_[$s]->[$s]"
        (global.get $$string_182)
       )
       (global.get $$string_187)
      )
      (call $$wasm:js-string_concat
       (call $"$getString_[$s]->[$s]"
        (global.get $$string_190)
       )
       (global.get $$string_195)
      )
     )
     (call $$wasm:js-string_concat
      (call $$wasm:js-string_concat
       (call $$wasm:js-string_concat
        (global.get $$string_201)
        (global.get $$string_202)
       )
       (global.get $$string_206)
      )
      (global.get $$string_210)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (global.get $$string_238)
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
      (global.get $$string_234)
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

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,74,12,96,1,127,1,100,111,96,0,0,96,2,100,111,100,111,1,127,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,159,9,38,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,3,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,4,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,5,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,6,16,36,103,108,111,98,97,108,70,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,11,14,36,103,108,111,98,97,108,83,116,114,105,110,103,115,13,36,115,116,114,105,110,103,95,101,109,112,116,121,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,9,36,115,116,114,105,110,103,95,51,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,10,36,115,116,114,105,110,103,95,49,49,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,10,36,115,116,114,105,110,103,95,49,57,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,10,36,115,116,114,105,110,103,95,51,50,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,10,36,115,116,114,105,110,103,95,53,51,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,10,36,115,116,114,105,110,103,95,53,57,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,50,50,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,50,57,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,51,48,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,51,56,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,51,57,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,55,55,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,56,50,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,56,55,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,57,48,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,49,57,53,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,48,49,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,48,50,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,48,54,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,49,48,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,51,56,3,100,111,0,13,36,108,111,99,97,108,83,116,114,105,110,103,115,11,36,115,116,114,105,110,103,95,50,51,52,3,100,111,0,13,36,108,111,99,97,108,79,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,14,36,103,108,111,98,97,108,79,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,3,2,1,2,6,19,3,100,111,0,35,1,11,100,111,0,35,2,11,100,111,0,35,3,11,7,9,1,5,115,116,97,114,116,0,12,9,6,1,0,35,23,11,0,10,204,1,2,176,1,1,4,100,111,35,4,33,0,32,0,16,8,65,13,70,16,5,16,7,35,5,33,1,35,6,33,2,32,0,32,1,32,2,16,9,16,9,33,3,32,3,16,6,16,7,32,3,32,3,16,8,65,6,107,32,3,16,8,16,10,35,7,16,9,16,6,16,7,35,8,35,9,16,11,16,5,16,7,35,10,35,11,16,13,16,5,16,7,35,24,16,8,65,10,70,16,5,16,7,35,25,35,25,16,11,16,5,16,7,35,12,16,6,16,7,35,13,16,6,35,14,16,9,35,15,16,6,35,16,16,9,16,9,35,17,35,18,16,9,35,19,16,9,35,20,16,9,16,11,16,5,16,7,35,21,65,10,65,20,106,65,30,106,16,0,35,22,16,9,16,9,16,6,16,7,11,24,0,32,0,16,6,16,7,32,1,16,6,16,7,32,0,32,1,16,11,65,1,115,15,11])).buffer;
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
        '$string_3': "\u0000'\"\\\n\r\u000b\t\b\f",
        '$string_11': "\n !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n",
        '$string_19': "\n !\"#$%&'()*+,-./\u0000123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n",
        '$string_32': "Hello, World!",
        '$string_53': "\n",
        '$string_59': "How Are You Today?",
        '$string_122': "..",
        '$string_129': "0",
        '$string_130': "0",
        '$string_138': "A",
        '$string_139': "a",
        '$string_177': "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        '$string_182': "Hello",
        '$string_187': ", ",
        '$string_190': "World",
        '$string_195': "!",
        '$string_201': "Hello",
        '$string_202': ", ",
        '$string_206': "World",
        '$string_210': "!",
        '$string_238': "let start\n\tshow[",
        '$string_234': "]\n"
    },
    '$globalFunctions': globalFunctions
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };