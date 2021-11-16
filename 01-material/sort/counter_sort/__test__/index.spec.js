test('测试计数排序算法', () => {
  const sort = require('../index')
  const arr = [5, 2, 3, 1, 4]
  const res = sort(arr)

  expect(res).toStrictEqual([1, 2, 3, 4, 5])
})
