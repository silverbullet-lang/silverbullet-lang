# How to generate the file ./binaryen.js?

# Before starting, install git and cmake
mkdir binaryen
cd binaryen
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
git pull --no-rebase
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
cd ..
# Download and extract the latest release of binaryen
cd binaryen
../emsdk/upstream/emscripten/emcmake cmake -DBUILD_TESTS=OFF .
../emsdk/upstream/emscripten/emmake make binaryen_js
cd ..
cd ..
cp ./binaryen/binaryen/bin/binaryen_js.js ./binaryen.js
rm -rf binaryen
