test('测试快速排序算法', () => {
  const quickSort = require('../index');
  const arr = [3, 4, 1, 2, 5, 18, 6 , 9, 20, 4];
  const res = quickSort(arr);

  expect(res)
    .toStrictEqual([1, 2, 3, 4, 4, 5, 6, 9, 18, 20]);
});