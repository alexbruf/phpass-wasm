/* eslint-disable import/no-extraneous-dependencies */
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
// import gzipPlugin from 'rollup-plugin-gzip';
import license from "rollup-plugin-license";

const ALGORITHMS = ["phpass"];

const TERSER_CONFIG = {
  output: {
    comments: false,
  },
};

const LICENSE_CONFIG = {
  banner: {
    commentStyle: "ignored",
    content: `phpass-wasm (https://www.npmjs.com/package/phpass-wasm)
    (c) Alex Brufsky
    @license MIT`,
  },
};

const MAIN_BUNDLE_CONFIG = {
  input: "lib/index.ts",
  output: [
    {
      file: "dist/index.umd.js",
      name: "hashwasm",
      format: "umd",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
  ],
  plugins: [json(), typescript(), license(LICENSE_CONFIG)],
};

const MINIFIED_MAIN_BUNDLE_CONFIG = {
  input: "lib/index.ts",
  output: [
    {
      file: "dist/index.umd.min.js",
      name: "hashwasm",
      format: "umd",
    },
    {
      file: "dist/index.esm.min.js",
      format: "es",
    },
  ],
  plugins: [
    json(),
    typescript(),
    terser(TERSER_CONFIG),
    license(LICENSE_CONFIG),
  ],
};

const INDIVIDUAL_BUNDLE_CONFIG = (algorithm) => ({
  input: `lib/${algorithm}.ts`,
  output: [
    {
      file: `dist/${algorithm}.umd.min.js`,
      name: "phpasswasm",
      format: "umd",
      extend: true,
    },
  ],
  plugins: [
    json(),
    typescript(),
    terser(TERSER_CONFIG),
    license(LICENSE_CONFIG),
    // gzipPlugin(),
  ],
});

export default [
  MAIN_BUNDLE_CONFIG,
  MINIFIED_MAIN_BUNDLE_CONFIG,
  ...ALGORITHMS.map(INDIVIDUAL_BUNDLE_CONFIG),
];
