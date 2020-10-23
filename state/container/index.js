module.exports.createStore = (reducer, preloadedState) => {
  let currentReducer = reducer; //reducer函数
  let currentState = preloadedState; //默认state
  let effective 
  return {
    getState() {
      return currentState;
    },
    dispatch(action) {
        currentState = currentReducer(currentState, action);
        // 触发通知
        effective()
    },
    effect(fn) {
        effective = fn;
    },
  };
};
