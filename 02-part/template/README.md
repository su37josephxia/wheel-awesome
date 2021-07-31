# 坚持造轮子第一天 - 模板引擎

二话不说 轮子我都会造 还怕你面试问吗？
一天造一个轮子，干就完了。

## 看点
- 针对大厂笔试、面试必考手写题目
- TDD方式开发
- 配合视频讲解


## 造轮子计划
（计划赶不上变化 随时迭代 欢迎留言 随时摸鱼）
- 框架基础
  - 模板引擎
  - 前端路由
  - 统一状态管理
  - 时间旅行
  - HTML编译器
  - Pipe管道
  - 防抖
  - 节流
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


## 模板引擎
为了实现视图与业务逻辑的分离，无论MVP、MVVM、MVC那个V都会使用模板引擎。下面我们说说模板引擎的要求。

## 需求
### {{ }} 表达式

其实就是 将{{ }}中的值根据替换为表达式的结果。

| 模板                                  |      | 结果               |
| ------------------------------------- | ---- | ------------------ |
| ```<b>{{ name }}</b>```               | →    | ```<b>tom</b>```   |
| ```<b>{{ name.toUpperCase() }}</b>``` | →    | ```<b>TOM</b>```   |
| ```<b>{{ '[' + name + ']' }}</b>```   | →    | ```<b>[tom]</b>``` |


用测试用例表示就是这样

```js
  it("{{}} 表达式", () => {
    const output = compile("<b>{{ name }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>tom</b>`);
  });

  it("{{}} toUpperCase 表达式", () => {
    const output = compile("<b>{{ name.toUpperCase() }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>TOM</b>`);
  });

  it("{{}} +连接", () => {
    const output = compile("<b>{{ '[' + name + ']' }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>[tom]</b>`);
  });


```

### forEach遍历
```html
{%arr.forEach(item => {%}
    <li>{{item}}</li>
{%})%}
```
生成结果
```
    <li>aaa</li>
    <li>bbb</li>
```

### if判断
```html
{% if(isShow) { %} <b>{{ name }}</b> {% } %}
```
生成结果
```
     <b>tom</b> 
```


## 功能实现
模板渲染的功能大概可以归纳为两步：
1. 编译模板为Generate函数
2. 执行渲染函数

比如最简单的模板
```
<b>{{ name }}</b>
```
生成后的渲染函数
```
generate(obj){
  let str = '';
  with(obj){
  str+=`<b>${name}</b>`}
  return str;
}
```
执行generate结果
```
const ret = generate({name : 'tom'})

// 运行结果: <b>tom</b>

```

### 编译过程
我们把编译过程其实就是通过正则表达式的匹配

第一步 将{{ xxx }}表达式 转化为ES6模板字符串 ${ xxx }
```
  // 全局正则表达式替换
  template = template.replace(/\{\{([^}]+)\}\}/g, function () {
    let key = arguments[1].trim();
    return "${" + key + "}";
  });
```

第二步 将{% %}表达式 转化为JS语句这样的就可以在模板中使用if、foreach了

比如if判断：
```js
{% if(isShow) { %} <b>{{ name }}</b> {% } %}
// 转化的函数
let str = '';
   with(obj){
   str+=``
   if(isShow) {
    str+=`<b>${name}</b> `
   }
   return str;
```

实现代码
```js
  let head = `let str = '';\r\n with(obj){\r\n`;
  head += "str+=`";
  template = template.replace(/\{\%([^%]+)\%\}/g, function () {
    return "`\r\n" + arguments[1] + "\r\nstr+=`\r\n";
  });
  let tail = "`}\r\n return str;";

```

### 构造Generate函数

这里面需要一个我们不太常用的语法 new Function()用于动态创建函数体
比如
```
new Function('arg', 'console.log(arg + 1);');
// 相当于创建了一个匿名函数
function (arg) {
    console.log(arg + 1);
}
```
完整的代码实现
```
template = template.replace(/\{\{([^}]+)\}\}/g, function () {
    let key = arguments[1].trim();
    return "${" + key + "}";
  });

  let head = `let str = '';\r\n with(obj){\r\n`;
  head += "str+=`";
  template = template.replace(/\{\%([^%]+)\%\}/g, function () {
    return "`\r\n" + arguments[1] + "\r\nstr+=`\r\n";
  });

  let tail = "`}\r\n return str;";
  console.log(`==========render=========`)
  console.log(head + template + tail);
  return new Function("obj", head + template + tail);
```

## 测试

![](https://imgkr2.cn-bj.ufileos.com/ce2a945e-1dab-4716-bea8-b467bfb320f9.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=0G0aWrG2zUnjFh1P7Hv3ncjQ9ro%253D&Expires=1603161755)



OK 任务完成

## 关注全栈然叔 带你坚持天天造轮子 （周末休息 拒绝996）
- ### 源码地址 https://github.com/su37josephxia/wheel-awesome
