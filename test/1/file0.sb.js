let memory = new WebAssembly.Memory({
    initial: 0,
    maximum: 1
});
let table = new WebAssembly.Table({
    element: 'anyfunc',
    initial: 7
});

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file2.sb */
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
 (import "$submodule" "show_[$i]->[]" (func $"show_[$i]->[]" (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $"show_[$iu]->[]" (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $"show_[$id]->[]" (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $"show_[$f]->[]" (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $"show_[$fd]->[]" (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $"show_[$b]->[]" (param i32)))
 (import "$submodule" "show_[$s]->[]" (func $"show_[$s]->[]" (param i32)))
 (data $0 (global.get $$memoryOffset) "")
 (elem $$functions (global.get $$tableOffset) $g)
 (export "f_[]->[]" (func $"f_[]->[]"))
 (export "g" (func $g))
 (export "f_[$b]->[]" (func $"f_[$b]->[]"))
 (func $"f_[]->[]"
  (call $"show_[$i]->[]"
   (i32.const 21)
  )
 )
 (func $g
  (call $"show_[$i]->[]"
   (i32.const 22)
  )
 )
 (func $"f_[$b]->[]" (param $0 i32)
  (local $1 i32)
  (local.set $1
   (i32.add
    (global.get $$tableOffset)
    (i32.const 0)
   )
  )
  (call $"show_[$i]->[]"
   (i32.const 23)
  )
 )
)
*/

let buffer_2 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,126,0,96,1,125,0,96,1,124,0,2,164,2,11,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,115,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,36,109,101,109,111,114,121,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,7,36,109,101,109,111,114,121,2,0,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,4,3,1,1,0,7,29,3,8,102,95,91,93,45,62,91,93,0,7,1,103,0,8,10,102,95,91,36,98,93,45,62,91,93,0,9,9,7,1,0,35,1,11,1,8,12,1,1,10,31,3,6,0,65,21,16,0,11,6,0,65,22,16,0,11,15,1,1,127,35,1,65,0,106,33,1,65,23,16,0,11,11,6,1,0,35,0,11,0])).buffer;
let module_2 = new WebAssembly.Module(buffer_2);
let imports_2 = {
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
let instance_2 = new WebAssembly.Instance(module_2, imports_2);
let exports_2 = instance_2.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file1.sb */
/*
(module
 (type $0 (func (param i32)))
 (type $1 (func))
 (type $2 (func (param f64)))
 (type $3 (func (param i64)))
 (type $4 (func (param f32)))
 (import "$submodule" "$memory" (memory $$memory 0))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "$submodule" "$memoryOffset" (global $$memoryOffset i32))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "file2" "f_[]->[]" (func $"F_[]->[]"))
 (import "file2" "f_[$b]->[]" (func $"F_[$b]->[]" (param i32)))
 (import "$submodule" "show_[$i]->[]" (func $"show_[$i]->[]" (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $"show_[$iu]->[]" (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $"show_[$id]->[]" (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $"show_[$f]->[]" (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $"show_[$fd]->[]" (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $"show_[$b]->[]" (param i32)))
 (import "$submodule" "show_[$s]->[]" (func $"show_[$s]->[]" (param i32)))
 (global $Y (mut i32) (i32.const 17))
 (data $0 (global.get $$memoryOffset) "")
 (elem $$functions (global.get $$tableOffset) $"f_[]->[]" $"f_[$b]->[]" $"f_[$fd]->[]" $"f_[[$i]->[]]->[]")
 (export "Y" (global $Y))
 (export "f_[$b]->[]" (func $"f_[$b]->[]"))
 (export "f_[[$i]->[]]->[]" (func $"f_[[$i]->[]]->[]"))
 (func $"f_[]->[]"
  (call $"show_[$i]->[]"
   (i32.const 11)
  )
 )
 (func $"f_[$b]->[]" (param $0 i32)
  (call $"show_[$i]->[]"
   (i32.const 12)
  )
  (call $"show_[$i]->[]"
   (global.get $Y)
  )
 )
 (func $"f_[$fd]->[]" (param $0 f64)
  (local $1 i32)
  (local.set $1
   (i32.add
    (global.get $$tableOffset)
    (i32.const 1)
   )
  )
  (call $"show_[$i]->[]"
   (i32.const 13)
  )
 )
 (func $"f_[[$i]->[]]->[]" (param $0 i32)
  (call $"show_[$i]->[]"
   (i32.const 14)
  )
  (call_indirect (type $0)
   (i32.const 144)
   (local.get $0)
  )
 )
)
*/

let buffer_1 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,124,0,96,1,126,0,96,1,125,0,2,200,2,13,5,102,105,108,101,50,8,102,95,91,93,45,62,91,93,0,1,5,102,105,108,101,50,10,102,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,115,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,36,109,101,109,111,114,121,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,7,36,109,101,109,111,114,121,2,0,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,5,4,1,0,2,0,6,6,1,127,1,65,17,11,7,37,3,1,89,3,2,10,102,95,91,36,98,93,45,62,91,93,0,10,16,102,95,91,91,36,105,93,45,62,91,93,93,45,62,91,93,0,12,9,10,1,0,35,1,11,4,9,10,11,12,12,1,1,10,50,4,6,0,65,11,16,2,11,10,0,65,12,16,2,35,2,16,2,11,15,1,1,127,35,1,65,1,106,33,1,65,13,16,2,11,14,0,65,14,16,2,65,144,1,32,0,17,0,0,11,11,6,1,0,35,0,11,0])).buffer;
let module_1 = new WebAssembly.Module(buffer_1);
let imports_1 = {
    '$submodule': {
        '$memory': memory,
        '$memoryOffset': new WebAssembly.Global({
            value: 'i32'
        }, 0),
        '$table': table,
        '$tableOffset': new WebAssembly.Global({
            value: 'i32'
        }, 1),
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
    },
    'file2': {
        'f_[]->[]': exports_2['f_[]->[]'],
        'f_[$b]->[]': exports_2['f_[$b]->[]']
    }
};
let instance_1 = new WebAssembly.Instance(module_1, imports_1);
let exports_1 = instance_1.exports;

