module.exports = {
  roots: ["<rootDir>/test"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
		"^.+\\.mjs$": "babel-jest",
    "^.+phpass_wasm\\.js$": "ts-jest",
    "^.+phpass_wasm\\.mjs$": "ts-jest",
  },
  cacheDirectory: "<rootDir>/.jest-cache",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs", "json", "node"],
};
