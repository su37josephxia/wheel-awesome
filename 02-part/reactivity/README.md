# 坚持造轮子第三天 - 数据响应式

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

## 响应式是什么

首先我们说说什么是响应式。数据模型发生变化可以发出相应(比如： 调用一个函数)就叫响应式。

具体到我们MVVM中 ViewModel的需要就是数据变了需要视图作出响应。



## 需求
如果用Jest用例便表示就是这样

### 对象响应

```js
it('测试数据改变时 是否被响应', () => {
  const data = reactive({
    name: 'abc',
    age: {
      n: 5
    }
  })
  // Mock一个响应函数
  const fn = jest.fn()
  const result = fn()

  // 设置响应函数
  effect(fn)

  // 改变数据
  data.name = 'efg'

  // 确认fn生效
  expect(fn).toBeCalled()
})
```
假定我们需要的是数据data变化时可以触发fn函数也就是作出相应，当然相应一般是触发视图更新当然也可以不是。我们这里面用jest做了一个Mock函数来检测是否作出相应。

最后代码expect(fn).toBeCalled()有效即代表测试通过也就是作出了相应

### 数组响应

```js
it('测试数组中数据改变时 是否被响应', () => {
  const data = reactive({
    ary: [
      'a'
    ]
  })
  // Mock一个响应函数
  const fn = jest.fn()

  // 设置响应函数
  effect(fn)

  // 改变多层数据
  data.ary.push('b')

  // 确认fn生效
  expect(fn).toBeCalled()
})
```



### 深层嵌套响应

```js
it('测试多层数据中改变时 是否被响应', () => {
  const data = reactive({
    age: {
      n: 5
    }
  })
  // Mock一个响应函数
  const fn = jest.fn()

  // 设置响应函数
  effect(fn)

  // 改变多层数据
  data.age.n = 1

  // 确认fn生效
  expect(fn).toBeCalled()
})
```



## 功能实现

Vue普遍走的就是数据劫持方式。不同的在于使用DefineProperty还是Proxy。也就是一次一个属性劫持还是一次劫持一个对象。当然后者比前者听着就明显有优势。这也就是Vue3的响应式原理。

Proxy/Reflect是在ES2015规范中加入的，Proxy可以更好的拦截对象行为，Reflect可以更优雅的操纵对象。 优势在于

- 针对整个对象定制 而不是对象的某个属性，所以也就不需要对keys进行遍历。
- 支持数组,这个DefineProperty不具备。这样就省去了重载数组方法这样的Hack过程。
- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法
- 可以通过递归方便的进行对象嵌套。




### DefineProperty(Vue2风格)
下面展示的是vue2的实现方式是通过Object.defineProperty来重新定义getter，setter方法实现的。
```js
let effective
function effect(fun) {
    effective = fun
}

function reactive(data) {
    if (typeof data !== 'object' || data === null) {
        return data
    }


    Object.keys(data).forEach(function (key) {
        let value = data[key]
        Object.defineProperty(data, key, {
            emumerable: false,
            configurable: true,
            get: () => {
                return value
            },
            set: newVal => {
                if (newVal !== value) {
                    effective()
                    value = newVal
                }
            }
        })

    })
    return data
}

module.exports = {
    effect, reactive
}
```

当然还有两个重要的问题需要处理 第一个就是这样做只能做浅层响应 也就是如果是第二层就不行了。
```js
it('测试多层数据中改变时 是否被响应', () => {
        const data = reactive({
            age: {
                n: 5
            }
        })
        // Mock一个响应函数
        const fn = jest.fn()

        // 设置响应函数
        effect(fn)

        // 改变多层数据
        data.age.n = 1

        // 确认fn生效
        expect(fn).toBeCalled()
    })
```
比如以下用例 就过不去了 当然解决的办法是有的 递归调用就好了

![](https://user-gold-cdn.xitu.io/2019/10/23/16df77d456c26aa0?w=906&h=211&f=png&s=44339)

当然这样也递归也带来了性能上的极大损失 这个大家先记住。

### 数组函数劫持(Vue2风格)

然后是数组问题 数组问题我们可以通过函数劫持的方式解决
```js
const oldArrayPrototype = Array.prototype
const proto = Object.create(oldArrayPrototype);

['push','pop','shift','unshift','splice','sort','reverse'].forEach(method => {
    
    // 函数劫持
    proto[method] = function(){
        effective()
        oldArrayPrototype[method].call(this,...arguments)
    }
})
// 数组通过数据劫持提供响应式
if(Array.isArray(data)){
    data.__proto__ = proto
}

```

### Proxy(Vue3风格)

新版的Vue3使用ES6的Proxy方式来解决这个问题。之前遇到的两个问题就简单的多了。首先Proxy是支持数组的也就是数组是不需要做特别的代码的。对于深层监听也不不必要使用递归的方式解决。当get是判断值为对象时将对象做响应式处理返回就可以了。大家想想这个并不不是发生在初始化的时候而是设置值得时候当然性能上得到很大的提升。
```js
function reactive(data) {
    if (typeof data !== 'object' || data === null) {
        return data
    }
    const observed = new Proxy(data, {
        get(target, key, receiver) {
            // Reflect有返回值不报错
            let result = Reflect.get(target, key, receiver)

            // 多层代理
            return typeof result !== 'object' ? result : reactive(result) 
        },
        set(target, key, value, receiver) {
            effective()
            // proxy + reflect
            const ret = Reflect.set(target, key, value, receiver)
            return ret
        },

        deleteProperty(target,key){
            const ret = Reflect.deleteProperty(target,key)
            return ret
        }

    })
    return observed
}

```


当然目前还是优缺点的缺点，比如兼容性问题目前IE11就不支持Proxy。不过相信ES6的全面支持已经是不可逆转的趋势了，这都不是事。


为了对比理解Vue2、3的响应式实现的不同我把两种实现都写了一下，并且配上了jest测试。大家可以参考一下 

## 测试

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/531a5dd783ac40bcae2b89717e9ce5bf~tplv-k3u1fbpfcp-watermark.image)

OK 任务完成

## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome










