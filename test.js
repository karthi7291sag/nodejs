const http = require("http");
const assert = require("assert");
const server = require("./index");
const fs = require("fs");
const request = require("supertest");
let results = [];
let consoleLogs = [];

http.get("http://localhost:8000", (res) => {
  assert.strictEqual(res.statusCode, 200);
  console.log("✔ Test passed");
  results.push({ name:"Node JS App Test", status: "passed" });
  // Generate JUnit XML
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<testsuite name="supertest-node" tests="${results.length}">`
  ];

  for (const r of results) {
    xml.push(`  <testcase name="${r.name}">`);
    xml.push(`    <system-out>${r.status}</system-out>`);
   // xml.push(`    <system-out><![CDATA[${consoleLogs.join("\n")}]]></system-out>`);
    if (r.status === "failed") {
      xml.push(`    <failure message="${r.error}"/>`);
    }
    xml.push(`  </testcase>`);
  }

  xml.push("</testsuite>");

  fs.mkdirSync("reports/junit", { recursive: true });
  fs.writeFileSync("reports/junit/results.xml", xml.join("\n"));
  console.log("JUnit report saved to reports/junit/results.xml");
  process.exit(0);
}).on("error", (err) => {
  console.error("✖ Test failed:", err);
  results.push({ name: "Node JS App Test", status: "failed", error: err.message });
  process.exit(1);
});

