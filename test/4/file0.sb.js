let memory = new WebAssembly.Memory({
    initial: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 0
});

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/4/file0.sb */
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
  (call $show_[$i]->[]
   (i32.const -1)
  )
  (call $show_[$iu]->[]
   (i32.const -1)
  )
  (call $show_[$iu]->[]
   (i32.add
    (i32.const -1)
    (i32.const 1)
   )
  )
  (call $show_[$id]->[]
   (i64.const 9223372036854775807)
  )
  (call $show_[$id]->[]
   (i64.add
    (i64.const 9223372036854775807)
    (i64.const 1)
   )
  )
  (call $show_[$f]->[]
   (f32.const 12587.365234375)
  )
  (call $show_[$f]->[]
   (f32.neg
    (f32.const 5.869999949936755e-05)
   )
  )
  (call $show_[$fd]->[]
   (f64.neg
    (f64.const 158796555424.25476)
   )
  )
  (call $show_[$fd]->[]
   (f64.const 5.37e-311)
  )
  (call $show_[$b]->[]
   (i32.const 1)
  )
  (call $show_[$b]->[]
   (i32.const 0)
  )
  (call $show_[$b]->[]
   (i32.lt_s
    (i32.const 4)
    (i32.sub
     (i32.const 0)
     (i32.const 8)
    )
   )
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,126,0,96,1,125,0,96,1,124,0,2,215,1,8,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,5,3,1,0,1,7,9,1,5,115,116,97,114,116,0,6,9,6,1,0,35,0,11,0,10,104,1,102,0,65,127,16,0,65,127,16,1,65,127,65,1,106,16,1,66,255,255,255,255,255,255,255,255,255,0,16,2,66,255,255,255,255,255,255,255,255,255,0,66,1,124,16,2,67,118,173,68,70,16,3,67,165,52,118,56,140,16,3,68,156,32,80,146,129,124,66,66,154,16,4,68,107,158,241,162,226,9,0,0,16,4,65,1,16,5,65,0,16,5,65,4,65,0,65,8,107,72,16,5,11])).buffer;
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