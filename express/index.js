module.exports.compose = middlewares => {
  let idx = 0
  async function next() {
    if (idx < middlewares.length) return Promise.resolve(middlewares[idx++](next))
  }
  return next
}