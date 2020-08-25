module.exports.compose = (middlewares) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }
    return () =>
        Promise.resolve(
            middlewares.reduceRight(
                (a, b) => () => Promise.resolve(b(a)),
                () => Promise.resolve()
            )()
        );
};
