// const {
//     reactive,
//     effect
// } = require('../../packages/reactivity/index')

let effective;
function effect(fun) {
  effective = fun;
}

function reactive(data) {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const observed = new Proxy(data, {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      return typeof result !== 'object' ? result : reactive(result)
    },

    set(target,key,value,receiver){
        effective()
        const ret = Reflect.set(target,key,value,receiver)
        return ret
    },

    deleteProperty(target,key){
        effective()
        const ret = Reflect.deleteProperty(target,key)
        return ret
    }

  });

  return observed;
}

module.exports = {
  reactive,
  effect,
};

// // 设置数据响应
// const data = reactive({
//     name: 'abc'
// })
// // 数据响应
// effect(() => {
//     console.log('effect....', data.name)
// })

// // 修改数据
// data.name = 'efg'
