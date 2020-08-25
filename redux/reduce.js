module.exports.compose = (middlewares) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }
    if (middlewares.length === 0) {
        return (arg) => arg;
    }
    return (next = async () => {}) =>
        middlewares.reduce((a, b) => (arg) => a(() => b(arg)))(next);
};
