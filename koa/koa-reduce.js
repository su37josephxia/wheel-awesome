module.exports.compose = (middlewares = []) => () => {
    // 保证 middlewares 为数组
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }
    // 保证 middlewares 内的每一项为函数
    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    if (middlewares.length === 0) {
        return Promise.resolve();
    } else if (middlewares.length === 1) {
        return Promise.resolve(middlewares[0].call(null, () => Promise.resolve()));
    } else {
        // compose reduce实现
        return middlewares
            .map(item => item)
            .reverse()
            .reduce((pre, cur) => () => cur(() => pre(() => {})))();
    }
};
