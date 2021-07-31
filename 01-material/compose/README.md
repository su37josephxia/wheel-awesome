# 天天造轮子第七天 - 中间件实现 - Compose 的 N 种姿势

二话不说 轮子我都会造 还怕你面试问吗？

一天造一个轮子，干就完了。



## 一、中间件是什么

中间件可以有两个不同的解释。

### 1. 传统的中间件概念

维基百科

> 中间件（英语：Middleware），是提供系统软件和应用软件之间连接的软件，以便于软件各部件之间的沟通，特别是应用软件对于系统软件的集中的逻辑，在现代信息技术应用框架如Web服务、面向服务的体系结构等中应用比较广泛。如数据库、Apache的Tomcat，IBM公司的WebSphere,BEA公司的WebLogic应用服务器，东方通公司的Tong系列中间件，以及Kingdee公司的等都属于中间件。



在很久很久以前，

 1988年5月，求伯君的普通技术人员在一个宾馆的出租房间里凭借一台386电脑写出了WPS（Word Processing System）1.0，从此开创了中文字处理时代。

那个时代写程序基本就是用C从在操作系统上直接开发

> 操作系统 => 业务程序

但是后来你会发现一个复杂的业务程序通常情况下可以分化为两层，可以抽离出一层程序和业务完全无关比如Web服务，数据存储等。

> 操作系统 =>  中间件(Middleware) => 业务程序

这个就是中间件最原始的概念。

中间件可以屏蔽操作系统底层，减少程序设计的复杂性。

> 操作系统(Linux) =>  中间件(Middleware) => 业务程序
>
> 操作系统(Windows) =>  中间件(Middleware) => 业务程序
>
> 操作系统(Unix SCO) =>  中间件(Middleware) => 业务程序

常见的中间件产品

- 应用服务器 ： JBoss、Tomcat、Geronimo、JOnAS
- 消息中间件： Kafka、 RabbitMQ
- 交易中间件： TUXEDO、TUXONE





# 2. JS世界中的中间件

JS世界中无论是Express、Koa、Redux中都会有中间件实现。其实这个中间件主要是为了方便的将业务逻辑拼装成一个逻辑处理链条。其实是对设计模式中责任链模式的一种实现。我们通常也会将他称为洋葱圈模型。



![image-20201109113922290](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201109113922290.png)

### 3. 为切面编程而生的

对于复杂的系统，切面编程是刚需。完成一个核心逻辑之前和之后，还是粗了错误都需要做对应的处理。

![image-20201109120109356](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201109120109356.png)

比如转账：

- 转账前 ：  鉴权  安全性 开启事务
-  转账后: 操作日志 关闭事务

- 异常： 账户回滚 错误日志

想象一下假设我们hard coding这个代码有多麻烦。

```js
transfer() {
  // 鉴权
  tokenCheck()

  // 开启事务
  tx.begin()
  try {

    // 核心逻辑

    // 操作日志
    log('   xxxxxx  ')
  } cache(err) {
    // 错误日志
    log('   xxxxxx  ')
    // 回滚事务
    tx.rollback
  } finally {
    // 关闭事务
    tx.end
  }
}

```



其实 还没有完 ，如果你在程序中还要加上同步锁、资源池获取（比如数据库连接池）、缓存呢。

![image-20201109182530443](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201109182530443.png)

解决办法就是需要提供AOP编程的可能。

> “面向切面编程”,这样的名字并不是非常容易理解，且容易产生一些误导。有些人认为“OOP/OOD11即将落伍，AOP是新一代软件开发方式”。显然，发言者并没有理解AOP的含义。Aspect，的确是“方面”的意思。不过，汉语传统语义中的“方面”，大多数情况下指的是一件事情的不同维度、或者说不同角度上的特性，比如我们常说：“这件事情要从几个方面来看待”，往往意思是：需要从不同的角度来看待同一个事物。这里的“方面”，指的是事物的外在特性在不同观察角度下的体现。而在AOP中，Aspect的含义，可能更多的理解为“切面”比较合适。



如果有切面编程，代码通常只需要在一次性在定义在所有业务前都做什么就好了

```js
@Before(tokenCheck) // 鉴权
@Before(tx.begin) // 开启事务
@After(log) // 操作日志
@After(tx.end) // 关闭事务
@Exception(log) //错误日志
@Exception(tx.rollback) // 回滚事务
traansferBase() {
  // 业务逻辑
}
```



