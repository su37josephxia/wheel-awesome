# 坚持造轮子第二天 - 统一状态管理

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



## 时间旅行

顾名思义，就是可以随时穿越到以前和未来，让应用程序切换到任意时间的状态。我们都知道，一般应用状态都很复杂，创建、维护、修改和弄明白有哪些行为会影响状态都不是一件容易的事儿。

时间旅行实际上就是设计模式中的备忘录模式。
  
我们把状态分为三个时间段：过去，现在（只有一个状态），将来。gotoState 函数则是用来做时间旅行的，他的实现方式就是整合所有状态 allState，重新分配，present 前面是 past，后面是 future。





## 需求
### 1. 通过dispatch修改状态

### 2. 状态变更后触发通知

```js
it("基本功能 订阅通知 改变状态", () => {
    const { createStore } = require("../index");
    const mockFn = jest.fn();
    const store = createStore(reducer);

    // 建立响应订阅
    store.effect(mockFn);
    store.dispatch({
      type: "clear",
    });
    // store.dispatch({ type: "add", payload: 1 });

    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    expect(store.getState().num).toBe(0);
  });
```

## 功能实现
超级简单是吧 我就解释了

```js
module.exports.createStore = (reducer, preloadedState) => {
  let currentReducer = reducer; //reducer函数
  let currentState = preloadedState; //默认state
  let effective 
  return {
    getState() {
      return currentState;
    },
    dispatch(action) {
        currentState = currentReducer(currentState, action);
        // 触发通知
        effective()
    },
    effect(fn) {
        effective = fn;
    },
  };
};

```



## 测试

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/531a5dd783ac40bcae2b89717e9ce5bf~tplv-k3u1fbpfcp-watermark.image)

OK 任务完成



## 遗留问题 - 后续解决

主要是我们拆解了和统一状态管理不强绑定的问题。

### 1. 如何变更通知订阅

当然这个实现订阅发布模式就行了

### 2. 异步Action的处理 

大概两个方案Thunk方案 和 Promise方案 这个等我们后续分别造完Thunk和 Promise轮子再说

### 3. 状态日志

这个需要引入中间件洋葱圈模型也就是实现责任链模式

### 4. 和时间旅行

这个需要实现备忘录设计模式





## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome










