"use strict";

// typescript-eslint still needs the TypeScript 6 compiler API. TypeScript 7
// (the project-local `tsc`) is a native Go port and does not export that API
// until 7.1. Redirect `require("typescript")` to Microsoft's compatibility
// package for this ESLint process only.
const Module = require("module");
const originalLoad = Module._load;

Module._load = function load(request, parent, isMain) {
  if (request === "typescript") {
    return originalLoad.call(this, "@typescript/typescript6", parent, isMain);
  }
  return originalLoad.call(this, request, parent, isMain);
};
