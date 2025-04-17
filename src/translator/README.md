# How to generate the file ./binaryen.js?

# Before starting, install git and cmake
mkdir binaryen
cd binaryen
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
git pull
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
cd ..
# Download and extract the latest release of source code of binaryen into the folder vX
cd vX
emcmake cmake -DBUILD_TESTS=OFF .
emmake make binaryen_js
cd ..
cd ..
cp ./binaryen/vX/bin/binaryen_js.js ./binaryen.js
rm -rf binaryen
