// 1.导出一个模块
// 2.返回一个函数，函数接收一个函数参数，如果传递该参数执行之，同时传入hi给它
// 3.返回helloworld

module.exports = function (callback) {
  callback && callback("hi");

  return "helloworld";
};
