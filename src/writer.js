import fs from 'fs';
import throwError from './error.js';

async function write(module) {
    try {
        await fs.promises.writeFile(new URL(`${ module.url.href }.js`), module.executable);
    } catch (err) {
        throwError(module, {
            message: `the file '${ module.url.href }.js' cannot be created`
        });
    }
}

export default write;
