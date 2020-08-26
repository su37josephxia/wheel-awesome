/**
 * @description: 利用reduceRight实现洋葱圈
 * @param {middlewares：中间件数组}
 * @return {高阶函数}
 */
module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    // reduceRight：从右向左做累加，第二个参数为初始值
    // 比如：middlewares = [f1, f2, f3]，执行过程如下：
    // 第一次 --> a = () => {}，                    b = f3，结果：() => f3(() => {})
    // 第二次 --> a = () => f3(() => {})，          b = f2，结果：() => f2(() => f3(() => {}))
    // 第三次 --> a = () => f2(() => f3(() => {}))，b = f1，结果：() => f1(() => f2(() => f3(() => {})))
    return () =>
        middlewares.reduceRight(
            (a, b) => () => b(a),
            () => {}
        )();
};
