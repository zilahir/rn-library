const fs = require("fs");

interface O {
  [key: string]: any;
}

const wrap: O = {};
const out: O = {};

wrap[process.argv[2]] = out;

for (let prop of JSON.parse(fs.readFileSync("/dev/stdin"))) {
  out[prop.OutputKey] = prop.OutputValue;
}

process.stdout.write(JSON.stringify(wrap, null, "  ") + "\n");
