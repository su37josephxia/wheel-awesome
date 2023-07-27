/**
 * 长方形截取正方形
 * @param {*} W 长 + 宽 总长度
 * @param {*} N 正好能截取的正方形
 */
exports.check = function (W, N) {
    function cut(w, h) {
        if (w == h) return 1
        if (w > h) {
            var temp = w; w = h; h = temp
        }
        var r = h % w
        var result = Math.floor(h / w)
        if (r > 0) result += cut(w, r)
        return result
    }

    var cnt = 0
    for (var i = 1; i <= W; i++) {
        for (var j = i; j <= W; j++) {
            if (cut(i, j) == N) cnt++
        }
    }
    return cnt
}