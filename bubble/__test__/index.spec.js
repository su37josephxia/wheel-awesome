test('测试冒泡算法', () => {
  const bubble = require('../index');
  const arr = [3, 4, 1, 2];
  const res = bubble(arr);

  expect(res)
    .toStrictEqual([1, 2, 3, 4]);
});