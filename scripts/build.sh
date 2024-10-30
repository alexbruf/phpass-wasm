wasm-pack build --target web --release --out-dir pkg
mkdir -p wasm
cp pkg/phpass_wasm_bg.wasm ./wasm/phpass_wasm.wasm
cp pkg/phpass_wasm.js ./lib/phpass_wasm.mjs


node scripts/make_json
node --max-old-space-size=4096 ./node_modules/rollup/dist/bin/rollup -c
npx tsc ./lib/index --outDir ./dist --downlevelIteration --emitDeclarationOnly --declaration --resolveJsonModule --allowSyntheticDefaultImports
npx esbuild --platform=node --bundle  --outdir=lib pkg/phpass_wasm.js
