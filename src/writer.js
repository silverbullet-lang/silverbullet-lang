import fs from 'fs';

async function write(compiler) {
    try {
        await fs.promises.writeFile(new URL(compiler.options.output), compiler.executable);
    } catch (err) {
        throw {
            message: `the file '${ compiler.options.output }' cannot be created (${ err.message })`,
            code: 'E_WRITE'
        };
    }
}

export { write };
