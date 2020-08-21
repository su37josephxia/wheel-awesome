module.exports.compose = middlewares => {
  return () => Promise.resolve(
    middlewares.reduce(
      (a, b) => arg => Promise.resolve(a(() => b(arg)))
    )(() => Promise.resolve())
  )
}
