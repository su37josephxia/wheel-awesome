### 代码注释
```js
class Handle {
  constructor(middlewareFn) {
    // 一般抽象类会定义一个抽象method,来规范子类处理请求的操作，js允许参数传递函数
    this.myMiddlewareFn = middlewareFn
    // 下一个责任点
    this.next = null
  }

  // !设定下一个责任点
  setNext(nextHandle) {
    this.next = nextHandle
  }
}

module.exports.compose = middlewares => {
  // !创建责任点class
  const handles = []
  for (let i = 0; i < middlewares.length; i++) {
    const handle = new Handle(middlewares[i])
    handles.push(handle)
  }

  // !设置责任链
  for (let i = 0; i < handles.length; i++) {
    if (handles[i + 1]) {
      handles[i].setNext(handles[i + 1])
    }
  }

  return function myFn() {
    return innerFn(handles[0])

    // !使用内部函数,因为compose(middlewares)()在调用的时候是空参数，但是要动态移动责任点class
    // function innerFn(currentHandle = handles[0]) {
    function innerFn(currentHandle) {
      // !增加判断,因为 TypeError: Cannot read property 'myMiddlewareFn' of null
      if (!currentHandle) {
        return 
      }
      return Promise.resolve(
        // next => {
        //   mockFn('2 start')
        //   next()
        //   mockFn('2 end')
        // }
        // !因为middlewares里面的函数的格式为：函数作为参数,所以myMiddlewareFn的参数必须是函数
        currentHandle.myMiddlewareFn(() => innerFn(currentHandle.next))
      )
    }
  }
}

```