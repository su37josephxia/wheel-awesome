let effective
function effect(fun) {
    effective = fun
}

const oldArrayPrototype = Array.prototype
const proto = Object.create(oldArrayPrototype);

['push','pop','shift','unshift','splice','sort','reverse'].forEach(method => {
    
    // 函数劫持
    proto[method] = function(){
        effective()
        oldArrayPrototype[method].call(this,...arguments)
    }
})


function reactive(data) {
    if (typeof data !== 'object' || data === null) {
        return data
    }

    // 数组通过数据劫持提供响应式
    if(Array.isArray(data)){
        data.__proto__ = proto
    }

    Object.keys(data).forEach(function (key) {
        let value = data[key]
        // 递归调用
        reactive(value)
        Object.defineProperty(data, key, {
            enumerable: false,
            configurable: true,
            get: () => {
                return value
            },
            set: newVal => {
                if (newVal !== value) {
                    effective()
                    value = newVal
                }
            }
        })

    })
    return data
}

module.exports = {
    effect, reactive
}

