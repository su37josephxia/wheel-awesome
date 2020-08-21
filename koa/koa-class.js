class Compose {
  constructor(options) {
    this.middlewares = options
    this.index = 0
    this.test(this.middlewares)
  }

  test (middlewares) {
    // 保证 middlewares 为数组
    if (!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!')
    // 保证 middlewares 内的每一项为函数
    for (const fn of middlewares) {
      if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }
    this.dispatch(this.index)
  }

  dispatch (index) {
    const middleware = this.middlewares[index]
    if (!middleware) return Promise.resolve()
    this.index = index + 1
    middleware(this.next.bind(this))
  }

  next() {
    return Promise.resolve(
      this.dispatch(this.index)
    )
  }
}

module.exports.compose = (middlewares) => {
  return () => { new Compose(middlewares) }
} 