function newObj (obj) {
  if (!obj || !obj.prototype) {
    throw Error('Error')
  }
  const resultObj = Object.create(obj.prototype)
  const result = obj.call(resultObj)
  return typeof result === 'object' && result !== null ? result : resultObj
}

module.exports = newObj
