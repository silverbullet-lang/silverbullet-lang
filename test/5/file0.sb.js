let memory = new WebAssembly.Memory({
    initial: 10,
    maximum: 100
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 0
});

/* file:///home/nerijus/Desktop/sbc/test/5/file0.sb */
/*
(module
 (type $0 (func (param i32)))
 (type $1 (func))
 (type $2 (func (param i64)))
 (type $3 (func (param f32)))
 (type $4 (func (param f64)))
 (import "$submodule" "$memory" (memory $$memory 0))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "$submodule" "$memoryOffset" (global $$memoryOffset i32))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "$submodule" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (import "$submodule" "show_[$s]->[]" (func $show_[$s]->[] (param i32)))
 (data $0 (global.get $$memoryOffset) "")
 (elem $$functions (global.get $$tableOffset))
 (export "start" (func $start))
 (func $start
  (call $show_[$b]->[]
   (i32.eq
    (memory.size)
    (i32.const 10)
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.grow
     (i32.const 20)
    )
    (i32.const 10)
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.size)
    (i32.const 30)
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.grow
     (i32.const 70)
    )
    (i32.const 30)
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.size)
    (i32.const 100)
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.grow
     (i32.const 1)
    )
    (i32.sub
     (i32.const 0)
     (i32.const 1)
    )
   )
  )
  (call $show_[$b]->[]
   (i32.eq
    (memory.size)
    (i32.const 100)
   )
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,126,0,96,1,125,0,96,1,124,0,2,164,2,11,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,115,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,36,109,101,109,111,114,121,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,7,36,109,101,109,111,114,121,2,0,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,2,1,1,7,9,1,5,115,116,97,114,116,0,7,9,6,1,0,35,1,11,0,12,1,1,10,65,1,63,0,63,0,65,10,70,16,5,65,20,64,0,65,10,70,16,5,63,0,65,30,70,16,5,65,198,0,64,0,65,30,70,16,5,63,0,65,228,0,70,16,5,65,1,64,0,65,0,65,1,107,70,16,5,63,0,65,228,0,70,16,5,11,11,6,1,0,35,0,11,0])).buffer;
let module_0 = new WebAssembly.Module(buffer_0);
let imports_0 = {
    '$submodule': {
        '$memory': memory,
        '$memoryOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
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
        },
        'show_[$s]->[]': function(pointer) {
            let sizeBuffer = memory.buffer.slice(pointer, pointer + 4);
            let size = (new Uint32Array(sizeBuffer))[0];
            let textDecoder = new TextDecoder();
            let valueView = new Uint8Array(memory.buffer, pointer + 4, size);
            let value = textDecoder.decode(valueView);

            console.log(value);
        }
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };