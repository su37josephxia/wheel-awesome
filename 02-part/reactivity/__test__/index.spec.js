const vue2 = require("../vue2");
const vue3 = require("../vue3");
const test = require("../test-case");
describe("reactivity/vue2", () => {
  test(vue2);
});
describe("reactivity/vue3", () => {
  test(vue3);
});
