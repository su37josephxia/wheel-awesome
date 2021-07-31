function newObj(obj,...args) {
  if (!obj || !obj.prototype) {
    throw Error("Error")
  }
  const resultObj = Object.create(obj.prototype)
  const result = obj.apply(resultObj,args)

  const isObject = typeof result === "object" && result !== null
  const isFunction = typeof result === "function"

  return isObject || isFunction ? result : resultObj
}

module.exports = newObj
