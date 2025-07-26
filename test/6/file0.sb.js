let memory = new WebAssembly.Memory({
    initial: 64,
    maximum: 64
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

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/6/file1.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param i64) (result (ref extern))))
 (type $2 (func (param f32) (result (ref extern))))
 (type $3 (func (param f64) (result (ref extern))))
 (type $4 (func (param (ref extern)) (result (ref extern))))
 (type $5 (func (param (ref extern))))
 (type $6 (func (param externref) (result i32)))
 (type $7 (func (param externref externref) (result (ref extern))))
 (type $8 (func (param externref i32 i32) (result (ref extern))))
 (type $9 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "#~;\1c$y\'F\07`~224@?x78\1dL.(p?l\t-w^d\18e3yJ/f\12P\17,Z-h\08\\^J\19 }mvPXVW\06\1a\10.;;\15\08b\t($T\04Xtx\1fQhZ=;\r" (global $$string_1 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $1) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $2) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $3) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $4) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $5) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $6) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $7) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $8) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $9) (param externref externref) (result i32)))
 (global $s (mut (ref extern)) (global.get $$string_1))
 (elem $$functions (global.get $$tableOffset))
 (export "s" (global $s))
)
*/
let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,63,10,96,1,127,1,100,111,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,158,4,17,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,1,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,5,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,6,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,9,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,82,35,126,59,28,36,121,39,70,7,96,126,50,50,52,64,63,120,55,56,29,76,46,40,112,63,108,9,45,119,94,100,24,101,51,121,74,47,102,18,80,23,44,90,45,104,8,92,94,74,25,32,125,109,118,80,88,86,87,6,26,16,46,59,59,21,8,98,9,40,36,84,4,88,116,120,31,81,104,90,61,59,13,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,6,7,1,100,111,1,35,1,11,7,5,1,1,115,3,3,9,6,1,0,35,2,11,0])).buffer;
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
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/6/file2.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param (ref extern) (ref extern) (ref extern)) (result (ref extern))))
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
 (import "$strings" "\n\tex\t\n" (global $$string_25 (ref extern)))
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
 (export "getText" (func $getText))
 (func $getText (type $1) (param $0 (ref extern)) (param $1 (ref extern)) (param $2 (ref extern)) (result (ref extern))
  (local $3 (ref extern))
  (local.set $3
   (call $$wasm:js-string_concat
    (global.get $$string_25)
    (global.get $$string_empty)
   )
  )
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
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $2)
   )
  )
  (return
   (local.get $3)
  )
 )
)
*/
let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,74,11,96,1,127,1,100,111,96,3,100,111,100,111,100,111,1,100,111,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,210,3,17,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,6,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,10,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,6,10,9,101,120,9,10,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,7,11,1,7,103,101,116,84,101,120,116,0,12,9,6,1,0,35,2,11,0,10,36,1,34,1,1,100,111,35,1,35,0,16,9,33,3,32,0,16,6,16,7,32,1,16,6,16,7,32,2,16,6,16,7,32,3,15,11])).buffer;
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
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/6/file3.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param i64) (result (ref extern))))
 (type $2 (func (param f32) (result (ref extern))))
 (type $3 (func (param f64) (result (ref extern))))
 (type $4 (func (param (ref extern)) (result (ref extern))))
 (type $5 (func (param (ref extern))))
 (type $6 (func (param externref) (result i32)))
 (type $7 (func (param externref externref) (result (ref extern))))
 (type $8 (func (param externref i32 i32) (result (ref extern))))
 (type $9 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "Hello, World!" (global $$string_1 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $1) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $2) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $3) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $4) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $5) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $6) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $7) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $8) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $9) (param externref externref) (result i32)))
 (global $s (mut (ref extern)) (global.get $$string_1))
 (elem $$functions (global.get $$tableOffset))
 (export "s" (global $s))
)
*/
let buffer_3 = (new Uint8Array([0,97,115,109,1,0,0,0,1,63,10,96,1,127,1,100,111,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,217,3,17,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,1,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,2,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,3,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,5,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,6,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,7,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,9,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,13,72,101,108,108,111,44,32,87,111,114,108,100,33,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,6,7,1,100,111,1,35,1,11,7,5,1,1,115,3,3,9,6,1,0,35,2,11,0])).buffer;
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
        }, 0)
    },
    '$functions': functions
};
let instance_3 = new WebAssembly.Instance(module_3, imports_3);
let exports_3 = instance_3.exports;
/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/6/file0.sb */
/*
(module
 (type $0 (func (param i32) (result (ref extern))))
 (type $1 (func (param (ref extern) (ref extern) (ref extern)) (result (ref extern))))
 (type $2 (func))
 (type $3 (func (param i32 (ref extern) (ref extern)) (result (ref extern))))
 (type $4 (func (param i64) (result (ref extern))))
 (type $5 (func (param f32) (result (ref extern))))
 (type $6 (func (param f64) (result (ref extern))))
 (type $7 (func (param (ref extern)) (result (ref extern))))
 (type $8 (func (param (ref extern))))
 (type $9 (func (param externref) (result i32)))
 (type $10 (func (param externref externref) (result (ref extern))))
 (type $11 (func (param externref i32 i32) (result (ref extern))))
 (type $12 (func (param externref externref) (result i32)))
 (import "$objects" "$memory" (memory $$memory 0))
 (import "$objects" "$table" (table $$table 0 funcref))
 (import "file1" "s" (global $big-s (mut (ref extern))))
 (import "file3" "s" (global $S (mut (ref extern))))
 (import "$strings" "" (global $$string_empty (ref extern)))
 (import "$strings" "\01\02\03\04\05\06\07\08\t\n\0b\0c\r\0e\0f\10\11\12\13\14\15\16\17\18\19\1a\1b\1c\1d\1e\1f !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\7f" (global $$string_37 (ref extern)))
 (import "$strings" "\n\f0\9f\87\ba\f0\9f\87\b3\n\f0\9f\8f\b4\f3\a0\81\a7\f3\a0\81\a2\f3\a0\81\b3\f3\a0\81\a3\f3\a0\81\b4\f3\a0\81\bf\n\t" (global $$string_53 (ref extern)))
 (import "$strings" "Text-1" (global $$string_75 (ref extern)))
 (import "$strings" "Text-0" (global $$string_102 (ref extern)))
 (import "$strings" "Text-1" (global $$string_105 (ref extern)))
 (import "$strings" "Text" (global $$string_132 (ref extern)))
 (import "$strings" "Text-0" (global $$string_181 (ref extern)))
 (import "$strings" "Text-1" (global $$string_194 (ref extern)))
 (import "$strings" "\"" (global $$string_197 (ref extern)))
 (import "$strings" "\'" (global $$string_258 (ref extern)))
 (import "$objects" "$tableOffset" (global $$tableOffset i32))
 (import "file2" "getText" (func $"getText_[$s,$s,$s]->[$s]" (type $1) (param (ref extern) (ref extern) (ref extern)) (result (ref extern))))
 (import "$functions" "$getString_[$i]->[$s]" (func $"$getString_[$i]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$iu]->[$s]" (func $"$getString_[$iu]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$id]->[$s]" (func $"$getString_[$id]->[$s]" (type $4) (param i64) (result (ref extern))))
 (import "$functions" "$getString_[$f]->[$s]" (func $"$getString_[$f]->[$s]" (type $5) (param f32) (result (ref extern))))
 (import "$functions" "$getString_[$fd]->[$s]" (func $"$getString_[$fd]->[$s]" (type $6) (param f64) (result (ref extern))))
 (import "$functions" "$getString_[$b]->[$s]" (func $"$getString_[$b]->[$s]" (type $0) (param i32) (result (ref extern))))
 (import "$functions" "$getString_[$s]->[$s]" (func $"$getString_[$s]->[$s]" (type $7) (param (ref extern)) (result (ref extern))))
 (import "$functions" "$show" (func $$show (type $8) (param (ref extern))))
 (import "wasm:js-string" "length" (func $$wasm:js-string_length (type $9) (param externref) (result i32)))
 (import "wasm:js-string" "concat" (func $$wasm:js-string_concat (type $10) (param externref externref) (result (ref extern))))
 (import "wasm:js-string" "substring" (func $$wasm:js-string_substring (type $11) (param externref i32 i32) (result (ref extern))))
 (import "wasm:js-string" "equals" (func $$wasm:js-string_equals (type $12) (param externref externref) (result i32)))
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start (type $2)
  (local $0 (ref extern))
  (local $1 (ref extern))
  (local $2 (ref extern))
  (local.set $0
   (global.get $$string_37)
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (local.get $0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $$wasm:js-string_concat
     (global.get $$string_53)
     (global.get $$string_empty)
    )
   )
  )
  (local.set $1
   (call $"getText_[$i]->[$s]"
    (i32.const 0)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"getText_[$i,$s,$s]->[$s]"
     (i32.const 0)
     (local.get $1)
     (global.get $$string_75)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"getText_[$i,$s,$s]->[$s]"
     (i32.const 1)
     (call $"getText_[$i]->[$s]"
      (i32.const 1)
     )
     (call $"getText_[$i]->[$s]"
      (i32.const 2)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"getText_[$i,$s,$s]->[$s]"
     (i32.const 2)
     (call $$wasm:js-string_concat
      (global.get $$string_102)
      (global.get $$string_empty)
     )
     (global.get $$string_105)
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $big-s)
   )
  )
  (local.set $2
   (call $"getText_[$i]->[$s]"
    (i32.const 1)
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (call $"getText_[$s,$s,$s]->[$s]"
     (call $$wasm:js-string_concat
      (global.get $$string_132)
      (global.get $$string_empty)
     )
     (local.get $2)
     (call $"getText_[$i]->[$s]"
      (i32.const 2)
     )
    )
   )
  )
  (call $$show
   (call $"$getString_[$s]->[$s]"
    (global.get $S)
   )
  )
 )
 (func $"getText_[$i]->[$s]" (type $0) (param $0 i32) (result (ref extern))
  (if
   (i32.eq
    (local.get $0)
    (i32.const 0)
   )
   (then
    (return
     (call $$wasm:js-string_concat
      (global.get $$string_181)
      (global.get $$string_empty)
     )
    )
   )
   (else
    (if
     (i32.eq
      (local.get $0)
      (i32.const 1)
     )
     (then
      (return
       (global.get $$string_194)
      )
     )
     (else
      (return
       (global.get $$string_197)
      )
     )
    )
   )
  )
 )
 (func $"getText_[$i,$s,$s]->[$s]" (type $3) (param $0 i32) (param $1 (ref extern)) (param $2 (ref extern)) (result (ref extern))
  (if
   (i32.eq
    (local.get $0)
    (i32.const 0)
   )
   (then
    (return
     (local.get $1)
    )
   )
   (else
    (if
     (i32.eq
      (local.get $0)
      (i32.const 1)
     )
     (then
      (return
       (local.get $2)
      )
     )
     (else
      (return
       (call $$wasm:js-string_concat
        (global.get $$string_258)
        (global.get $$string_empty)
       )
      )
     )
    )
   )
  )
 )
)
*/
let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,87,13,96,1,127,1,100,111,96,3,100,111,100,111,100,111,1,100,111,96,0,0,96,3,127,100,111,100,111,1,100,111,96,1,126,1,100,111,96,1,125,1,100,111,96,1,124,1,100,111,96,1,100,111,1,100,111,96,1,100,111,0,96,1,111,1,127,96,2,111,111,1,100,111,96,3,111,127,127,1,100,111,96,2,111,111,1,127,2,189,6,29,5,102,105,108,101,50,7,103,101,116,84,101,120,116,0,1,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,105,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,117,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,105,100,93,45,62,91,36,115,93,0,4,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,102,93,45,62,91,36,115,93,0,5,10,36,102,117,110,99,116,105,111,110,115,22,36,103,101,116,83,116,114,105,110,103,95,91,36,102,100,93,45,62,91,36,115,93,0,6,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,98,93,45,62,91,36,115,93,0,0,10,36,102,117,110,99,116,105,111,110,115,21,36,103,101,116,83,116,114,105,110,103,95,91,36,115,93,45,62,91,36,115,93,0,7,10,36,102,117,110,99,116,105,111,110,115,5,36,115,104,111,119,0,8,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,108,101,110,103,116,104,0,9,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,99,111,110,99,97,116,0,10,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,9,115,117,98,115,116,114,105,110,103,0,11,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,6,101,113,117,97,108,115,0,12,5,102,105,108,101,49,1,115,3,100,111,1,5,102,105,108,101,51,1,115,3,100,111,1,8,36,115,116,114,105,110,103,115,0,3,100,111,0,8,36,115,116,114,105,110,103,115,127,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,3,100,111,0,8,36,115,116,114,105,110,103,115,40,10,240,159,135,186,240,159,135,179,10,240,159,143,180,243,160,129,167,243,160,129,162,243,160,129,179,243,160,129,163,243,160,129,180,243,160,129,191,10,9,3,100,111,0,8,36,115,116,114,105,110,103,115,6,84,101,120,116,45,49,3,100,111,0,8,36,115,116,114,105,110,103,115,6,84,101,120,116,45,48,3,100,111,0,8,36,115,116,114,105,110,103,115,6,84,101,120,116,45,49,3,100,111,0,8,36,115,116,114,105,110,103,115,4,84,101,120,116,3,100,111,0,8,36,115,116,114,105,110,103,115,6,84,101,120,116,45,48,3,100,111,0,8,36,115,116,114,105,110,103,115,6,84,101,120,116,45,49,3,100,111,0,8,36,115,116,114,105,110,103,115,1,34,3,100,111,0,8,36,115,116,114,105,110,103,115,1,39,3,100,111,0,8,36,111,98,106,101,99,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,8,36,111,98,106,101,99,116,115,7,36,109,101,109,111,114,121,2,0,0,8,36,111,98,106,101,99,116,115,6,36,116,97,98,108,101,1,112,0,0,3,4,3,2,0,3,7,9,1,5,115,116,97,114,116,0,13,9,6,1,0,35,13,11,0,10,185,1,3,111,1,3,100,111,35,3,33,0,32,0,16,7,16,8,35,4,35,2,16,10,16,7,16,8,65,0,16,14,33,1,65,0,32,1,35,5,16,15,16,7,16,8,65,1,65,1,16,14,65,2,16,14,16,15,16,7,16,8,65,2,35,6,35,2,16,10,35,7,16,15,16,7,16,8,35,0,16,7,16,8,65,1,16,14,33,2,35,8,35,2,16,10,32,2,65,2,16,14,16,0,16,7,16,8,35,1,16,7,16,8,11,35,0,32,0,65,0,70,4,64,35,9,35,2,16,10,15,5,32,0,65,1,70,4,64,35,10,15,5,35,11,15,11,0,11,0,11,35,0,32,0,65,0,70,4,64,32,1,15,5,32,0,65,1,70,4,64,32,2,15,5,35,12,35,2,16,10,15,11,0,11,0,11])).buffer;
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
        's': exports_1['s']
    },
    'file2': {
        'getText': exports_2['getText']
    },
    'file3': {
        's': exports_3['s']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { memory, exports_0 as 'exports' };