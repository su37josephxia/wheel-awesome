# 方案：自己造轮子实现



## 简单介绍

我是20期开课吧学员那猫小帅，当您看到这段代码时，说明我的代码已经被合并到夏老师的代码库中了😊😊😊

这个也许是最简单的实现方式了，借助 array.shift() 依次执行

浏览夏老师提供的资料，还没有提到我这种实现方法，赶紧PR

自己造的轮子，代码如有雷同，纯属巧合。

第一版：
```javascript
module.exports.compose = (middlewares) => {
  const next = async () => {
    if (middlewares.length > 0) {
      return await middlewares.shift()(next);
    }
  };
  return () => next();
};
```

大力出bug，不能直接操作 middlewares，先复制一份否则第二次执行就没有中间件了

第二版：
```javascript
module.exports.compose = (middlewares) => async () => {
  let _middlewares = [...middlewares]
  const next = async () => {
    if (_middlewares.length > 0) {
      return await _middlewares.shift()(next);
    }
  };
  return await next();
};
```

这样就和express的实现很像了，我还以为自己造了个牛X的轮子害羞。。。

## 相关的故事

思路来自我 2017年在 setmentfault 中的一篇回答 [实现函数LazyMan](https://segmentfault.com/q/1010000008745355/a-1020000008745918)，这是一个面试题，考察点是 Promise，当时不懂，我硬生生的用一个数组给实现了，后面又对代码进行优化，写了4个版本的回答。大力出奇迹 😂 😂 😂

```javascript
function LazyMan(nick){
    var obj = {
        task : {
            list : [],
            add : function(fun, timer){
                timer = timer || 0;
                this.task.list.push({
                    fun : fun,
                    timer : timer
                });
                return this;
            },
            run : function(){
                if( this.task.list.length > 0 ){
                    setTimeout( (function(){
                        this.task.list.shift().fun.call(this);
                    }).bind(this), this.task.list[0].timer );
                }else{
                    this.echo("[Task]", "==========Stop==========");
                }
            }
        },
        echo : function( str , str2 ){
            var message = {
                isLog : !!str.match(/^\[[\s\S]*\]$/),
                style : [
                    'color:#090;font-size:1.2em;font-weight:800;',
                    'color:#CCC;font-size:0.5em;font-style:italic;',
                ],
                text : str + str2
            };
            if( 'table' in console ){
                //
                console.log('%c%s', message.style[+message.isLog], message.text );
            }else{
                !message.isLog && console.log(message.text );
            }
            delete message;
            return this;
        },
        hello : function( nick ){
            return this.task.add.call(this, function(){
                this.echo('Hi', nick);
                this.task.run.call(this);
            });
        },
        eat : function( eat ){
            return this.task.add.call(this, function(){
                this.echo('Eat', eat);
                this.task.run.call(this);
            });
        },
        sleep : function( timer ){
            return this.task.add.call(this, function(){
                this.echo("[Timer( sleep )]", timer);
                this.task.run.call(this);
            }, timer * 1000);
        },
        sleepFirst : function( timer ){
            var fun = this.task.list[0].fun;
            this.task.list[0].fun = function(){
                setTimeout((function(){
                    this.echo("[Timer( sleepFirst) ]", timer);
                    fun.call(this);
                }).bind(this), timer * 1000);
            };
            return this;
        }
    };
    obj.echo("[Task]", "==========Start==========").hello(nick).task.run.call(obj);
    return obj;
};

LazyMan("A").sleepFirst(1).eat("abc").sleep(4).sleep(5).eat("A").eat("B").eat("C")
```



## 关于我

野生程序猿，一个成长中的全栈开发者

[mqycn@gitee](https://gitee.com/mqycn) | [mqycn@github](https://github.com/mqycn) | [mqycn@segmentfault](https://segmentfault.com/u/mqycn) | [My Blog](http://www.miaoqiyuan.cn/)

