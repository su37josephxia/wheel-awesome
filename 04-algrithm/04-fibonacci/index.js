exports.fi = function fi(n) {
    if (n === 0) return 1
    if (n === 1) return 1
    if (n === 2) return 2
    return fi(n - 1) + fi(n - 2)
}

exports.fi2 = function fi2(n) {
    if (n === 0) return 1
    if (n === 1) return 1
    if (n === 2) return 2
    var a = 1
    var b = 1
    var c = 2
    for (var i = 3; i <= n; i++) {
        a = b
        b = c
        c = a + b
    }
    return c
}


// for (var i = 0; i < 10; i++) {
//     console.log(fi2(i))
// }

