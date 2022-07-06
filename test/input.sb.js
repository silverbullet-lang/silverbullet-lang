let wasm = new Uint8Array([0,97,115,109,1,0,0,0,1,46,10,96,2,127,127,0,96,1,127,1,127,96,1,127,0,96,0,0,96,3,127,127,127,0,96,2,127,127,1,127,96,1,126,0,96,1,125,0,96,1,124,0,96,0,1,127,2,152,2,11,7,105,109,112,111,114,116,115,13,115,104,111,119,95,91,36,105,93,45,62,91,93,0,2,7,105,109,112,111,114,116,115,14,115,104,111,119,95,91,36,105,117,93,45,62,91,93,0,2,7,105,109,112,111,114,116,115,14,115,104,111,119,95,91,36,105,100,93,45,62,91,93,0,6,7,105,109,112,111,114,116,115,13,115,104,111,119,95,91,36,102,93,45,62,91,93,0,7,7,105,109,112,111,114,116,115,14,115,104,111,119,95,91,36,102,100,93,45,62,91,93,0,8,7,105,109,112,111,114,116,115,13,115,104,111,119,95,91,36,98,93,45,62,91,93,0,2,7,105,109,112,111,114,116,115,23,116,104,114,111,119,79,117,116,79,102,77,101,109,111,114,121,95,91,93,45,62,91,93,0,3,7,105,109,112,111,114,116,115,25,116,104,114,111,119,83,116,97,99,107,79,118,101,114,102,108,111,119,95,91,93,45,62,91,93,0,3,7,105,109,112,111,114,116,115,12,36,116,97,98,108,101,79,102,102,115,101,116,3,127,0,7,105,109,112,111,114,116,115,7,36,109,101,109,111,114,121,2,0,1,7,105,109,112,111,114,116,115,6,36,116,97,98,108,101,1,112,0,0,3,23,22,4,5,9,0,1,0,1,0,1,0,1,0,1,0,1,4,5,2,2,3,3,3,6,21,4,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,7,131,6,27,12,115,116,97,99,107,80,111,105,110,116,101,114,3,1,15,115,116,97,99,107,84,111,112,80,111,105,110,116,101,114,3,2,11,104,101,97,112,80,111,105,110,116,101,114,3,3,16,102,114,101,101,67,104,117,110,107,80,111,105,110,116,101,114,3,4,28,105,110,105,116,105,97,108,105,122,101,95,91,36,105,117,44,36,105,117,44,36,105,117,93,45,62,91,93,0,8,27,103,101,116,80,97,100,100,105,110,103,95,91,36,105,117,44,36,105,117,93,45,62,91,36,105,117,93,0,9,23,103,101,116,77,101,109,111,114,121,83,105,122,101,95,91,93,45,62,91,36,105,117,93,0,10,23,103,114,111,119,77,101,109,111,114,121,95,91,36,105,117,44,36,98,93,45,62,91,93,0,11,21,97,108,108,111,99,97,116,101,95,91,36,105,117,93,45,62,91,36,105,117,93,0,12,26,115,101,116,67,104,117,110,107,83,105,122,101,95,91,36,105,117,44,36,105,117,93,45,62,91,93,0,13,25,103,101,116,67,104,117,110,107,83,105,122,101,95,91,36,105,117,93,45,62,91,36,105,117,93,0,14,37,115,101,116,67,104,117,110,107,82,101,97,99,104,97,98,108,101,83,116,97,116,117,115,95,91,36,105,117,44,36,105,117,93,45,62,91,93,0,15,36,103,101,116,67,104,117,110,107,82,101,97,99,104,97,98,108,101,83,116,97,116,117,115,95,91,36,105,117,93,45,62,91,36,105,117,93,0,16,42,115,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,76,105,115,116,83,105,122,101,95,91,36,105,117,44,36,105,117,93,45,62,91,93,0,17,41,103,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,76,105,115,116,83,105,122,101,95,91,36,105,117,93,45,62,91,36,105,117,93,0,18,39,115,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,73,110,100,101,120,95,91,36,105,117,44,36,105,117,93,45,62,91,93,0,19,38,103,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,73,110,100,101,120,95,91,36,105,117,93,45,62,91,36,105,117,93,0,20,32,115,101,116,67,104,117,110,107,78,101,119,80,111,105,110,116,101,114,95,91,36,105,117,44,36,105,117,93,45,62,91,93,0,21,31,103,101,116,67,104,117,110,107,78,101,119,80,111,105,110,116,101,114,95,91,36,105,117,93,45,62,91,36,105,117,93,0,22,38,115,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,95,91,36,105,117,44,36,105,117,44,36,105,117,93,45,62,91,93,0,23,37,103,101,116,67,104,117,110,107,67,104,105,108,100,80,111,105,110,116,101,114,95,91,36,105,117,44,36,105,117,93,45,62,91,36,105,117,93,0,24,19,115,116,97,99,107,80,117,115,104,95,91,36,105,117,93,45,62,91,93,0,25,18,115,116,97,99,107,80,111,112,95,91,36,105,117,93,45,62,91,93,0,26,17,109,97,114,107,67,104,117,110,107,115,95,91,93,45,62,91,93,0,27,18,115,119,101,101,112,77,101,109,111,114,121,95,91,93,45,62,91,93,0,28,12,115,116,97,114,116,95,91,93,45,62,91,93,0,29,7,36,109,101,109,111,114,121,2,0,8,1,29,9,6,1,0,35,0,11,0,10,143,9,22,89,1,2,127,32,0,32,0,65,4,16,9,106,33,0,32,1,32,1,65,4,16,9,106,33,1,32,2,32,2,65,4,16,9,106,33,2,32,0,36,1,35,1,36,2,35,1,32,1,106,36,3,35,3,36,4,16,10,33,3,32,0,32,1,106,32,2,106,33,4,32,3,32,4,73,4,64,32,4,32,3,107,65,1,16,11,5,1,11,11,14,0,32,1,32,0,32,1,112,107,32,1,112,15,11,10,0,63,0,65,128,128,4,108,15,11,44,0,32,0,32,0,65,128,128,4,16,9,106,33,0,32,0,65,128,128,4,110,64,0,65,0,65,1,107,70,4,64,32,1,4,64,16,6,5,1,11,5,1,11,11,121,1,3,127,65,4,65,4,106,65,4,106,32,0,106,33,1,32,1,32,1,65,4,16,9,106,33,1,16,10,33,2,32,2,35,4,107,32,1,73,4,64,32,1,32,2,35,4,107,107,65,0,16,11,16,10,33,2,32,2,35,4,107,32,1,73,4,64,32,2,35,4,107,32,1,73,4,64,16,6,5,1,11,5,1,11,5,1,11,35,4,33,3,35,4,32,1,106,36,4,32,3,32,1,16,13,32,3,65,0,16,15,32,3,65,0,16,19,32,3,15,11,9,0,32,0,32,1,54,2,0,11,8,0,32,0,40,2,0,15,11,57,1,2,127,32,0,65,4,106,33,2,32,2,40,2,0,33,3,32,1,65,0,70,4,64,32,3,65,1,65,1,116,65,127,115,113,33,3,5,32,3,65,1,65,1,116,114,33,3,11,32,2,32,3,54,2,0,11,40,1,2,127,32,0,65,4,106,33,1,32,1,40,2,0,33,2,32,2,65,1,65,1,116,113,65,0,70,4,64,65,0,15,5,65,1,15,11,0,11,47,1,2,127,32,0,65,4,106,33,2,32,2,40,2,0,33,3,32,3,65,0,65,1,107,65,2,116,65,127,115,113,32,1,65,2,116,114,33,3,32,2,32,3,54,2,0,11,24,1,2,127,32,0,65,4,106,33,1,32,1,40,2,0,33,2,32,2,65,2,118,15,11,21,1,1,127,32,0,65,4,106,65,4,106,33,2,32,2,32,1,54,2,0,11,20,1,1,127,32,0,65,4,106,65,4,106,33,1,32,1,40,2,0,15,11,21,1,1,127,32,0,65,4,106,65,4,106,33,2,32,2,32,1,54,2,0,11,20,1,1,127,32,0,65,4,106,65,4,106,33,1,32,1,40,2,0,15,11,30,1,1,127,32,0,65,4,106,65,4,106,65,4,106,65,4,32,1,108,106,33,3,32,3,32,2,54,2,0,11,29,1,1,127,32,0,65,4,106,65,4,106,65,4,106,65,4,32,1,108,106,33,2,32,2,40,2,0,15,11,27,0,35,2,35,3,73,4,64,35,2,32,0,54,2,0,35,2,65,4,106,36,2,5,16,7,11,11,12,0,35,2,65,4,32,0,108,107,36,2,11,167,1,1,7,127,35,1,33,0,3,64,32,0,35,2,73,4,64,2,64,32,0,40,2,0,33,1,65,0,65,1,107,33,2,3,64,32,1,65,0,65,1,107,71,4,64,2,64,32,1,16,20,33,3,32,1,16,18,33,4,32,3,32,4,73,4,64,32,1,32,3,16,24,33,5,32,1,32,3,32,2,16,23,32,1,33,2,32,5,33,1,5,32,1,65,1,16,15,32,1,33,6,32,2,33,1,32,1,65,0,65,1,107,71,4,64,32,1,16,20,33,3,32,1,32,3,16,24,33,2,32,1,32,3,32,6,16,23,32,1,32,3,65,1,106,16,19,5,1,11,11,11,12,1,11,11,32,0,65,4,106,33,0,11,12,1,11,11,11,195,2,1,13,127,35,3,33,0,35,3,33,1,3,64,32,0,35,4,73,4,64,2,64,32,0,16,14,33,2,32,0,16,16,65,1,70,4,64,32,0,32,1,16,21,32,1,32,2,106,33,1,5,1,11,32,0,32,2,106,33,0,11,12,1,11,11,35,1,33,3,3,64,32,3,35,2,73,4,64,2,64,32,3,40,2,0,33,0,32,0,16,22,33,4,32,3,32,4,54,2,0,32,3,65,4,106,33,3,11,12,1,11,11,35,3,33,0,3,64,32,0,35,4,73,4,64,2,64,32,0,16,14,33,5,32,0,16,16,65,1,70,4,64,65,0,33,6,32,0,16,18,33,7,3,64,32,6,32,7,73,4,64,2,64,32,0,32,6,16,24,33,8,32,8,16,22,33,9,32,0,32,6,32,9,16,23,32,6,65,1,106,33,6,11,12,1,11,11,5,1,11,32,0,32,5,106,33,0,11,12,1,11,11,35,3,33,0,3,64,32,0,35,4,73,4,64,2,64,32,0,16,14,33,10,32,0,16,16,65,1,70,4,64,32,0,16,22,33,11,32,11,32,0,32,10,252,10,0,0,5,1,11,32,0,32,10,106,33,0,11,12,1,11,11,32,1,36,4,35,3,33,0,3,64,32,0,35,4,73,4,64,2,64,32,0,16,14,33,12,32,0,65,0,16,15,32,0,65,0,16,19,32,0,32,12,106,33,0,11,12,1,11,11,11,9,0,65,149,154,239,58,16,0,11]);
let wat = `(module
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i64_=>_none (func (param i64)))
 (type $f32_=>_none (func (param f32)))
 (type $f64_=>_none (func (param f64)))
 (type $none_=>_i32 (func (result i32)))
 (import "imports" "$memory" (memory $0 1))
 (import "imports" "$table" (table $$table 0 funcref))
 (import "imports" "$tableOffset" (global $$tableOffset i32))
 (import "imports" "show_[$i]->[]" (func $show_[$i]->[] (param i32)))
 (import "imports" "show_[$iu]->[]" (func $show_[$iu]->[] (param i32)))
 (import "imports" "show_[$id]->[]" (func $show_[$id]->[] (param i64)))
 (import "imports" "show_[$f]->[]" (func $show_[$f]->[] (param f32)))
 (import "imports" "show_[$fd]->[]" (func $show_[$fd]->[] (param f64)))
 (import "imports" "show_[$b]->[]" (func $show_[$b]->[] (param i32)))
 (import "imports" "throwOutOfMemory_[]->[]" (func $throwOutOfMemory_[]->[]))
 (import "imports" "throwStackOverflow_[]->[]" (func $throwStackOverflow_[]->[]))
 (global $stackPointer (mut i32) (i32.const 0))
 (global $stackTopPointer (mut i32) (i32.const 0))
 (global $heapPointer (mut i32) (i32.const 0))
 (global $freeChunkPointer (mut i32) (i32.const 0))
 (elem $$functions (global.get $$tableOffset))
 (export "stackPointer" (global $stackPointer))
 (export "stackTopPointer" (global $stackTopPointer))
 (export "heapPointer" (global $heapPointer))
 (export "freeChunkPointer" (global $freeChunkPointer))
 (export "initialize_[$iu,$iu,$iu]->[]" (func $initialize_[$iu,$iu,$iu]->[]))
 (export "getPadding_[$iu,$iu]->[$iu]" (func $getPadding_[$iu,$iu]->[$iu]))
 (export "getMemorySize_[]->[$iu]" (func $getMemorySize_[]->[$iu]))
 (export "growMemory_[$iu,$b]->[]" (func $growMemory_[$iu,$b]->[]))
 (export "allocate_[$iu]->[$iu]" (func $allocate_[$iu]->[$iu]))
 (export "setChunkSize_[$iu,$iu]->[]" (func $setChunkSize_[$iu,$iu]->[]))
 (export "getChunkSize_[$iu]->[$iu]" (func $getChunkSize_[$iu]->[$iu]))
 (export "setChunkReachableStatus_[$iu,$iu]->[]" (func $setChunkReachableStatus_[$iu,$iu]->[]))
 (export "getChunkReachableStatus_[$iu]->[$iu]" (func $getChunkReachableStatus_[$iu]->[$iu]))
 (export "setChunkChildPointerListSize_[$iu,$iu]->[]" (func $setChunkChildPointerListSize_[$iu,$iu]->[]))
 (export "getChunkChildPointerListSize_[$iu]->[$iu]" (func $getChunkChildPointerListSize_[$iu]->[$iu]))
 (export "setChunkChildPointerIndex_[$iu,$iu]->[]" (func $setChunkChildPointerIndex_[$iu,$iu]->[]))
 (export "getChunkChildPointerIndex_[$iu]->[$iu]" (func $getChunkChildPointerIndex_[$iu]->[$iu]))
 (export "setChunkNewPointer_[$iu,$iu]->[]" (func $setChunkNewPointer_[$iu,$iu]->[]))
 (export "getChunkNewPointer_[$iu]->[$iu]" (func $getChunkNewPointer_[$iu]->[$iu]))
 (export "setChunkChildPointer_[$iu,$iu,$iu]->[]" (func $setChunkChildPointer_[$iu,$iu,$iu]->[]))
 (export "getChunkChildPointer_[$iu,$iu]->[$iu]" (func $getChunkChildPointer_[$iu,$iu]->[$iu]))
 (export "stackPush_[$iu]->[]" (func $stackPush_[$iu]->[]))
 (export "stackPop_[$iu]->[]" (func $stackPop_[$iu]->[]))
 (export "markChunks_[]->[]" (func $markChunks_[]->[]))
 (export "sweepMemory_[]->[]" (func $sweepMemory_[]->[]))
 (export "start_[]->[]" (func $start_[]->[]))
 (export "$memory" (memory $0))
 (start $start_[]->[])
 (func $initialize_[$iu,$iu,$iu]->[] (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $0
   (i32.add
    (local.get $0)
    (call $getPadding_[$iu,$iu]->[$iu]
     (local.get $0)
     (i32.const 4)
    )
   )
  )
  (local.set $1
   (i32.add
    (local.get $1)
    (call $getPadding_[$iu,$iu]->[$iu]
     (local.get $1)
     (i32.const 4)
    )
   )
  )
  (local.set $2
   (i32.add
    (local.get $2)
    (call $getPadding_[$iu,$iu]->[$iu]
     (local.get $2)
     (i32.const 4)
    )
   )
  )
  (global.set $stackPointer
   (local.get $0)
  )
  (global.set $stackTopPointer
   (global.get $stackPointer)
  )
  (global.set $heapPointer
   (i32.add
    (global.get $stackPointer)
    (local.get $1)
   )
  )
  (global.set $freeChunkPointer
   (global.get $heapPointer)
  )
  (local.set $3
   (call $getMemorySize_[]->[$iu])
  )
  (local.set $4
   (i32.add
    (i32.add
     (local.get $0)
     (local.get $1)
    )
    (local.get $2)
   )
  )
  (if
   (i32.lt_u
    (local.get $3)
    (local.get $4)
   )
   (call $growMemory_[$iu,$b]->[]
    (i32.sub
     (local.get $4)
     (local.get $3)
    )
    (i32.const 1)
   )
   (nop)
  )
 )
 (func $getPadding_[$iu,$iu]->[$iu] (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.rem_u
    (i32.sub
     (local.get $1)
     (i32.rem_u
      (local.get $0)
      (local.get $1)
     )
    )
    (local.get $1)
   )
  )
 )
 (func $getMemorySize_[]->[$iu] (result i32)
  (return
   (i32.mul
    (memory.size)
    (i32.const 65536)
   )
  )
 )
 (func $growMemory_[$iu,$b]->[] (param $0 i32) (param $1 i32)
  (local.set $0
   (i32.add
    (local.get $0)
    (call $getPadding_[$iu,$iu]->[$iu]
     (local.get $0)
     (i32.const 65536)
    )
   )
  )
  (if
   (i32.eq
    (memory.grow
     (i32.div_u
      (local.get $0)
      (i32.const 65536)
     )
    )
    (i32.sub
     (i32.const 0)
     (i32.const 1)
    )
   )
   (if
    (local.get $1)
    (call $throwOutOfMemory_[]->[])
    (nop)
   )
   (nop)
  )
 )
 (func $allocate_[$iu]->[$iu] (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (i32.add
    (i32.add
     (i32.add
      (i32.const 4)
      (i32.const 4)
     )
     (i32.const 4)
    )
    (local.get $0)
   )
  )
  (local.set $1
   (i32.add
    (local.get $1)
    (call $getPadding_[$iu,$iu]->[$iu]
     (local.get $1)
     (i32.const 4)
    )
   )
  )
  (local.set $2
   (call $getMemorySize_[]->[$iu])
  )
  (if
   (i32.lt_u
    (i32.sub
     (local.get $2)
     (global.get $freeChunkPointer)
    )
    (local.get $1)
   )
   (block
    (call $growMemory_[$iu,$b]->[]
     (i32.sub
      (local.get $1)
      (i32.sub
       (local.get $2)
       (global.get $freeChunkPointer)
      )
     )
     (i32.const 0)
    )
    (local.set $2
     (call $getMemorySize_[]->[$iu])
    )
    (if
     (i32.lt_u
      (i32.sub
       (local.get $2)
       (global.get $freeChunkPointer)
      )
      (local.get $1)
     )
     (if
      (i32.lt_u
       (i32.sub
        (local.get $2)
        (global.get $freeChunkPointer)
       )
       (local.get $1)
      )
      (call $throwOutOfMemory_[]->[])
      (nop)
     )
     (nop)
    )
   )
   (nop)
  )
  (local.set $3
   (global.get $freeChunkPointer)
  )
  (global.set $freeChunkPointer
   (i32.add
    (global.get $freeChunkPointer)
    (local.get $1)
   )
  )
  (call $setChunkSize_[$iu,$iu]->[]
   (local.get $3)
   (local.get $1)
  )
  (call $setChunkReachableStatus_[$iu,$iu]->[]
   (local.get $3)
   (i32.const 0)
  )
  (call $setChunkChildPointerIndex_[$iu,$iu]->[]
   (local.get $3)
   (i32.const 0)
  )
  (return
   (local.get $3)
  )
 )
 (func $setChunkSize_[$iu,$iu]->[] (param $0 i32) (param $1 i32)
  (i32.store
   (local.get $0)
   (local.get $1)
  )
 )
 (func $getChunkSize_[$iu]->[$iu] (param $0 i32) (result i32)
  (return
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $setChunkReachableStatus_[$iu,$iu]->[] (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $2
   (i32.add
    (local.get $0)
    (i32.const 4)
   )
  )
  (local.set $3
   (i32.load
    (local.get $2)
   )
  )
  (if
   (i32.eq
    (local.get $1)
    (i32.const 0)
   )
   (local.set $3
    (i32.and
     (local.get $3)
     (i32.xor
      (i32.shl
       (i32.const 1)
       (i32.const 1)
      )
      (i32.const -1)
     )
    )
   )
   (local.set $3
    (i32.or
     (local.get $3)
     (i32.shl
      (i32.const 1)
      (i32.const 1)
     )
    )
   )
  )
  (i32.store
   (local.get $2)
   (local.get $3)
  )
 )
 (func $getChunkReachableStatus_[$iu]->[$iu] (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $1
   (i32.add
    (local.get $0)
    (i32.const 4)
   )
  )
  (local.set $2
   (i32.load
    (local.get $1)
   )
  )
  (if
   (i32.eq
    (i32.and
     (local.get $2)
     (i32.shl
      (i32.const 1)
      (i32.const 1)
     )
    )
    (i32.const 0)
   )
   (return
    (i32.const 0)
   )
   (return
    (i32.const 1)
   )
  )
 )
 (func $setChunkChildPointerListSize_[$iu,$iu]->[] (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $2
   (i32.add
    (local.get $0)
    (i32.const 4)
   )
  )
  (local.set $3
   (i32.load
    (local.get $2)
   )
  )
  (local.set $3
   (i32.or
    (i32.and
     (local.get $3)
     (i32.xor
      (i32.shl
       (i32.sub
        (i32.const 0)
        (i32.const 1)
       )
       (i32.const 2)
      )
      (i32.const -1)
     )
    )
    (i32.shl
     (local.get $1)
     (i32.const 2)
    )
   )
  )
  (i32.store
   (local.get $2)
   (local.get $3)
  )
 )
 (func $getChunkChildPointerListSize_[$iu]->[$iu] (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $1
   (i32.add
    (local.get $0)
    (i32.const 4)
   )
  )
  (local.set $2
   (i32.load
    (local.get $1)
   )
  )
  (return
   (i32.shr_u
    (local.get $2)
    (i32.const 2)
   )
  )
 )
 (func $setChunkChildPointerIndex_[$iu,$iu]->[] (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local.set $2
   (i32.add
    (i32.add
     (local.get $0)
     (i32.const 4)
    )
    (i32.const 4)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $1)
  )
 )
 (func $getChunkChildPointerIndex_[$iu]->[$iu] (param $0 i32) (result i32)
  (local $1 i32)
  (local.set $1
   (i32.add
    (i32.add
     (local.get $0)
     (i32.const 4)
    )
    (i32.const 4)
   )
  )
  (return
   (i32.load
    (local.get $1)
   )
  )
 )
 (func $setChunkNewPointer_[$iu,$iu]->[] (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local.set $2
   (i32.add
    (i32.add
     (local.get $0)
     (i32.const 4)
    )
    (i32.const 4)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $1)
  )
 )
 (func $getChunkNewPointer_[$iu]->[$iu] (param $0 i32) (result i32)
  (local $1 i32)
  (local.set $1
   (i32.add
    (i32.add
     (local.get $0)
     (i32.const 4)
    )
    (i32.const 4)
   )
  )
  (return
   (i32.load
    (local.get $1)
   )
  )
 )
 (func $setChunkChildPointer_[$iu,$iu,$iu]->[] (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local.set $3
   (i32.add
    (i32.add
     (i32.add
      (i32.add
       (local.get $0)
       (i32.const 4)
      )
      (i32.const 4)
     )
     (i32.const 4)
    )
    (i32.mul
     (i32.const 4)
     (local.get $1)
    )
   )
  )
  (i32.store
   (local.get $3)
   (local.get $2)
  )
 )
 (func $getChunkChildPointer_[$iu,$iu]->[$iu] (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local.set $2
   (i32.add
    (i32.add
     (i32.add
      (i32.add
       (local.get $0)
       (i32.const 4)
      )
      (i32.const 4)
     )
     (i32.const 4)
    )
    (i32.mul
     (i32.const 4)
     (local.get $1)
    )
   )
  )
  (return
   (i32.load
    (local.get $2)
   )
  )
 )
 (func $stackPush_[$iu]->[] (param $0 i32)
  (if
   (i32.lt_u
    (global.get $stackTopPointer)
    (global.get $heapPointer)
   )
   (block
    (i32.store
     (global.get $stackTopPointer)
     (local.get $0)
    )
    (global.set $stackTopPointer
     (i32.add
      (global.get $stackTopPointer)
      (i32.const 4)
     )
    )
   )
   (call $throwStackOverflow_[]->[])
  )
 )
 (func $stackPop_[$iu]->[] (param $0 i32)
  (global.set $stackTopPointer
   (i32.sub
    (global.get $stackTopPointer)
    (i32.mul
     (i32.const 4)
     (local.get $0)
    )
   )
  )
 )
 (func $markChunks_[]->[]
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $0
   (global.get $stackPointer)
  )
  (loop $loop_60
   (if
    (i32.lt_u
     (local.get $0)
     (global.get $stackTopPointer)
    )
    (block
     (block
      (local.set $1
       (i32.load
        (local.get $0)
       )
      )
      (local.set $2
       (i32.sub
        (i32.const 0)
        (i32.const 1)
       )
      )
      (loop $loop_61
       (if
        (i32.ne
         (local.get $1)
         (i32.sub
          (i32.const 0)
          (i32.const 1)
         )
        )
        (block
         (block
          (local.set $3
           (call $getChunkChildPointerIndex_[$iu]->[$iu]
            (local.get $1)
           )
          )
          (local.set $4
           (call $getChunkChildPointerListSize_[$iu]->[$iu]
            (local.get $1)
           )
          )
          (if
           (i32.lt_u
            (local.get $3)
            (local.get $4)
           )
           (block
            (local.set $5
             (call $getChunkChildPointer_[$iu,$iu]->[$iu]
              (local.get $1)
              (local.get $3)
             )
            )
            (call $setChunkChildPointer_[$iu,$iu,$iu]->[]
             (local.get $1)
             (local.get $3)
             (local.get $2)
            )
            (local.set $2
             (local.get $1)
            )
            (local.set $1
             (local.get $5)
            )
           )
           (block
            (call $setChunkReachableStatus_[$iu,$iu]->[]
             (local.get $1)
             (i32.const 1)
            )
            (local.set $6
             (local.get $1)
            )
            (local.set $1
             (local.get $2)
            )
            (if
             (i32.ne
              (local.get $1)
              (i32.sub
               (i32.const 0)
               (i32.const 1)
              )
             )
             (block
              (local.set $3
               (call $getChunkChildPointerIndex_[$iu]->[$iu]
                (local.get $1)
               )
              )
              (local.set $2
               (call $getChunkChildPointer_[$iu,$iu]->[$iu]
                (local.get $1)
                (local.get $3)
               )
              )
              (call $setChunkChildPointer_[$iu,$iu,$iu]->[]
               (local.get $1)
               (local.get $3)
               (local.get $6)
              )
              (call $setChunkChildPointerIndex_[$iu,$iu]->[]
               (local.get $1)
               (i32.add
                (local.get $3)
                (i32.const 1)
               )
              )
             )
             (nop)
            )
           )
          )
         )
         (br $loop_61)
        )
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 4)
       )
      )
     )
     (br $loop_60)
    )
   )
  )
 )
 (func $sweepMemory_[]->[]
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local.set $0
   (global.get $heapPointer)
  )
  (local.set $1
   (global.get $heapPointer)
  )
  (loop $loop_68
   (if
    (i32.lt_u
     (local.get $0)
     (global.get $freeChunkPointer)
    )
    (block
     (block
      (local.set $2
       (call $getChunkSize_[$iu]->[$iu]
        (local.get $0)
       )
      )
      (if
       (i32.eq
        (call $getChunkReachableStatus_[$iu]->[$iu]
         (local.get $0)
        )
        (i32.const 1)
       )
       (block
        (call $setChunkNewPointer_[$iu,$iu]->[]
         (local.get $0)
         (local.get $1)
        )
        (local.set $1
         (i32.add
          (local.get $1)
          (local.get $2)
         )
        )
       )
       (nop)
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (local.get $2)
       )
      )
     )
     (br $loop_68)
    )
   )
  )
  (local.set $3
   (global.get $stackPointer)
  )
  (loop $loop_71
   (if
    (i32.lt_u
     (local.get $3)
     (global.get $stackTopPointer)
    )
    (block
     (block
      (local.set $0
       (i32.load
        (local.get $3)
       )
      )
      (local.set $4
       (call $getChunkNewPointer_[$iu]->[$iu]
        (local.get $0)
       )
      )
      (i32.store
       (local.get $3)
       (local.get $4)
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 4)
       )
      )
     )
     (br $loop_71)
    )
   )
  )
  (local.set $0
   (global.get $heapPointer)
  )
  (loop $loop_72
   (if
    (i32.lt_u
     (local.get $0)
     (global.get $freeChunkPointer)
    )
    (block
     (block
      (local.set $5
       (call $getChunkSize_[$iu]->[$iu]
        (local.get $0)
       )
      )
      (if
       (i32.eq
        (call $getChunkReachableStatus_[$iu]->[$iu]
         (local.get $0)
        )
        (i32.const 1)
       )
       (block
        (local.set $6
         (i32.const 0)
        )
        (local.set $7
         (call $getChunkChildPointerListSize_[$iu]->[$iu]
          (local.get $0)
         )
        )
        (loop $loop_74
         (if
          (i32.lt_u
           (local.get $6)
           (local.get $7)
          )
          (block
           (block
            (local.set $8
             (call $getChunkChildPointer_[$iu,$iu]->[$iu]
              (local.get $0)
              (local.get $6)
             )
            )
            (local.set $9
             (call $getChunkNewPointer_[$iu]->[$iu]
              (local.get $8)
             )
            )
            (call $setChunkChildPointer_[$iu,$iu,$iu]->[]
             (local.get $0)
             (local.get $6)
             (local.get $9)
            )
            (local.set $6
             (i32.add
              (local.get $6)
              (i32.const 1)
             )
            )
           )
           (br $loop_74)
          )
         )
        )
       )
       (nop)
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (local.get $5)
       )
      )
     )
     (br $loop_72)
    )
   )
  )
  (local.set $0
   (global.get $heapPointer)
  )
  (loop $loop_76
   (if
    (i32.lt_u
     (local.get $0)
     (global.get $freeChunkPointer)
    )
    (block
     (block
      (local.set $10
       (call $getChunkSize_[$iu]->[$iu]
        (local.get $0)
       )
      )
      (if
       (i32.eq
        (call $getChunkReachableStatus_[$iu]->[$iu]
         (local.get $0)
        )
        (i32.const 1)
       )
       (block
        (local.set $11
         (call $getChunkNewPointer_[$iu]->[$iu]
          (local.get $0)
         )
        )
        (memory.copy
         (local.get $11)
         (local.get $0)
         (local.get $10)
        )
       )
       (nop)
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (local.get $10)
       )
      )
     )
     (br $loop_76)
    )
   )
  )
  (global.set $freeChunkPointer
   (local.get $1)
  )
  (local.set $0
   (global.get $heapPointer)
  )
  (loop $loop_79
   (if
    (i32.lt_u
     (local.get $0)
     (global.get $freeChunkPointer)
    )
    (block
     (block
      (local.set $12
       (call $getChunkSize_[$iu]->[$iu]
        (local.get $0)
       )
      )
      (call $setChunkReachableStatus_[$iu,$iu]->[]
       (local.get $0)
       (i32.const 0)
      )
      (call $setChunkChildPointerIndex_[$iu,$iu]->[]
       (local.get $0)
       (i32.const 0)
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (local.get $12)
       )
      )
     )
     (br $loop_79)
    )
   )
  )
 )
 (func $start_[]->[]
  (call $show_[$i]->[]
   (i32.const 123456789)
  )
 )
)`;
let getExports = function(imports) {
    let module = new WebAssembly.Module(wasm);
    let instance = new WebAssembly.Instance(module, imports);

    return instance.exports;
};

export { wasm, wat, getExports };
