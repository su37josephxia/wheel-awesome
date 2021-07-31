Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window;
    context.fn = this; // this 即 f.myCall 的 f
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window;
    context.fn = this;
    let result;
    // 处理参数和 call 有区别
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result
};

Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    const _this = this; // this 即 f.myBind 的 f
    const args = [...arguments].slice(1);
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
};