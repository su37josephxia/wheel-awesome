// finger guess
exports.check = function check(n) {
    var cnt = 0;
    for (var rock = 0; rock <= n; rock++) {
        for (var paper = 0; paper <= n - rock; paper++) {
            var scissors = n - rock - paper;
            if (rock > scissors) {
                if (rock != paper) {
                    cnt++;
                }
            } else if (rock < scissors) {
                if (paper != scissors) {
                    cnt++;
                }
            } else {
                // 相等的情况
                if (paper > rock) {
                    cnt++;
                }
            }
        }
    }
    return cnt;
}