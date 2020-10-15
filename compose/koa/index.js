module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return function () {
        return dispatch(0);
        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1);
                })
            );
        }
    };
};
