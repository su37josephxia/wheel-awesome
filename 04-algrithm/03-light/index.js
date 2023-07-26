exports.getNum = function (N) {
    /**
     * 获取两位数的亮灯数
     */
    function check(num) {
        var light = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
        return light[Math.floor(num / 10)] + light[num % 10]
    }

    var lights = new Array(60)
    for (var i = 0; i < 60; i++) {
        lights[i] = check(i)
    }

    var cnt = 0
    for (var h = 0; h < 24; h++) {
        for (var m = 0; m < 60; m++) {
            for (var s = 0; s < 60; s++) {
                if (lights[h] + lights[m] + lights[s] === N) {
                    cnt++
                }
            }
        }
    }
    return cnt
}