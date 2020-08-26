module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return async () => {
        let idx = 0;
        async function next() {
            if (idx === middlewares.length) {
                return Promise.resolve();
            }
            if (idx < middlewares.length) {
                return Promise.resolve(middlewares[idx++](next));
            }
        }
        return await next();
    };
};
