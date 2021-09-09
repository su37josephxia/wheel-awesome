class EventSubscribe {
  constructor () {
    // 初始化事件列表
    this.eventList = {}
  }

  /**
   * 订阅
   * @param {string} eventName 
   * @param {function} func 
   * @returns {function} unsubscribe 取消订阅函数
   */
  subscribe(eventName, func) {
      // 初始化事件下的监听函数列表
      !this.eventList[eventName] && (this.eventList[eventName] = []);
      // 保存监听函数
      this.eventList[eventName].push(func);

      // 保存this
      const that = this;

      // 返回取消订阅函数
      return function unsubscribe() {
        const funcIndex = that.eventList[eventName].indexOf(func);
        funcIndex !== -1 && that.eventList[eventName].splice(funcIndex, 1);
        if(that.eventList[eventName].length === 0) {
          delete that.eventList[eventName];
        }
      }
  }

  /**
   * 事件触发
   * @param {string} eventName 
   */
  dispatch(eventName) {
    // 事件未被监听
    if (!this.eventList[eventName] || this.eventList[eventName].length === 0) {
      return;
    }
    // 执行监听的函数
    this.eventList[eventName].forEach(fn => fn());
  }
}

module.exports = EventSubscribe;