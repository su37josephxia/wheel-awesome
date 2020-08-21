// compose 实现
// 开课吧 20期学员：那猫小帅 <https://gitee.com/mqycn>
// 估计是代码量最少的实现方法

module.exports.compose = (middlewares) => {
  const next = async () => {
    if (middlewares.length > 0) {
      return await middlewares.shift()(next);
    }
  };
  return () => next();
};