/* file:///home/nerijus/Dropbox/Nerijus+SparkWave/silverbullet/sbc/test/1/file0.sb */
/*
(module
 (type $0 (func (param i32)))
 (type $1 (func))
 (type $2 (func (param i64)))
 (type $3 (func (param f32)))
 (type $4 (func (param f64)))
 (import "$submodule" "$memory" (memory $$memory 0))
 (import "$submodule" "$table" (table $$table 0 funcref))
 (import "file1" "Y" (global $Y (mut i32)))
 (import "$submodule" "$memoryOffset" (global $$memoryOffset i32))
 (import "$submodule" "$tableOffset" (global $$tableOffset i32))
 (import "file1" "f_[$b]->[]" (func $"file1.f_[$b]->[]" (param i32)))
 (import "file1" "f_[[$i]->[]]->[]" (func $"file1.f_[[$i]->[]]->[]" (param i32)))
 (import "$submodule" "show_[$i]->[]" (func $"show_[$i]->[]" (param i32)))
 (import "$submodule" "show_[$iu]->[]" (func $"show_[$iu]->[]" (param i32)))
 (import "$submodule" "show_[$id]->[]" (func $"show_[$id]->[]" (param i64)))
 (import "$submodule" "show_[$f]->[]" (func $"show_[$f]->[]" (param f32)))
 (import "$submodule" "show_[$fd]->[]" (func $"show_[$fd]->[]" (param f64)))
 (import "$submodule" "show_[$b]->[]" (func $"show_[$b]->[]" (param i32)))
 (import "$submodule" "show_[$s]->[]" (func $"show_[$s]->[]" (param i32)))
 (global $X (mut i32) (i32.const 14))
 (data $0 (global.get $$memoryOffset) "")
 (elem $$functions (global.get $$tableOffset) $"file1.f_[$b]->[]" $"file1.f_[[$i]->[]]->[]")
 (export "X" (global $X))
 (func $f (param $0 i32)
  (call $"show_[$i]->[]"
   (local.get $0)
  )
 )
 (func $start
  (local $0 i32)
  (call $"show_[$i]->[]"
   (global.get $Y)
  )
  (local.set $0
   (i32.add
    (global.get $$tableOffset)
    (i32.const 0)
   )
  )
  (call_indirect (type $0)
   (i32.eq
    (i32.const 159)
    (i32.add
     (i32.const 158)
     (i32.const 1)
    )
   )
   (local.get $0)
  )
  (global.set $Y
   (i32.const 159)
  )
  (call_indirect (type $0)
   (i32.const 0)
   (local.get $0)
  )
 )
)
*/

let buffer_0 = (new Uint8Array([0,97,115,109,1,0,0,0,1,20,5,96,1,127,0,96,0,0,96,1,126,0,96,1,125,0,96,1,124,0,2,219,2,14,5,102,105,108,101,49,10,102,95,91,36,98,93,45,62,91,93,0,0,5,102,105,108,101,49,16,102,95,91,91,36,105,93,45,62,91,93,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,2,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,3,10,36,115,117,98,109,111,100,117,108,101,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,4,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,0,10,36,115,117,98,109,111,100,117,108,101,13,115,104,111,119,95,91,36,115,93,45,62,91,93,0,0,5,102,105,108,101,49,1,89,3,127,1,10,36,115,117,98,109,111,100,117,108,101,13,36,109,101,109,111,114,121,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,10,36,115,117,98,109,111,100,117,108,101,7,36,109,101,109,111,114,121,2,0,0,10,36,115,117,98,109,111,100,117,108,101,6,36,116,97,98,108,101,1,112,0,0,3,3,2,0,1,6,6,1,127,1,65,14,11,7,5,1,1,88,3,3,9,8,1,0,35,2,11,2,0,1,12,1,1,10,51,2,6,0,32,0,16,2,11,42,1,1,127,35,0,16,2,35,2,65,0,106,33,0,65,159,1,65,158,1,65,1,106,70,32,0,17,0,0,65,159,1,36,0,65,0,32,0,17,0,0,11,11,6,1,0,35,1,11,0])).buffer;
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
        }, 5),
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
    },
    'file1': {
        'Y': exports_1['Y'],
        'f_[$b]->[]': exports_1['f_[$b]->[]'],
        'f_[[$i]->[]]->[]': exports_1['f_[[$i]->[]]->[]']
    }
};
let instance_0 = new WebAssembly.Instance(module_0, imports_0);
let exports_0 = instance_0.exports;

export { exports_0 as 'file0' };