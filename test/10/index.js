import { compile } from '../../src/index.js';

async function main() {
    try {
        let module;

        await compile({
            input: (new URL('./file0.sb', import.meta.url)).href,
            libraryFolder: (new URL('./', import.meta.url)).href
        });
        module = await import('./file0.sb.js');
        console.log(module);
        module.exports.start();
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

main();
