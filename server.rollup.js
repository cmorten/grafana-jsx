import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "./src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
  plugins: [
    json(),
    babel({
      exclude: [/node_modules/],
    }),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    terser(),
  ],
};
