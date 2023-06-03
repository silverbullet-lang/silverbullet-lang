let memory = new WebAssembly.Memory({
    initial: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 0
});

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder1/folder0/file1.sb */
/*
(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_f32 (func (result f32)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 365))
 (global $variable1 (mut i32) (i32.const 74))
 (global $variable2 (mut f64) (f64.const 123.4))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function2_[]->[$fd]" (func $function2_[]->[$fd]))
 (func $function0 (result f32)
  (return
   (f32.const 159.35699462890625)
  )
 )
 (func $function1_[]->[$i] (result i32)
  (return
   (i32.const 10)
  )
 )
 (func $function1_[$b]->[] (param $0 i32)
  (nop)
 )
 (func $function2_[]->[$fd] (result f64)
  (return
   (f64.sub
    (global.get $variable2)
    (f64.const 12.5)
   )
  )
 )
 (func $function2_[$b]->[] (param $0 i32)
  (nop)
 )
 (func $function2_[$iu,$iu]->[$iu] (param $0 i32) (param $1 i32) (result i32)
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

let buffer_3 = (new Uint8Array([0,97,115,109,1,0,0,0,1,35,8,96,1,127,0,96,0,1,125,96,0,1,127,96,0,1,124,96,2,127,127,1,127,96,1,126,0,96,1,125,0,96,1,124,0,2,215,1,8,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,5,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,6,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,1,2,0,3,0,4,5,3,1,0,1,6,25,3,127,1,65,237,2,11,127,1,65,202,0,11,124,1,68,154,153,153,153,153,217,94,64,11,7,71,5,9,118,97,114,105,97,98,108,101,48,3,1,9,118,97,114,105,97,98,108,101,49,3,2,9,118,97,114,105,97,98,108,101,50,3,3,9,102,117,110,99,116,105,111,110,48,0,6,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,9,9,6,1,0,35,0,11,0,10,52,6,8,0,67,100,91,31,67,15,11,5,0,65,10,15,11,3,0,1,11,15,0,35,3,68,0,0,0,0,0,0,41,64,161,15,11,3,0,1,11,11,0,32,0,32,1,106,65,2,110,15,11])).buffer;
let module_3 = new WebAssembly.Module(buffer_3);
let imports_3 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    }
};
let instance_3 = new WebAssembly.Instance(module_3, imports_3);
let exports_3 = instance_3.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder1/folder0/file0.sb */
/*
(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_f32 (func (result f32)))
 (type $none_=>_none (func))
 (type $f64_=>_f64 (func (param f64) (result f64)))
 (type $i64_=>_i32 (func (param i64) (result i32)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "function0" (func $external-function0 (result f32)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 45))
 (global $variable1 (mut i32) (i32.const 0))
 (global $variable2 (mut i32) (i32.const 85))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[$iu]" (func $function1_[]->[$iu]))
 (export "function1_[$fd]->[$fd]" (func $function1_[$fd]->[$fd]))
 (export "function2_[$id]->[$b]" (func $function2_[$id]->[$b]))
 (export "function2_[]->[$b]" (func $function2_[]->[$b]))
 (func $function0
  (nop)
 )
 (func $function1_[]->[$iu] (result i32)
  (return
   (i32.sub
    (global.get $variable0)
    (i32.const 1)
   )
  )
 )
 (func $function1_[$fd]->[$fd] (param $0 f64) (result f64)
  (return
   (f64.mul
    (local.get $0)
    (f64.const 2)
   )
  )
 )
 (func $function2_[$i]->[] (param $0 i32)
  (nop)
 )
 (func $function2_[$id]->[$b] (param $0 i64) (result i32)
  (return
   (i64.eq
    (local.get $0)
    (i64.const 7)
   )
  )
 )
 (func $function2_[]->[$b] (result i32)
  (return
   (call $function2_[$id]->[$b]
    (i64.const 7)
   )
  )
 )
)
*/

