const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.md": ["npm run format"],
  "*.{tsx,js,ts}": ["npm run format", buildEslintCommand],
  "*.{tsx,ts}": "bash -c 'npm run typecheck'",
};
