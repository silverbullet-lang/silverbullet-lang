import cp from 'child_process';

async function main() {
    try {
        let stdout;
        let module;

        /* Compile from CLI */
        stdout = cp.execSync(`node ./cli.js --input=./test/7/file0.sb --minMemorySize=1`);
        if (stdout.length === 0) {
            /* Compilation is successful */
            /* Call 'start' from the compiled file */
            module = await import('./file0.sb.js');
            console.log(module);
            module.exports.start();
        } else {
            /* Compilation is not successful */
            /* Print error message from the compiler */
            console.log(stdout.toString());
        }
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

main();