let buffer_5 = (new Uint8Array([0,97,115,109,1,0,0,0,1,38,9,96,1,127,0,96,0,1,127,96,0,1,125,96,0,0,96,1,124,1,124,96,1,126,1,127,96,1,126,0,96,1,125,0,96,1,124,0,2,233,1,9,5,102,105,108,101,49,9,102,117,110,99,116,105,111,110,48,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,6,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,8,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,1,4,0,5,1,5,3,1,0,1,6,17,3,127,1,65,45,11,127,1,65,0,11,127,1,65,213,0,11,7,141,1,8,9,118,97,114,105,97,98,108,101,48,3,1,9,118,97,114,105,97,98,108,101,49,3,2,9,118,97,114,105,97,98,108,101,50,3,3,9,102,117,110,99,116,105,111,110,48,0,7,19,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,105,117,93,0,8,22,102,117,110,99,116,105,111,110,49,95,91,36,102,100,93,45,62,91,36,102,100,93,0,9,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,11,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,12,9,6,1,0,35,0,11,0,10,51,6,3,0,1,11,8,0,35,1,65,1,107,15,11,15,0,32,0,68,0,0,0,0,0,0,0,64,162,15,11,3,0,1,11,8,0,32,0,66,7,81,15,11,7,0,66,7,16,11,15,11])).buffer;
let module_5 = new WebAssembly.Module(buffer_5);
let imports_5 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
    'file1': {
        'function0': exports_3['function0']
    }
};
let instance_5 = new WebAssembly.Instance(module_5, imports_5);
let exports_5 = instance_5.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/0/folder2/file0.sb */
/*
(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $i64_=>_i32 (func (param i64) (result i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i64_=>_i64 (func (param i64) (result i64)))
 (type $none_=>_i64 (func (result i64)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $f64_=>_f64 (func (param f64) (result f64)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "folderUp-folder1-folder0-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "folderUp-folder1-folder0-file1" "function2_[]->[$fd]" (func $external-function2_[]->[$fd] (result f64)))
 (import "folderUp-folder1-folder0-file0" "function2_[$id]->[$b]" (func $external-function2_[$id]->[$b] (param i64) (result i32)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 65))
 (global $variable1 (mut i32) (i32.const 123))
 (global $variable2 (mut i32) (i32.const 0))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function1_[$id]->[$id]" (func $function1_[$id]->[$id]))
 (func $function0 (result i32)
  (return
   (global.get $variable2)
  )
 )
 (func $function1_[$id]->[$id] (param $0 i64) (result i64)
  (return
   (i64.sub
    (i64.const 35741)
    (i64.const 258)
   )
  )
 )
 (func $function1_[]->[$id] (result i64)
  (return
   (call $function1_[$id]->[$id]
    (i64.const 123)
   )
  )
 )
 (func $function2_[$i,$i]->[] (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $function2_[$fd]->[$fd] (param $0 f64) (result f64)
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
 (func $function2_[]->[$fd] (result f64)
  (return
   (call $function2_[$fd]->[$fd]
    (f64.const 123456)
   )
  )
 )
)
*/

