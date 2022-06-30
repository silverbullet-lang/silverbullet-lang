import Jison from './jison.js';
import throwError from '../error.js';

function parse(module) {
    let jison = Jison;

    jison.yy.module = module;
    jison.yy.throwError = throwError;
    jison.parse(module.code);
}

export default parse;
