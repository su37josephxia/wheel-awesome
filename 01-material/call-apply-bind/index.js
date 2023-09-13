exports.call = function (context, ...args) {
  // this 为调用方法 例:f.call this = f
  if (context == null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);

  const fnKey = Symbol();
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

exports.apply = function (context, args) {
  return this.call(context, ...args);
  //   // this 为调用方法 例:f.call this = f
  // context.fn = this;
  // const result = context.fn(...args);
  // delete context.fn;
  // return result;
};

exports.bind = function (context, ...args) {
  // this 为调用方法 例:f.call this = f
  const f = this;
  return function F() {
    return f.apply(context, [...args, ...arguments]);
  };
};
