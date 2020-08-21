module.exports.compose = (middlewares) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }
    return () =>
        middlewares.reduceRight(
            (a, b) => () => b(a),
            () => {}
        )();
};