let buffer_4 = (new Uint8Array([0,97,115,109,1,0,0,0,1,49,11,96,1,127,0,96,0,1,124,96,1,126,1,127,96,0,1,127,96,1,126,1,126,96,0,1,126,96,2,127,127,0,96,1,124,1,124,96,1,126,0,96,1,125,0,96,1,124,0,2,239,2,11,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,1,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,8,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,9,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,10,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,30,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,4,5,6,7,1,5,3,1,0,1,6,18,3,127,1,65,193,0,11,127,1,65,251,0,11,127,1,65,0,11,7,50,3,9,118,97,114,105,97,98,108,101,48,3,2,9,118,97,114,105,97,98,108,101,50,3,4,22,102,117,110,99,116,105,111,110,49,95,91,36,105,100,93,45,62,91,36,105,100,93,0,9,9,6,1,0,35,1,11,0,10,73,6,5,0,35,4,15,11,11,0,66,157,151,2,66,130,2,125,15,11,8,0,66,251,0,16,9,15,11,3,0,1,11,25,0,32,0,68,0,0,0,0,0,0,8,64,162,68,154,153,153,153,153,153,233,63,161,15,11,14,0,68,0,0,0,0,0,36,254,64,16,12,15,11])).buffer;
let module_4 = new WebAssembly.Module(buffer_4);
let imports_4 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $i64_=>_i64 (func (param i64) (result i64)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_none (func))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $f64_=>_i32 (func (param f64) (result i32)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "folder1-folder0-file1" "variable2" (global $external-variable2 (mut f64)))
 (import "folder2-file0" "variable0" (global $external-variable0 (mut i32)))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "folder1-folder0-file1" "function2_[]->[$fd]" (func $external-function2 (result f64)))
 (import "folder2-file0" "function1_[$id]->[$id]" (func $external-function1 (param i64) (result i64)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 1))
 (global $variable1 (mut f64) (f64.const 45))
 (global $variable2 i32 (i32.const 456))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[]" (func $function1_[]->[]))
 (export "function1_[$i,$i]->[$b]" (func $function1_[$i,$i]->[$b]))
 (export "function2_[]->[$fd]" (func $function2_[]->[$fd]))
 (export "function2_[$b]->[]" (func $function2_[$b]->[]))
 (export "function2_[$fd]->[$iu]" (func $function2_[$fd]->[$iu]))
 (func $function0 (result i32)
  (return
   (i32.mul
    (i32.const 2)
    (global.get $variable2)
   )
  )
 )
 (func $function1_[]->[]
  (nop)
 )
 (func $function1_[$i,$i]->[$b] (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.gt_s
    (local.get $0)
    (local.get $1)
   )
  )
 )
 (func $function2_[]->[$fd] (result f64)
  (return
   (f64.mul
    (global.get $variable1)
    (f64.const 3)
   )
  )
 )
 (func $function2_[$b]->[] (param $0 i32)
  (nop)
 )
 (func $function2_[$fd]->[$iu] (param $0 f64) (result i32)
  (return
   (i32.const 7)
  )
 )
)
*/

let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,44,10,96,1,127,0,96,0,1,124,96,1,126,1,126,96,0,1,127,96,0,0,96,2,127,127,1,127,96,1,124,1,127,96,1,126,0,96,1,125,0,96,1,124,0,2,232,2,12,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,1,13,102,111,108,100,101,114,50,45,102,105,108,101,48,22,102,117,110,99,116,105,111,110,49,95,91,36,105,100,93,45,62,91,36,105,100,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,8,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,9,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,49,9,118,97,114,105,97,98,108,101,50,3,124,1,13,102,111,108,100,101,114,50,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,48,3,127,1,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,4,5,1,0,6,5,3,1,0,1,6,24,3,127,1,65,1,11,124,1,68,0,0,0,0,0,128,70,64,11,127,0,65,200,3,11,7,150,1,8,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,50,3,5,9,102,117,110,99,116,105,111,110,48,0,8,16,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,93,0,9,23,102,117,110,99,116,105,111,110,49,95,91,36,105,44,36,105,93,45,62,91,36,98,93,0,10,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,11,18,102,117,110,99,116,105,111,110,50,95,91,36,98,93,45,62,91,93,0,12,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,105,117,93,0,13,9,6,1,0,35,2,11,0,10,49,6,8,0,65,2,35,5,108,15,11,3,0,1,11,8,0,32,0,32,1,74,15,11,15,0,35,4,68,0,0,0,0,0,0,8,64,162,15,11,3,0,1,11,5,0,65,7,15,11])).buffer;
let module_2 = new WebAssembly.Module(buffer_2);
let imports_2 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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
 (type $none_=>_i32 (func (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $i64_=>_i32 (func (param i64) (result i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $f64_=>_f64 (func (param f64) (result f64)))
 (type $i64_i64_=>_i64 (func (param i64 i64) (result i64)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "folder0-file0" "variable1" (global $external-variable1 (mut i32)))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "folder0-file1" "function2_[]->[$fd]" (func $external-function2_[]->[$fd] (result f64)))
 (import "folder0-file0" "function2_[$id]->[$b]" (func $external-function2_[$id]->[$b] (param i64) (result i32)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 0))
 (global $variable1 f32 (f32.const 147.36900329589844))
 (global $variable2 (mut i32) (i32.const 357951))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function2_[$fd]->[$fd]" (func $function2_[$fd]->[$fd]))
 (export "function2_[$id,$id]->[$id]" (func $function2_[$id,$id]->[$id]))
 (func $function0 (result i32)
  (return
   (i32.gt_u
    (global.get $variable2)
    (i32.const 159753)
   )
  )
 )
 (func $function1_[$iu]->[$iu] (param $0 i32) (result i32)
  (return
   (i32.sub
    (global.get $variable2)
    (local.get $0)
   )
  )
 )
 (func $function1_[]->[$b] (result i32)
  (return
   (i32.xor
    (global.get $variable0)
    (i32.const 1)
   )
  )
 )
 (func $function2_[$fd]->[$fd] (param $0 f64) (result f64)
  (return
   (f64.mul
    (local.get $0)
    (f64.const 2)
   )
  )
 )
 (func $function2_[]->[$i] (result i32)
  (return
   (i32.sub
    (i32.const 0)
    (i32.const 15)
   )
  )
 )
 (func $function2_[$id,$id]->[$id] (param $0 i64) (param $1 i64) (result i64)
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

let buffer_6 = (new Uint8Array([0,97,115,109,1,0,0,0,1,46,10,96,0,1,127,96,1,127,0,96,0,1,124,96,1,126,1,127,96,1,127,1,127,96,1,124,1,124,96,2,126,126,1,126,96,1,126,0,96,1,125,0,96,1,124,0,2,188,2,11,13,102,111,108,100,101,114,48,45,102,105,108,101,49,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,102,100,93,0,2,13,102,111,108,100,101,114,48,45,102,105,108,101,48,21,102,117,110,99,116,105,111,110,50,95,91,36,105,100,93,45,62,91,36,98,93,0,3,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,1,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,1,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,8,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,9,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,1,13,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,49,3,127,1,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,0,4,0,5,0,6,5,3,1,0,1,6,21,3,127,1,65,0,11,125,0,67,119,94,19,67,11,127,1,65,191,236,21,11,7,91,5,9,118,97,114,105,97,98,108,101,48,3,2,9,118,97,114,105,97,98,108,101,50,3,4,9,102,117,110,99,116,105,111,110,48,0,8,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,102,100,93,0,11,26,102,117,110,99,116,105,111,110,50,95,91,36,105,100,44,36,105,100,93,45,62,91,36,105,100,93,0,13,9,6,1,0,35,1,11,0,10,67,6,10,0,35,4,65,137,224,9,75,15,11,8,0,35,4,32,0,107,15,11,8,0,35,2,65,1,115,15,11,15,0,32,0,68,0,0,0,0,0,0,0,64,162,15,11,8,0,65,0,65,15,107,15,11,11,0,32,0,32,1,124,66,3,127,15,11])).buffer;
let module_6 = new WebAssembly.Module(buffer_6);
let imports_6 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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
 (type $none_=>_i32 (func (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $f32_=>_none (func (param f32)))
 (type $i32_f64_=>_i64 (func (param i32 f64) (result i64)))
 (type $i32_f64_i32_=>_none (func (param i32 f64 i32)))
 (type $f32_=>_f32 (func (param f32) (result f32)))
 (type $i64_=>_none (func (param i64)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "file2" "variable2" (global $external-variable2 i32))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "folder1-file0" "function0" (func $external-function0 (result i32)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut f32) (f32.const 18.5))
 (global $variable1 (mut i32) (i32.const 1))
 (global $variable2 (mut i32) (i32.const 95))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[]->[$i]" (func $function1_[]->[$i]))
 (export "function1_[$f]->[]" (func $function1_[$f]->[]))
 (export "function2_[$iu,$fd,$b]->[]" (func $function2_[$iu,$fd,$b]->[]))
 (export "function2_[]->[$b]" (func $function2_[]->[$b]))
 (export "function2_[$f]->[$f]" (func $function2_[$f]->[$f]))
 (func $function0 (param $0 i32) (param $1 f64) (result i64)
  (return
   (i64.const 17)
  )
 )
 (func $function1_[]->[$i] (result i32)
  (return
   (i32.const 19)
  )
 )
 (func $function1_[$f]->[] (param $0 f32)
  (nop)
 )
 (func $function2_[$iu,$fd,$b]->[] (param $0 i32) (param $1 f64) (param $2 i32)
  (nop)
 )
 (func $function2_[]->[$b] (result i32)
  (return
   (i32.or
    (i32.const 1)
    (i32.const 0)
   )
  )
 )
 (func $function2_[$f]->[$f] (param $0 f32) (result f32)
  (return
   (f32.add
    (local.get $0)
    (global.get $variable0)
   )
  )
 )
)
*/

let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,38,8,96,0,1,127,96,1,127,0,96,1,125,0,96,2,127,124,1,126,96,3,127,124,127,0,96,1,125,1,125,96,1,126,0,96,1,124,0,2,132,2,10,13,102,111,108,100,101,114,49,45,102,105,108,101,48,9,102,117,110,99,116,105,111,110,48,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,1,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,1,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,6,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,1,5,102,105,108,101,50,9,118,97,114,105,97,98,108,101,50,3,127,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,3,0,2,4,0,5,5,3,1,0,1,6,20,3,125,1,67,0,0,148,65,11,127,1,65,1,11,127,1,65,223,0,11,7,164,1,9,9,118,97,114,105,97,98,108,101,48,3,2,9,118,97,114,105,97,98,108,101,49,3,3,9,118,97,114,105,97,98,108,101,50,3,4,9,102,117,110,99,116,105,111,110,48,0,7,18,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,105,93,0,8,18,102,117,110,99,116,105,111,110,49,95,91,36,102,93,45,62,91,93,0,9,26,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,44,36,98,93,45,62,91,93,0,10,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,11,20,102,117,110,99,116,105,111,110,50,95,91,36,102,93,45,62,91,36,102,93,0,12,9,6,1,0,35,1,11,0,10,39,6,5,0,66,17,15,11,5,0,65,19,15,11,3,0,1,11,3,0,1,11,8,0,65,1,65,0,114,15,11,8,0,32,0,35,2,146,15,11])).buffer;
let module_1 = new WebAssembly.Module(buffer_1);
let imports_1 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $f64_=>_f64 (func (param f64) (result f64)))
 (type $i64_i64_=>_i64 (func (param i64 i64) (result i64)))
 (type $none_=>_f64 (func (result f64)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i64_=>_f32 (func (param i64) (result f32)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "folderUp-folder2-file0" "variable0" (global $external-variable0 (mut i32)))
 (import "folderUp-folder1-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "folderUp-folder1-file0" "function2_[$fd]->[$fd]" (func $external-function2_[$fd]->[$fd] (param f64) (result f64)))
 (import "folderUp-folder1-file0" "function2_[$id,$id]->[$id]" (func $external-function2_[$id,$id]->[$id] (param i64 i64) (result i64)))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 0))
 (global $variable1 (mut i32) (i32.const 64))
 (global $variable3 (mut f64) (f64.const 158.36))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable3" (global $variable3))
 (export "function1_[]->[$fd]" (func $function1_[]->[$fd]))
 (export "function1_[$iu]->[]" (func $function1_[$iu]->[]))
 (export "function2_[$b]->[$b]" (func $function2_[$b]->[$b]))
 (export "function2_[]->[]" (func $function2_[]->[]))
 (func $function0
  (nop)
 )
 (func $function1_[]->[$fd] (result f64)
  (return
   (f64.sub
    (global.get $variable3)
    (f64.const 1)
   )
  )
 )
 (func $function1_[$iu]->[] (param $0 i32)
  (nop)
 )
 (func $function2_[$b]->[$b] (param $0 i32) (result i32)
  (return
   (i32.xor
    (local.get $0)
    (i32.const 1)
   )
  )
 )
 (func $function2_[]->[]
  (nop)
 )
 (func $function2_[$id]->[$f] (param $0 i64) (result f32)
  (return
   (f32.add
    (f32.const 2.799999952316284)
    (f32.const 6.199999809265137)
   )
  )
 )
)
*/

let buffer_7 = (new Uint8Array([0,97,115,109,1,0,0,0,1,45,10,96,1,127,0,96,0,0,96,1,124,1,124,96,2,126,126,1,126,96,0,1,124,96,1,127,1,127,96,1,126,1,125,96,1,126,0,96,1,125,0,96,1,124,0,2,131,3,12,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,22,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,36,102,100,93,0,2,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,26,102,117,110,99,116,105,111,110,50,95,91,36,105,100,44,36,105,100,93,45,62,91,36,105,100,93,0,3,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,7,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,8,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,9,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,50,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,48,3,127,1,22,102,111,108,100,101,114,85,112,45,102,111,108,100,101,114,49,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,1,4,0,5,1,6,5,3,1,0,1,6,24,3,127,1,65,0,11,127,1,65,192,0,11,124,1,68,236,81,184,30,133,203,99,64,11,7,123,7,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,49,3,4,9,118,97,114,105,97,98,108,101,51,3,5,19,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,36,102,100,93,0,9,19,102,117,110,99,116,105,111,110,49,95,91,36,105,117,93,45,62,91,93,0,10,20,102,117,110,99,116,105,111,110,50,95,91,36,98,93,45,62,91,36,98,93,0,11,16,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,93,0,12,9,6,1,0,35,2,11,0,10,53,6,3,0,1,11,15,0,35,5,68,0,0,0,0,0,0,240,63,161,15,11,3,0,1,11,8,0,32,0,65,1,115,15,11,3,0,1,11,14,0,67,51,51,51,64,67,102,102,198,64,146,15,11])).buffer;
let module_7 = new WebAssembly.Module(buffer_7);
let imports_7 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (type $i32_f64_i32_=>_none (func (param i32 f64 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $f32_=>_f32 (func (param f32) (result f32)))
 (type $none_=>_i64 (func (result i64)))
 (type $i32_f64_=>_none (func (param i32 f64)))
 (type $i64_=>_none (func (param i64)))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "file1" "variable0" (global $external-variable0 (mut f32)))
 (import "folder1-folder0-file0" "variable2" (global $external-variable2 (mut i32)))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "function2_[$iu,$fd,$b]->[]" (func $external-function2_[$iu,$fd,$b]->[] (param i32 f64 i32)))
 (import "file1" "function2_[]->[$b]" (func $external-function2_[]->[$b] (result i32)))
 (import "file1" "function2_[$f]->[$f]" (func $external-function2_[$f]->[$f] (param f32) (result f32)))
 (import "folder0-file0" "function1_[$iu]->[]" (func $external-function1 (param i32)))
 (import "folder1-folder0-file0" "function0" (func $external-function0))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (global $variable0 (mut i32) (i32.const 763))
 (global $variable1 (mut i32) (i32.const 0))
 (global $variable2 (mut f32) (f32.const 4956.7001953125))
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "variable0" (global $variable0))
 (export "variable1" (global $variable1))
 (export "variable2" (global $variable2))
 (export "function0" (func $function0))
 (export "function1_[$f]->[]" (func $function1_[$f]->[]))
 (export "function1_[]->[]" (func $function1_[]->[]))
 (export "function2_[]->[$id]" (func $function2_[]->[$id]))
 (export "function2_[$fd]->[]" (func $function2_[$fd]->[]))
 (export "function2_[$iu,$fd]->[]" (func $function2_[$iu,$fd]->[]))
 (func $function0
  (nop)
 )
 (func $function1_[$f]->[] (param $0 f32)
  (nop)
 )
 (func $function1_[]->[]
  (nop)
 )
 (func $function2_[]->[$id] (result i64)
  (return
   (i64.const 14)
  )
 )
 (func $function2_[$fd]->[] (param $0 f64)
  (nop)
 )
 (func $function2_[$iu,$fd]->[] (param $0 i32) (param $1 f64)
  (nop)
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,44,10,96,1,127,0,96,0,0,96,1,125,0,96,1,124,0,96,3,127,124,127,0,96,0,1,127,96,1,125,1,125,96,0,1,126,96,2,127,124,0,96,1,126,0,2,174,3,15,5,102,105,108,101,49,26,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,44,36,98,93,45,62,91,93,0,4,5,102,105,108,101,49,18,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,98,93,0,5,5,102,105,108,101,49,20,102,117,110,99,116,105,111,110,50,95,91,36,102,93,45,62,91,36,102,93,0,6,13,102,111,108,100,101,114,48,45,102,105,108,101,48,19,102,117,110,99,116,105,111,110,49,95,91,36,105,117,93,45,62,91,93,0,0,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,102,117,110,99,116,105,111,110,48,0,1,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,9,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,5,102,105,108,101,49,9,118,97,114,105,97,98,108,101,48,3,125,1,21,102,111,108,100,101,114,49,45,102,111,108,100,101,114,48,45,102,105,108,101,48,9,118,97,114,105,97,98,108,101,50,3,127,1,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,7,6,1,2,1,7,3,8,5,3,1,0,1,6,20,3,127,1,65,251,5,11,127,1,65,0,11,125,1,67,154,229,154,69,11,7,159,1,9,9,118,97,114,105,97,98,108,101,48,3,3,9,118,97,114,105,97,98,108,101,49,3,4,9,118,97,114,105,97,98,108,101,50,3,5,9,102,117,110,99,116,105,111,110,48,0,11,18,102,117,110,99,116,105,111,110,49,95,91,36,102,93,45,62,91,93,0,12,16,102,117,110,99,116,105,111,110,49,95,91,93,45,62,91,93,0,13,19,102,117,110,99,116,105,111,110,50,95,91,93,45,62,91,36,105,100,93,0,14,19,102,117,110,99,116,105,111,110,50,95,91,36,102,100,93,45,62,91,93,0,15,23,102,117,110,99,116,105,111,110,50,95,91,36,105,117,44,36,102,100,93,45,62,91,93,0,16,9,6,1,0,35,2,11,0,10,27,6,3,0,1,11,3,0,1,11,3,0,1,11,5,0,66,14,15,11,3,0,1,11,3,0,1,11])).buffer;
let module_0 = new WebAssembly.Module(buffer_0);
let imports_0 = {
    '$submodule': {
        '$memory': memory,
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        'show_[$i]->[]': function(value) {
            console.log((new Int32Array([value]))[0]);
        },
        'show_[$iu]->[]': function(value) {
            console.log((new Uint32Array([value]))[0]);
        },
        'show_[$id]->[]': function(value) {
            console.log((new BigInt64Array([value]))[0]);
        },
        'show_[$f]->[]': function(value) {
            console.log((new Float32Array([value]))[0]);
        },
        'show_[$fd]->[]': function(value) {
            console.log((new Float64Array([value]))[0]);
        },
        'show_[$b]->[]': function(value) {
            if (value === 0) {
                console.log(false);
            } else {
                console.log(true);
            }
        }
    },
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