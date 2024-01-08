#!/usr/bin/env sh

node ./cli.js --input=./test/7/file0.sb --minMemorySize=1
node ./test/7/driver.js
