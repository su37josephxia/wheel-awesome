// promise 的状态值
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

/*
* 基础版Promise，提供最基础的功能...
*/
class BasePromise {
  constructor( executor ) {
    this.status = PENDING;              // 默认状态为PENDING
    this.value = undefined;             // 保存成功状态的值，默认为undefined
    this.reason = undefined;            // 保存失败状态的值
    this.onResolvedCallbacks = [];      // 保存成功的回调
    this.onRejectedCallbacks = [];      // 保存失败的回调

    // 成功时调用的方法
    const resolve = ( value ) => {
      // 状态为PENDING时才可以更新状态，防止executor中调用两次resolve/reject方法
      if ( this.status === PENDING ) {
        this.status = FULFILLED;
        this.value = value;

        // 依次执行对应的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }

    // 失败时调用的方法
    const reject = ( reason ) => {
      // 状态为PENDING时才可以更新状态，防止executor中调用两次resolve/reject方法
      if ( this.status === PENDING ) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      // 立即执行, 将resolve和reject函数传给使用者
      executor( resolve, reject);
    }
    catch ( error ) {
      // 发生异常是执行逻辑
      reject( error )
    }
  }

  // 包含一个then方法,并接收两个参数onFulfilled, onRejected
  then( onFulfilled, onRejected ) {
    if ( this.status === FULFILLED ) {
      onFulfilled(this.value);
    }
    else if ( this.status === REJECTED ){
      onRejected(this.reason);
    }
    else if ( this.status === PENDING ) {
      // 如果promise的状态是PENDING，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次执行对应的函数
      this.onResolvedCallbacks.push(() => { onFulfilled(this.value); });
      this.onRejectedCallbacks.push(() => { onRejected(this.reason); });
    }
  }
}

/*
* 完整版Promise
* 提供链式调用与值穿透特性: 链式调用，我们使用Promise时候，当then函数中return一个值时，不管是什么值，我们都能在下一个
* then中获取到，这就是then的链式调用; 值穿透特性，当我们不在then中放入参数，如: promise.then().then(),那么后面的then
* 依旧可以得到之前then返回的值，这就是所谓的值的穿透。
* 实现原理: 如果每次调用then的时候，我们都重新创建一个promise对象，并把上一个then的返回结果传给这个新的promise的then方
* 法，这样就可以一直then下去。
*/
function resolvePromise( promise2, x, resolve, reject ) {
  // 如果自己等待自己完成则是错误的实现，用一个类型错误，结束掉promise
  if ( promise2 === x ) {
    return reject( new TypeError('Chaining cycle detected for promise #<Promise>') );
  }

  let called;                              // 是否已调用，只调用一次

  if ( (typeof x === 'object' && x !== null) || typeof x === 'function' ) {
    try {
      // 为了判断resolve过就不再reject了(如reject与resolve同时调用的时候)
      let then = x.then;
      if ( typeof then === 'function') {
        // 不要写成x.then，直接then.call就可以了, 因为x.then会再次取值。
        then.call(x, y => {
          // 如果执行过，则不再执行
          if ( called ) { return; }

          called = true;
          // 递归解析(因为可能promise中还有promise)
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          // 只要失败就reject
          if ( called ) { return; }
          called = true;
          reject(r)
        })
      }
      else {
        // 如果x.then是一个普通值就直接返回resolve作为结果
        resolve(x);
      }
    }
    catch ( error ) {
      if ( called ) { return; }

      called = true;
      reject( error );
    }
  }
  else {
    // 如果x.then是一个普通值就直接返回resolve作为结果
    resolve(x);
  }
}

/*
* Promise完整版类
*/
class FullPromise extends BasePromise {
  constructor( executor ) {
    super( executor )
  }

  // 重写基类的方法
  then( onFulfilled, onRejected ) {
    // 解决onFulfilled, onRejected没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    // 因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后then的resolve中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error; };
    // 每次调用then都返回一个新的promise
    const promise2 = new FullPromise((resolve, reject) => {
      if ( this.status === FULFILLED ) {
        setTimeout(() => {
          try {
            const x = onFulfilled( this.value );
            // x可能是一个promise
            console.log('fulfilled', promise2);
            resolvePromise(promise2, x, resolve, reject);
          }
          catch ( error ) {
            reject( error );
          }
        }, 0)
      }

      if ( this.status === REJECTED ) {
        setTimeout(() => {
          try {
            const x = onRejected( this.reason );
            resolvePromise(promise2, x, resolve, reject);
          }
          catch ( error ) {
            reject( error )
          }
        }, 0)
      }

      if ( this.status === PENDING ) {
        this.onResolvedCallbacks.push(() => { 
          try {
            const x = onFulfilled( this.value );
            resolvePromise( promise2, x, resolve, reject );
          }
          catch ( error ) {
            reject( error );
          }
        });

        this.onRejectedCallbacks.push(() => { 
          try {
            const x = onRejected( this.reason );
            resolvePromise( promise2, x, resolve, reject );
          }
          catch ( error ) {
            reject( error );
          } 
        });
      }

    })

    return promise2;
  }
}


module.exports = { BasePromise, FullPromise }
