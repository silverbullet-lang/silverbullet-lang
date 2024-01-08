import cp from 'child_process';

function main() {
    let file = './test/7/cli.sh';
    let argList = [];
    let options = {};
    let stdout = cp.execFileSync(file, argList, options);

    console.log(stdout.toString());
}

main();
