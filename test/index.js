async function main() {
    let argList = process.argv.slice(2);
    let testName = argList[0];

    await import(`./${ testName }/index.js`);
}

main();
