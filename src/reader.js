import fs from 'fs';

async function readModule(compiler, module) {
    try {
        module.code = (await fs.promises.readFile(new URL(module.path))).toString();
    } catch (err) {
        throw {
            message: `the file '${ module.path }' cannot be opened (${ err.message })`,
            code: 'E_READ'
        };
    }
    module.status = 'READ';
}

export { readModule };
