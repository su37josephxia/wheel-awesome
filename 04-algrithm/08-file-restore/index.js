exports.restore = function (n) {

    var cnt = 0
    for (var i = 0; i < n; i++) {
        cnt += (n - i) * nPr(n, i - 1)
    }
    return cnt
}

function nPr(n, r) {
    var result = 1;
    for (var i = 0; i < r; i++) {
        result *= (n - i);
    }
    return result;
}
