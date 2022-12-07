async function main(argList) {
    let testName = argList[0];

    if (testName === '0') {
        await import('./0/index.js');
    } else if (testName === '1') {
        await import('./1/index.js');
    }
}

main(process.argv.slice(2));
