exports.findArmstrong =
    /**
     * 查找N进制下的自幂数
     * @param {*} N 进制
     * @returns 结果数列 N进制数表示
     */
    function (N) {
        let result = []

        // 搜索的最大值
        let keta = 1
        while (true) {
            if (keta * Math.pow(N - 1, keta) < Math.pow(N, keta - 1)) break
            keta++
        }
        let cnt = 0
        for (let i = N; i < Math.pow(N, keta); i++) {
            // 转换为N进制
            var value = i.toString(N)
            var len = value.length
            // 计算每一位的N次方和
            var sum = 0
            for (let d = 0; d < len; d++) {
                // N进制数转换为10进制的值
                const n = parseInt(value[d], N)
                // 加上他的位数权重
                sum += Math.pow(n, len)
            }
            // 判断是否为自幂数
            if (sum === i) {
                result.push(value)
                cnt++
                if (cnt == N) break
            }
        }
        return result
    }