module.exports.compose = middlewares => {
    return () => middlewares.reduceRight((a, b) => () => b(a), () => {})();
}