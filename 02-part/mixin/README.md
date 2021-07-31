# 坚持造轮子第六天 - Mixin

## Mixin是什么

Mixin又叫做混入可能百分之九十九的前端小伙伴都是通过Vue的mixin认识这个词的是吧。不过这确实不是小尤同学发明的。

Mixin其实就是对多重继承的实现。

在《松本行弘的程序世界》一书中，作者列举了以下三点：结构复杂化：如果是单一继承，一个类的父类是什么，父类的父类是什么，都很明确，因为只有单一的继承关系，然而如果是多重继承的话，一个类有多个父类，这些父类又有自己的父类，那么类之间的关系就很复杂了。优先顺序模糊：假如我有A，C类同时继承了基类，B类继承了A类，然后D类又同时继承了B和C类，所以D类继承父类的方法的顺序应该是D、B、A、C还是D、B、C、A，或者是其他的顺序，很不明确。功能冲突：因为多重继承有多个父类，所以当不同的父类中有相同的方法是就会产生冲突。如果B类和C类同时又有相同的方法时，D继承的是哪个方法就不明确了，因为存在两种可能性。



算了还是说点人类的语言。

就好比王者荣耀

![image-20201106164210766](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201106164210766.png)



比如泣血之刃 需要用小吸血刀的吸血能力和巨剑的攻击力的加成。但是小吸血刀和巨剑谁也不是谁的爹。那么你合成泣血的时候就需要多重继承能力了。懂了吧。



那么在各个语言都是如何进行多重继承能力。

- Java选择的规格继承 也就是使用interface实现多重继承

- Ruby选择世界提供了Mixin 

- 而JS肿么就没有呢 需要我们实现

  


## 需求
如果用Jest用例便表示就是这样

```js
test("Mixin 实现", () => {
  const mixin = require("../index");


  const Base = class {};

  const fn = jest.fn();

  // 小吸血刀
  const canLog = {
    fn,
  };

  mixin(Base, canLog);

  // 泣血之刃
  const obj = new Base()
  obj.fn("haha");

  const calls = fn.mock.calls;
  expect(calls.length).toBe(1);
  expect(calls[0][0]).toBe("haha");

});
```
我们需要实现一个合成函数完成装备合成，懂了吧。



## 实现

原型链走一波 就行了，不解释。

```js
module.exports = (base, obj) => {
  for (var key in obj) {
    if (base.prototype.hasOwnProperty(key)) {
      throw new Error(
        "Don't allow override existed prototype method. method: " + key
      );
    }
    base.prototype[key] = obj[key];
  }
};

```



## 测试

![image-20201106165047821](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201106165047821.png)

OK 任务完成

## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome










