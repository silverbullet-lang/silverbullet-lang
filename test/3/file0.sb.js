let memory = new WebAssembly.Memory({
    initial: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 0
});

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/3/file0.sb */
/*
(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
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
 (memory $$memory 1)
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start
  (call $show_[$iu]->[]
   (memory.size)
  )
  (call $show_[$iu]->[]
   (memory.size)
  )
  (call $show_[$i]->[]
   (memory.grow
    (i32.const 2)
   )
  )
  (call $show_[$iu]->[]
   (memory.size)
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
  (call $show_[$i]->[]
   (i32.load
    (i32.const 0)
   )
  )
  (i32.store
   (i32.const 4)
   (i32.const 2)
  )
  (call $show_[$iu]->[]
   (i32.load
    (i32.const 4)
   )
  )
  (i32.store
   (i32.const 8)
   (i32.const 1)
  )
  (call $show_[$b]->[]
   (i32.load
    (i32.const 8)
   )
  )
  (i32.store8
   (i32.const 12)
   (i32.const 4)
  )
  (call $show_[$i]->[]
   (i32.load8_s
    (i32.const 12)
   )
  )
  (i32.store8
   (i32.const 13)
   (i32.const 5)
  )
  (call $show_[$iu]->[]
   (i32.load8_u
    (i32.const 13)
   )
  )
  (i32.store16
   (i32.const 14)
   (i32.const 6)
  )
  (call $show_[$i]->[]
   (i32.load16_s
    (i32.const 14)
   )
  )
  (i32.store16
   (i32.const 16)
   (i32.const 7)
  )
  (call $show_[$iu]->[]
   (i32.load16_u
    (i32.const 16)
   )
  )
  (i64.store
   (i32.const 18)
   (i64.const 8)
  )
  (call $show_[$id]->[]
   (i64.load
    (i32.const 18)
   )
  )
  (f32.store
   (i32.const 22)
   (f32.const 9.5)
  )
  (call $show_[$f]->[]
   (f32.load
    (i32.const 22)
   )
  )
  (f64.store
   (i32.const 26)
   (f64.const 10.5)
  )
  (call $show_[$fd]->[]
   (f64.load
    (i32.const 26)
   )
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,126,0,96,1,125,0,96,1,124,0,2,215,1,8,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,5,3,1,0,1,7,9,1,5,115,116,97,114,116,0,6,9,6,1,0,35,0,11,0,10,183,1,1,180,1,0,63,0,16,1,63,0,16,1,65,2,64,0,16,0,63,0,16,1,65,0,65,4,65,4,252,10,0,0,65,0,65,1,54,2,0,65,0,40,2,0,16,0,65,4,65,2,54,2,0,65,4,40,2,0,16,1,65,8,65,1,54,2,0,65,8,40,2,0,16,5,65,12,65,4,58,0,0,65,12,44,0,0,16,0,65,13,65,5,58,0,0,65,13,45,0,0,16,1,65,14,65,6,59,1,0,65,14,46,1,0,16,0,65,16,65,7,59,1,0,65,16,47,1,0,16,1,65,18,66,8,55,3,0,65,18,41,3,0,16,2,65,22,67,0,0,24,65,56,2,0,65,22,42,2,0,16,3,65,26,68,0,0,0,0,0,0,37,64,57,3,0,65,26,43,3,0,16,4,11])).buffer;
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
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };