/**
 * 问题描述：有n个人，分配到10张桌子上，每张桌子最多坐10个人，每个人至少坐1个人，问有多少种分配方案？
 */
exports.check = function check(remain, pre, max = 10) {
    //没人可分配则结束
    if (remain < 0) return 0;
    if (remain == 0) return 1;
    var cnt = 0;
    for (var i = pre; i <= max; i++) {//分配到桌子的人数
        cnt += check(remain - i, i);
    }
    return cnt;
}
var memo = {};
exports.checkMem = function checkMem(remain, pre, max = 10) {
    if (memo[remain + '-' + pre]) return memo[remain + '-' + pre];
    //没人可分配则结束
    if (remain < 0) return 0;
    if (remain == 0) return 1;
    var cnt = 0;
    for (var i = pre; i <= max; i++) {//分配到桌子的人数
        cnt += checkMem(remain - i, i);
    }
    return memo[remain + '-' + pre] = cnt;
}

exports.checkDP = function checkDP(N, pre, M = 10) {
    var table = new Array(M + 1)
    for (var i = 0; i <= M; i++) {
        table[i] = new Array(N + 1)
        for (var j = 0; j <= N; j++) {
            table[i][j] = 0;
        }
    }

    for (var i = 0; i <= M; i++) {
        table[i][0] = 1;
    }

    for (var i = 1; i <= M; i++) {
        for (var j = 2; j <= N; j++) {
            if ((i >= 2) && (j >= i)) table[i][j] += table[i][j - i];
            if (i > 2) table[i][j] += table[i - 1][j];
        }
    }
    return table[M][N];
}
