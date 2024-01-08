#!/usr/bin/env node

import url from 'url';
import path from 'path';
import { compile } from './src/index.js';

async function main() {
    try {
        let argList = process.argv.slice(2);
        let options = {};

        for (let i = 0; i < argList.length; i++) {
            let arg = argList[i];

            if (arg.slice(0, 2) === '--') {
                let keyEnd = arg.indexOf('=');

                if (-1 < keyEnd) {
                    let key = arg.slice(2, keyEnd);

                    if (0 < key.length) {
                        let value = arg.slice(keyEnd + 1);

                        if (0 < value.length) {
                            if ((key === 'input') || (key === 'output')) {
                                let cwd = `${ process.cwd() }${ path.sep }`;
                                let cwdURL = url.pathToFileURL(cwd);
                                let valueURL = new URL(value, cwdURL);

                                options[key] = valueURL.href;
                            } else if ((key === 'minMemorySize') || (key === 'maxMemorySize')) {
                                let valueNumber = Number.parseFloat(value);

                                if (!Number.isNaN(valueNumber)) {
                                    options[key] = valueNumber;
                                } else {
                                    throw new Error(`value of the compiler option '${ key }' is NaN (Not-A-Number)`);
                                }
                            } else {
                                options[key] = value;
                            }
                        } else {
                            throw new Error(getErrorMessage(arg, 'value is empty'));
                        }
                    } else {
                        throw new Error(getErrorMessage(arg, 'key is empty'));
                    }
                } else {
                    throw new Error(getErrorMessage(arg, 'symbol \'=\' is missing'));
                }
            } else {
                throw new Error(getErrorMessage(arg, 'in the beginning of argument, sequence of symbols \'--\' is missing'));
            }
        }
        await compile(options);
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

function getErrorMessage(arg, reason) {
    return `command line argument '${ arg }' does not satisfy the pattern '--key=value' (${ reason })`;
}

main();
