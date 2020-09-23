// 第21期学员李宇轩
// 使用generator实现
// 高端的代码，往往只需要最朴素的设计方法，忙碌了一天的小李，偶然发现了责任链模式，从此展开了新的人生旅途
module.exports.compose = middlewares => () => {
    function* chain() {
      for (let index = 0,length = middlewares.length;index < length; ++index) {
        yield middlewares[index]
      }
    }
    const chainCenter = chain();
    const start = chainCenter.next().value;
    // 这里的proxy配合generator模拟递归执行
    function proxy () {
      const fn = chainCenter.next().value;
      const value = typeof fn === 'function' && fn && fn(proxy);
      return Promise.resolve(value);
    }
    return Promise.resolve(typeof start === 'function' && start(proxy))
}
