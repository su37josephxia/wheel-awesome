test('测试instanceof', () => {
    const myInstanceOf = require('../index');
    const arr = [12345];
  
    expect(myInstanceOf(arr, Array)).toBe(true);
  });