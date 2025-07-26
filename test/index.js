async function main() {
    let argList = process.argv.slice(2);

    if (argList.length === 1) {
        let testNumber = parseInt(argList[0], 10);

        await import(`./${ testNumber }/index.js`);
    } else if (argList.length === 2) {
        let firstTestNumber = parseInt(argList[0], 10);
        let lastTestNumber = parseInt(argList[1], 10);

        while (firstTestNumber <= lastTestNumber) {
            await import(`./${ firstTestNumber }/index.js`);
            firstTestNumber++;
        }
    }
}

main();
