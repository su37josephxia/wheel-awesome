module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.length === 0) {
        return arg => arg;
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return (next = async () => {}) => middlewares.reduce((a, b) => arg => a(() => b(arg)))(next);
};
