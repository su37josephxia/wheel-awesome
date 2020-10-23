/**
 * 节流Throttle
 */
module.exports.throttle = (fn, delay) => {
  // 定义上次触发时间
  let time 
  return (...args) => {
    if(!time) {
      time = setTimeout(() => {
        time = null
        fn.call(this, ...args)
      }, delay)
    }
  }
};
/**
 * 防抖Debounce
 */
module.exports.debounce = (fn, delay) => {
  let time 
  return (...args) => {
    if(time) {
      clearTimeout(time)
    } 

    time = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
};
