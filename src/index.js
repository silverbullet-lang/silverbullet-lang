import getModule from './module.js';
import read from './reader.js';
import parse from './parser/index.js';
import check from './checker.js';
import translate from './translator/index.js';
import link from './linker.js';
import write from './writer.js';

async function compile(options) {
    let module = getModule(new URL(options.input));

    await read(module);
    parse(module);
    check(module);
    translate(module);
    link(module);
    await write(module);
}

export default compile;
