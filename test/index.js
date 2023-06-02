async function main(argList) {
    let testName = argList[0];

    await import(`./${ testName }/index.js`);
}

main(process.argv.slice(2));
