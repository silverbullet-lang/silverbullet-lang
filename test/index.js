import compile from '../src/index.js';

async function main() {
    try {
        let input;
        let output;

        /* Compile */
        await compile({
            input: (new URL('./input.sb', import.meta.url)).href
        });

        /* Run */
        input = await import('./input.sb.js');
        output = input.getExports({
            imports: {
                '$memory': new WebAssembly.Memory({
                    initial: 1
                }),
                '$table': new WebAssembly.Table({
                    element: 'anyfunc',
                    /* The maximum number of references in the table */
                    initial: 10000000
                }),
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
                'throwOutOfMemory_[]->[]': function() {
                    throw new Error('out of memory');
                },
                'throwStackOverflow_[]->[]': function() {
                    throw new Error('stack overflow');
                }
            }
        });
        console.log(output);
    } catch (err) {
        console.log(err);
    }
}

main();
