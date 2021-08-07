# 坚持造轮子第二天 - 防抖与节流

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


## 防抖和节流
防抖和节流可以说是一对好基友，也是前端面试的手写热点考题。防抖和节流其实都是在规避频繁触发回调导致大量计算，从而影响页面发生抖动甚至卡顿。简单的说将多次回调比如页面点击或ajax调用变为一次。防抖和节流的区别在于以第一次为准还是最后一次为准。

## 需求
### 1. 节流Throttle -  调用多次、只第一次调用有效
在一段时间内，不论触发多少次调用，都以第一次为准。
输入框补全提示，只需要每两秒补全一次。

用测试用例表示
```js
it("节流Throttle", (done) => {
  const { throttle } = require("../index");

  // 定义一个Mock函数
  const mockFn = jest.fn();

  // 封装为节流方法
  const fn = throttle(mockFn, 10);

  // 同步调用两次
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    // 根据参数判断以第一次调用为准
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});
```


### 2. 节流Debounce 最后一次为准
在一段时间内，不论触发多少次回调，都已最后一次为准。
比如：以用户拖拽改变窗口大小，触发 resize 事件为例，会触发组件重新布局，这里面只有最后一次调用是有意义的。

```js
it("防抖Debounce", (done) => {
  const { debounce } = require("../index");
  const mockFn = jest.fn();
  // 封装一个防抖函数
  const fn = debounce(mockFn, 10);

  // 连续两次调用
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言只调用一次
    expect(calls.length).toBe(1);
    // 断言以最后一次调用为准
    expect(calls[0][0]).toBe(2);
    done();
  }, 50);
});
``` 



## 功能实现
### 节流
主要思路利用时间戳判断，每次调用判断和上一次调用的时间差异确定是否需要调用。
throttle实际是一个工厂函数，可以将一个函数封装为一个带有节流功能的函数。

```js
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

```

### 防抖
实现的话可以使用定时器执行函数，新调用发生时如果旧调用没有执行就清除之前的定时器。

```
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
```

## 测试

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/531a5dd783ac40bcae2b89717e9ce5bf~tplv-k3u1fbpfcp-watermark.image)

OK 任务完成

## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome










