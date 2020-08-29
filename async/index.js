// 
module.exports.compose = function (middlewares = []) {
    return async function () {
        // 定义默认的 next，最后一个中间件内执行的 next
        let next = async () => Promise.resolve();

        // middleware 为每一个中间件函数，oldNext 为每个中间件函数中的 next
        // 函数返回一个 async 作为新的 next，async 执行返回 Promise，解决异步问题
        function createNext(middleware, oldNext) {
            return async () => {
                await middleware(oldNext);
            }
        }

        // 反向遍历中间件数组，先把 next 传给最后一个中间件函数
        // 将新的中间件函数存入 next 变量
        // 调用下一个中间件函数，将新生成的 next 传入
        for (let i = middlewares.length - 1; i >= 0; i--) {
            next = createNext(middlewares[i], next);
        }

        return await next();
    }
};