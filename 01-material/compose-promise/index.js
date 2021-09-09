/**
 * Promise版本的compose函数，可以让promise按照顺序执行，也可以混入非promise的同步函数
 * @param  {...any} fns
 * @returns
 */
module.exports.compose = (...fns) => {
  if(fns.length<1) fns.push(()=>{})
  if(fns.some(fn=>typeof fn !== 'function')) throw new TypeError("params should be all function")
  const first = fns.shift();
  return (...args) =>
    fns.reduce(
      (a, b) => a.then((res) => Promise.resolve(b(res))),
      Promise.resolve(first(args))
    );
};
