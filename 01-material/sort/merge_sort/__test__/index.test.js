const mergeSort = require("../index");

it("归并排序", () => {
  const result = mergeSort([9, 3, 5, 1, 0]);
  expect(result.join(",")).toBe("0,1,3,5,9");
});
