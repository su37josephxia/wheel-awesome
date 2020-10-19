/**
 * 节流Throttle
 */
module.exports.throttle = (fn, delay) => {
  // 定义上次触发时间
  let timeOut;
  return (...args) => {
    if(!timeOut) {
      timeOut = setTimeout(() => {
        timeOut = null
        fn.call(this, ...args)
      }, delay)
    }

  }
};
/**
 * 防抖Debounce
 */
module.exports.debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    // 判断定时器是否存在，清除定时器
    if(timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(this,...args)
    }, delay)
  }; 
};
