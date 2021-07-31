## 时间旅行

时间旅行就是让程序可以在自己历史状态里面任意穿梭，想想Office和PS软件中的Undo和Redo就知道。再想想王者荣耀的录像功能。

时间旅行实际上就是设计模式中的备忘录模式。这个到我们可以练习设计模式的时候再升华，先不在这里强行渡劫。

首先Redux为时间旅行做了基础性工作，首先所有组件上缴了状态，地主家不存余粮,然后使用纯函数加工数据，不存在秘方和小料，保证了加工结果的可预测性。

然后要做的就是找一个容器我们可以叫做历史和时间轴，把状态变更的历史存储起来。把状态分为三个时间段：

- 过去 (过去状态数组)
- 现在（只有一个状态）
- 将来 (将来状态数组)
- gotoState 函数则是用来做时间旅行的，把过去、现在、将来重新分配

## 需求
### 1. 撤销UNDO

```js
it("撤销undo ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.undo()
    expect(history.present.num).toBe(2)
  });
```



### 2. 恢复REDO

```js
it("恢复redo ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.push({num: 4})
    history.undo()
    history.undo()
    history.undo()
    history.redo()
    expect(history.present.num).toBe(2)
  });
```



### 3. 定点漂移

```
it("定点回退 ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.gotoState(1)
    expect(history.present.num).toBe(2)
  });
```





## 功能实现

超级简单是吧 我就解释了

```js
module.exports = createHistory = () => {
  const timeline = {};

  timeline.past = [];
  timeline.futrue = [];

  timeline.gotoState = (index) => {
    const allState = [...timeline.past, timeline.present, ...timeline.futrue];
    timeline.present = allState[index];
    timeline.past = allState.slice(0, index);
    timeline.futrue = allState.slice(index + 1, allState.length);
  };

  timeline.getIndex = () => {
    // 获取当前状态index
    return timeline.past.length;
  };

  // 保存当前状态
  timeline.push = (currentState) => {
    // 将状态都保存，并更新当前状态
    if (timeline.present) {
      timeline.past.push(timeline.present);
    }
    timeline.present = currentState;
  };

  // 后退
  timeline.undo = () => {
    if (timeline.past.length !== 0) {
      timeline.gotoState(timeline.getIndex() - 1);
    }
  };

  // 前进
  timeline.redo = () => {
    if (timeline.futrue.length !== 0) {
      timeline.gotoState(timeline.getIndex() + 1);
    }
  };

  return timeline;
};

```



## 测试

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73a482bd612f4e738c2ac859e16f3883~tplv-k3u1fbpfcp-watermark.image)

OK 任务完成



## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome










