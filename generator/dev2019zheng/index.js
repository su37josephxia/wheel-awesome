/**
 * @author dev2019zheng
 * @param {*} middlewares: Array
 * @description 利用Generator函数生成compose辅助函数
 */
function* composeGenerator(middlewares) {
  const _middlewares = [...middlewares, function noop() {}];
  const _l = _middlewares.length;
  let _i = 0;
  while (true) {
    yield (next) => {
      _middlewares[_i](() => Promise.resolve(next()));
    };
    _i = ++_i % _l;
  }
}
module.exports.compose = (middlewares) => {
  const gen = composeGenerator(middlewares);
  function _next() {
    gen.next().value(_next);
  }
  return () => Promise.resolve(_next());
};
