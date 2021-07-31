function newCreate(proto, propertiesObject) {
  if(typeof proto !== 'object' && typeof proto !== 'function') {
    throw TypeError('Object prorotype may only be an Object: ' + proto)
  }
  // if(typeof propertiesObject === )
  function F(){}
  F.prototype = proto
  let o = new F()

  if(propertiesObject !== undefined ){
    Object.keys(propertiesObject).map(prop => {
      let desc = propertiesObject[prop]
      if(typeof desc !== 'object' || desc === null) {
        throw TypeError('Object prorotype may only be an Object: ' + desc)
      } else {
        Object.defineProperty(o, prop ,propertiesObject[prop])
      }
    })
  }
  
  return o
}

module.exports = newCreate