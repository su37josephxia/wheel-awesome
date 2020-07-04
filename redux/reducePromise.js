module.exports.compose = middlewares =>  {
    return () => Promise.resolve(
        middlewares.reduceRight(
            (a, b) => () => Promise.resolve(b(a)),
            () => Promise.resolve()
        )()
    )
};