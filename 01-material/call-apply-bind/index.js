exports.call = function (context, ...args) {
  // this 为调用方法 例:f.call this = f
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

exports.apply = function (context, args) {

    return this.call(context,...args)
//   // this 为调用方法 例:f.call this = f
//   context.fn = this;
//   const result = context.fn(...args);
//   delete context.fn;
//   return result;
};

exports.bind = function (context, ...args) {
  // this 为调用方法 例:f.call this = f
  const f = this;
  return function F() {
    return f.apply(context, [...args, ...arguments]);
  };
};
