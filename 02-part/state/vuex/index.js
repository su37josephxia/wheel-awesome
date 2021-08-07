module.exports.createStore = opts => {
  // 定一个Store类
  function Store(opts) {
    this.state = opts.state
    this.mutations = opts.mutations
  }
  // 定义实例方法commit，可以根据传入type修改制定state
  Store.prototype.commit = function(type) {
    // 获取type对应的mutation并传入state
    this.mutations[type](this.state)
    // 然后调用副作用函数
    this.effect()
  }

  // 定义effect方法可以添加副作用函数
  Store.prototype.effect = function(fn) {
    this.effect = fn
  }

  // 创建一个Store实例返回它
  return new Store(opts)
}