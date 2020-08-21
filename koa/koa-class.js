class Compose {
  constructor(options) {
    this.middlewares = options
    this.index = 0
    this.handle(this.index)
  }
  
  handle (index) {
    const middleware = this.middlewares[index]
    if (!middleware) return
    this.index = index + 1
    middleware(this.next.bind(this))
  }

  next() {
    return Promise.resolve(
      this.handle(this.index)
    )
  }
}

module.exports.compose = (middlewares) => {
  return () => { new Compose(middlewares) }
}