function newObj(obj) {
  if (!obj || !obj.prototype) {
    throw Error("Error")
  }
  const resultObj = Object.create(obj.prototype)
  const result = obj.call(resultObj)

  const isObject = typeof result === "object" && result !== null
  const isFunction = typeof result === "function"

  return isObject || isFunction ? result : resultObj
}

module.exports = newObj
