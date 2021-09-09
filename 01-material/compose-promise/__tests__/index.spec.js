const test = require("../test-case");
describe("Compose的Promise组合", () => {
  describe("Compose的Promise版本实现", () => {
    const { compose } = require("../index.js");
    test(compose);
  });
});
