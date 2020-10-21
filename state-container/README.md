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



## 统一状态管理

如果编写一个复杂的前端程序，不太可能让组件各自为政。状态和行为逻辑都分散在各自组件内部，很难统一管理，那也就很难做大.比如: 大家想想做一个在线版的Excel或者PS 又或者后面我们要写的VSCode应该怎么做？里面的各种组件互动，Undo、Redo、行为记录怎么做？在线版王者荣耀如何播放视频录像，如何直播？

要完成这样的功能需要三个要求：
- 单一数据源 : 就是状态数据统一放在一起

- 保持状态只读 : 状态数据谁都不能改，需要改的话找管理员同意修改

- 数据修改使用纯函数 : 修改数据的方法也要统一管理，这样容易回退，记录复现、时间旅行

- 状态通知 : 状态修改可以得到通知，当然很多人都要收听这个最好使用订阅发布模式。这个不是刚需，我就一个地方用用怎么了。谁变了我整个视图都刷新。所以咱们拆解开，这次只满足能触发状态变更通知就行了。后面设计模式咱们在慢慢盘这些东西。

  


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










