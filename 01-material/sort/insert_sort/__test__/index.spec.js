test('测试插入排序', () => {
  const insert_sort = require('../index');
  const arr = [3, 4, 1, 2];
  const res = insert_sort(arr);

  expect(res)
    .toStrictEqual([1, 2, 3, 4]);
});