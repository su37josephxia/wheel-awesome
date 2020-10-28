/**
 * 节流
 * @param {*} fn 将执行的函数
 * @param {*} time 节流规定的时间
 */
function throttle(fn, time) {
  let timer = null
  return (...args) => {
    // 若timer === false，则执行，并在指定时间后将timer重制
    if(!timer){
      fn.apply(this, args)
  
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}

/**
 * 防抖
 * @param {*} fn 将执行的函数
 * @param {*} time 指定防抖持续时间
 */
function debounce(fn, time) {
  let timer = null
  
  return (...args) => {
    // 重新执行并停止上次执行（若上次还未执行则会被清除）
    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, time)
  }
}

module.exports = { throttle, debounce }