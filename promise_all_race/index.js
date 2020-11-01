// 引用之前已写好的promise
const { FullPromise } = require('../promise');
const Promise = FullPromise;

/*
* 为Promsie添加all方法, Promise.all是解决并发问题的，多个异步并发获取最终的结果(如果有一个失败则失败)
*/
Promise.all = ( values ) => {
  if ( !Array.isArray(values) ) {
    const type = typeof values;

    throw new TypeError(`TypeError: ${type} ${values} is not iterable`);
  }
  else {
    return new Promise((resolve, reject) => {
      let resultArr = [],           // 保存所有并发的值
          orderIndex = 0;           // values的索引值

      values.forEach((value, i) => {
        // 如果时个promise, 则获取promise的值
        if ( value && typeof value.then === 'function' ) {
          value.then(res => {
            processResultByKey( res, i );
          }, reject);
        }
        // 否则直接获取值
        else {
          processResultByKey( value, i );
        }
      })

      function processResultByKey( value, index ) {
        resultArr[index] = value;        // 保存结果

        if ( ++orderIndex === values.length ) {
          resolve(resultArr);            // 最终以promise返回所有的值
        }
      }
    });
  }
}

/*
* Promise添加race方法, Promise处理多个请求时，采用最快的(谁先完成用谁)
*/
Promise.race = function( promises ) {
  return new Promise((resolve, reject) => {
    for ( let i = 0, len = promises.length; i < len; i++ ) {
      const value = promises[i];

      if ( value && typeof value.then === 'function' ) {
        value.then(resolve, reject);
      }
      else {
        resolve(value);
        break;
      }
    }
  });
}

module.exports = Promise;
