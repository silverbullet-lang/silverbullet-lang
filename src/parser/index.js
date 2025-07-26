import Jison from './jison.js';
import { getNewNode, getNodeById, setMainNode } from '../module.js';

function parseModule(compiler, module) {
    let jison = Jison;

    jison.yy.getNewNode = getNewNode;
    jison.yy.getNodeById = getNodeById;
    jison.yy.setMainNode = setMainNode;
    jison.yy.compiler = compiler;
    jison.yy.module = module;
    jison.parse(module.code);
    module.status = 'PARSED';
}

export { parseModule };
