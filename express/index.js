module.exports.compose = middlewares => {
  return async () => {
    let idx = 0
    async function next() {
      if (idx < middlewares.length) return Promise.resolve(middlewares[idx++](next))
    }
    return await next()
  }
}