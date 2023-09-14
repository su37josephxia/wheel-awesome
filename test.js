const tree = {};
let p = tree
for (let i = 1; i < 10 + 1; i++) {
    if (!p.v) {
        p.v = i
    } else if (!p.l) {
        p.l = { v: i }
    } else if (!p.r) {
        p.r = { v: i }
    } else {
        p.l.l = { v: i }
        p = p.l
        // p = p.l
        // p.v = i
    }
}
console.log(JSON.stringify(tree, '', 4))