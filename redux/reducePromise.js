module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return () =>
        Promise.resolve(
            middlewares.reduceRight(
                (a, b) => () => Promise.resolve(b(a)),
                () => Promise.resolve()
            )()
        );
};
