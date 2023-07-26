exports.check = function (n) {
    function getCount(n) {
        var coin = [10000, 5000, 2000, 1000, 500, 100, 50, 10, 5, 1]
        result = 0
        for (var i = 0; i < coin.length; i++) {
            var cnt = Math.floor(n / coin[i])
            n = n % coin[i]
            result += cnt
        }
        return result
    }
    row = new Array(n + 1)
    row[0] = 1
    for (var i = 1; i < n + 1; i++) {
        row[i] = 0
    }
    for (var i = 0; i < n; i++) {
        for (var j = i + 1; j > 0; j--) {
            row[j] += row[j - 1]
        }
    }
    var total = 0
    for (var i = 0; i < n + 1; i++) {
        total += getCount(row[i])
    }
    return total
}