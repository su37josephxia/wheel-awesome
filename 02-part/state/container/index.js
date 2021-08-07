module.exports.createStore = (reducer, initialState) => {
  const store = {};
  store.store = initialState;

  store.getState = () => store.state

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);

    // 触发通知
    store.effective && store.effective();
  };

  store.effect = (fn) => {
    store.effective = fn;
  };

  return store;
};
