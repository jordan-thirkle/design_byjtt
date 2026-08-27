const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const required = ["index.html", "src/app.js", "src/styles.css", "fixtures/analytics.json"];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  process.exit(1);
}

const fixture = JSON.parse(fs.readFileSync(path.join(root, "fixtures/analytics.json"), "utf8"));
const app = fs.readFileSync(path.join(root, "src/app.js"), "utf8");

const states = ["loading", "empty", "partial", "error"];
const stateCoverage = states.every((state) => app.includes(`state === "${state}"`));
const fixtureCoverage = ["headline", "trend", "segments", "anomalies", "recentEvents"].every((key) => key in fixture);

if (!stateCoverage || !fixtureCoverage) {
  console.error("State or fixture coverage check failed.");
  process.exit(1);
}

console.log("Static implementation checks passed.");
