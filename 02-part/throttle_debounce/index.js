exports.throttle = (fn, delay) => {
  // 定义上次触发时间
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now > last + delay) {
      last = now;
      fn.apply(this, args);
    }
  };
};

/**
 * 防抖Debounce
 */
exports.debounce = (fn, delay) => {
  let timer;
  return function(...args) {
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
