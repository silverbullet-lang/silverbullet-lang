import fs from 'fs';
import jison from 'jison';

async function build() {
    try {
        let grammarSrc = (await fs.promises.readFile(new URL('./grammar.jison', import.meta.url))).toString();
        let jisonSrc = (new jison.Parser(grammarSrc)).generate({
            moduleType: 'js',
            moduleName: 'Jison'
        });

        jisonSrc = `${ jisonSrc }

export default Jison;`;
        await fs.promises.writeFile(new URL('./jison.js', import.meta.url), jisonSrc);
    } catch (err) {
        console.log(err);
        process.exit(5);
    }
}

build();
