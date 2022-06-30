import fs from 'fs';
import throwError from './error.js';

async function read(module) {
    try {
        module.code = (await fs.promises.readFile(module.url)).toString();
    } catch (err) {
        throwError(module, {
            message: `the file '${ module.url.href }' cannot be opened`
        });
    }
}

export default read;
