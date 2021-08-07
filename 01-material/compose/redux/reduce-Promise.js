module.exports.compose = middlewares => {
  if (middlewares.length === 0) {
    return () => Promise.resolve()
  }
  return () => Promise.resolve(
    middlewares.reduce((a, b) => (...arg) =>
      Promise.resolve(a(() => b(...arg)))
    )(() => Promise.resolve())
  )
}
