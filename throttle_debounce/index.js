/**
 * 节流Throttle
 */
module.exports.throttle = (fn, delay) => {
  // 定义上次触发时间, isExecute: 在规定时间是否已执行，防止多次调用的二次执行
  let last = 0, isExecute = 0;
  return (...args) => {
    const now = + Date.now();
    console.log("call", now, last, delay);
    if (now > last + delay) {
      last = now;

      if ( !isExecute) {
        fn.apply(this, args);
        isExecute = 1;
      }
      
    }
  };
};

/**
 * 防抖Debounce
 */
module.exports.debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    // 判断定时器是否存在，清除定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 重新调用setTimeout
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
