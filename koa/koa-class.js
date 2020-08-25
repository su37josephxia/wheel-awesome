class ComposeClass {
  constructor() {
    this.middlewares = []
    this.index = 0
  }

  middleware (middlewares) {
    this.middlewares = middlewares
    return this.dispatch(this.index)
  } 
  
  dispatch (index) {
    const fn = this.middlewares[index]
    if (!fn) {
      return Promise.resolve()
    }
    this.index += 1
    return Promise.resolve(
      fn(this.next.bind(this))
    )
  }

  next() {
    return this.dispatch(this.index)
  }
}

module.exports.compose = (middlewares) => {
  return () => {
    return new ComposeClass().middleware(middlewares)
  }
}