"use strict";

const fs = require("fs");
const path = require("path");

const binDir = path.join(__dirname, "..", "node_modules", ".bin");
const nativeTsc = path.join(
  __dirname,
  "..",
  "node_modules",
  "typescript",
  "bin",
  "tsc",
);
const binTsc = path.join(binDir, "tsc");

if (!fs.existsSync(nativeTsc) || !fs.existsSync(binDir)) {
  process.exit(0);
}

const desired = path.relative(binDir, nativeTsc);

try {
  const current = fs.readlinkSync(binTsc);
  if (current === desired) {
    process.exit(0);
  }
} catch {
  // Missing or not a symlink; replace it below.
}

fs.rmSync(binTsc, { force: true });
fs.symlinkSync(desired, binTsc);