当然我这个是用Anotation的形式写的，总之就是只需要一次性定义，就可以全部执行。

满满的高内聚低耦合。

4. 洋葱圈的产生

   其实为了达到AOP的目的有很多种实现方法，我们所说的洋葱圈就是一种。

   其实就是责任链模式，责任链模式相当于给核心任务加上了一次层层的洋葱圈。

![中间件](https://gitee.com/josephxia/picgo/raw/master/juejin/%E4%B8%AD%E9%97%B4%E4%BB%B6.gif)

相当于将事前处理，事后处理，和业务程序编成了链条。



![中间件2](https://gitee.com/josephxia/picgo/raw/master/juejin/%E4%B8%AD%E9%97%B4%E4%BB%B62.gif)





这样就可以达到切面编程的目的了。



## 二、需求

洋葱圈的实现需要考虑同步和异步情况。这里仅以同步情况为例。

详细的请参考代码 ：https://github.com/su37josephxia/wheel-awesome

```js
it('同步函数', async () => {
        const mockFn = jest.fn()
        // const mockFn = console.log
        const middlewares = [
            next => {
                mockFn('1 start')
                next()
                mockFn('1 end')
            },
            next => {
                mockFn('2 start')
                next()
                mockFn('2 end')
            }
        ]
        const func = compose(middlewares)

        viewLog && console.log('同步函数 > compose定义', compose.toString());

        func();
        const calls = mockFn.mock.calls
        viewLog && console.log('第一次', calls);
        expect(calls.length).toBe(4);
        expect(calls[0][0]).toBe('1 start');
        expect(calls[1][0]).toBe('2 start');
        expect(calls[2][0]).toBe('2 end');
        expect(calls[3][0]).toBe('1 end');

    })
```



## 三、功能实现

其实洋葱圈要是写可以写个十几种。以下代码都是我的学生的作业。

#### No1:[express 递归实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/express/index.js)


#### No2:[Koa 递归实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/koa/index.js)


#### No3:[Koa Reduce实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/koa/koa-reduce.js)


#### No4:[Koa Class实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/koa/koa-class.js)


#### No5:[Redux Reduce实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/redux/reduce.js)


#### No6:[Redux ReduceRight实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/redux/reduceRight.js)


#### No7:[Redux ReduceRight Promise实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/redux/reducePromise.js)


#### No8:[Chain of Responsibility Pattern 责任链模式实现](https://github.com/su37josephxia/wheel-awesome/tree/master/compose/chain-of-responsibility-pattern/index.js)


#### No9:[List 通过列表递归实现](

我们就随便说几个，还有很多，欢迎大家PR 。还有哪些我后面会说。

### 1. Express递归实现

```js
module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return async () => {
        let idx = 0;
        async function next() {
            if (idx === middlewares.length) {
                return Promise.resolve();
            }
            if (idx < middlewares.length) {
                return Promise.resolve(middlewares[idx++](next));
            }
        }
        return await next();
    };
};

```

### 2.Koa递归实现

```js
module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return function () {
        return dispatch(0);
        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1);
                })
            );
        }
    };
};

```

### 3. Reduce实现

```js
module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.length === 0) {
        return arg => arg;
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return (next = async () => {}) => middlewares.reduce((a, b) => arg => a(() => b(arg)))(next);
};

```

![image-20201110113646707](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201110113646707.png)


#### 

### 四、升华扩展

其实 就是责任链的实现，欢迎大家PR写完了保证你进入另外一个变成世界

> https://blog.csdn.net/liuwenzhe2008/article/details/70199520
>
> 请参考这篇大哥雄文


![](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201110114448966.png)

- OOP风格

归纳一下

- 面向对象风格OOP
  - 解法一 用模板方法模式实现责任链模式
  - 解法二 用策略模式实现责任链模式
- 函数式风格Functional Programming
  - 解法三 用一等公民函数替换策略模式实现责任链模式
  - 解法四 用偏应用函数实现责任链模式
  - 解法五 用偏函数实现责任链模式
- 响应式风格Reactive Programming
  - 解法六 用Actor模型实现责任链模式
  - 解法七 用RXReactive eXtension响应式扩展实现责任链模式

欢迎各位大哥投稿 PR



