# 坚持造轮子第一次参与 - Promise

二话不说 轮子我都会造 还怕你面试问吗？
一天造一个轮子，干就完了。

## 看点
- 针对大厂笔试、面试必考手写题目
- TDD方式开发
- 配合视频讲解


## 造轮子计划
（计划赶不上变化 随时迭代 欢迎留言 随时摸鱼）
- 框架基础
  - [模板引擎](https://juejin.im/post/6884138429181870093)
  - 防抖
  - 节流
  - 前端路由
  - 统一状态管理
  - 时间旅行
  - HTML编译器
  - Pipe管道
  - 双向绑定
  - 原生Ajax
- JS基础
  - Compose
  - Promise
  - Promise.all/race
  - 路由
  - new
  - call/apply/bind
  - Object.create
  - 深拷贝、浅拷贝
- 算法、设计模式
  - 二分查找
  - 快排
  - 二分查找
  - 冒泡排序
  - 选择排序
  - 订阅发布
  - 斐波那契算法
  - 去重

## Promise

Promise是异步编程的一种解决方案: 从语法上讲，promise是一个对象，从它可以获取异步操作的<br/>
的消息；从本意上讲，它是承诺，承诺它过一段时间会你一个结果。promise有三种状态:pending<br/>
(等待态)，fulfilled(成功态), rejected(失败态)；状态一旦改变，就一会再变。创建promise<br/>
实例后，会立即执行。Promise主要用来解决地狱回调；Promise支持多个并发请求，并获取并发请<br/>
求的数据。<br/>



## 需求
调用Promise返回一个promise对象

基本功能Promise返回成功测试用例
```js
it('基本功能Promise返回成功测试', (done) => {
  const promise = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 50);
  })

  promise.then(data => {    
    expect(data).toBe('success');
    done();
  })
})
```

基本功能Promise返回失败测试用例
```
it('基本功能Promise返回失败测试', (done) => {
  const promise = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      reject('fail');
    }, 50);
  })

  promise.then(data => {    
    console.log('resolve data: ', data)
  }, error => {
    expect(error).toBe('fail');
    done();
  })
})
```

***

完整版Promise成功返回测试用例
```
it('完整版Promise成功返回测试', (done) => {
  const promise = new FullPromise((resolve, reject) => {
    resolve('success');
  });

  promise.then().then().then(data => {
    expect(data).toBe('success');
    done();
  })
})
```

完整版Promise失败返回测试用例
```
it('完整版Promise失败返回测试', (done) => {
  const promise = new FullPromise((resolve, reject) => {
    reject('fail');
  });

  promise.then().then().then(data => {
    console.log('resolve data: ', data);
  }, err => {
    expect(err).toBe('fail');
    done();
  })
})
```



## 功能实现
### 基础版Promsie

> 使用方法
* 首先我们在调用Promise时，会返回一个Promise对象。
* 构建Promise对象时，需要传入一个executor函数，Promise的主要业务流程都在executor函数中执行。
* 如果运行在excutor函数中的业务执行成功了，会调用resolve函数；如果执行失败了，则调用reject函数。
* Promise的状态不可逆，同时调用resolve函数和reject函数，默认会采取第一次调用的结果。

根据Promise的一些主要的使用方法，结合Promise/A+规范，我们可以分析出Promise的基本特征：
1. promise有三个状态：pending，fulfilled，rejected。
2. new Promise时，需要传递一个executor()执行器，执行器立即执行。
3. executor接受两个参数，分别是resolve和reject。
4. promise的默认状态是pending。
5. promise有一个value保存成功状态的值，可以是undefined/thenable/promise。
6. promise有一个reason保存失败状态的值。
7. promise只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变。
8. promise 必须有一个then方法，then接收两个参数，分别是promise成功的回调onFulfilled, 和promise失败的回调onRejected。
9. 如果调用then时，promise已经成功，则执行onFulfilled，参数是promise的value。
10. 如果调用then时，promise已经失败，那么执行onRejected, 参数是promise的reason。
11. 如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调onRejected。

**源码:**
```
// promise 的状态值
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

/*
* 基础版Promise，提供最基础的功能
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
```

### 完整版Promsie, 会继承基础版Promise类
提供链式调用与值穿透特性: 链式调用，我们使用Promise时候，当then函数中return一个值时，不管是什么值，我们都能在下一个<br/>
then中获取到，这就是then的链式调用; 值穿透特性，当我们不在then中放入参数，如: promise.then().then(),那么后面的then<br/>
依旧可以得到之前then返回的值，这就是所谓的值的穿透。<br/>
实现原理: 如果每次调用then的时候，我们都重新创建一个promise对象，并把上一个then的返回结果传给这个新的promise的then方</br>
法，这样就可以一直then下去。<br/>

**源码**
```
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
    const promise2 = new Promise((resolve, reject) => {
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
``` 

## 测试

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/531a5dd783ac40bcae2b89717e9ce5bf~tplv-k3u1fbpfcp-watermark.image)

OK 任务完成

## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome