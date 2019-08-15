const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Remove build directory
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
// Read solidity contract file
const storyPath = path.resolve(__dirname, "contracts", "Story.sol");
const source = fs.readFileSync(storyPath, "utf-8");
const input = {
  language: "Solidity",
  sources: {
    "Story.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Story.sol"
];

fs.ensureDirSync(buildPath);

Object.keys(output).forEach(contract => {
  fs.outputJSONSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
});
