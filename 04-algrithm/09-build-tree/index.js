// 广度优先创建二叉树
const node = {
    v: 1,
    l: {
        v: 2,
    },
    r: {
        v: 3,
    }
}

const tree = {

}
const max = 10
const buildTree = (node, i) => {
    if (i > max) return
    node.v = i
    node.l = buildTree({}, 2 * i)
    node.r = buildTree({}, 2 * i + 1)
    return node
}
buildTree(tree, 1)


// 递归中序遍历函数
function inorderTraversal(root) {
    const res = []
    const inorder = (root) => {
        if (!root) {
            return
        }
        res.push(root.v)
        inorder(root.l)
        inorder(root.r)
    }
    inorder(root)
    return res
}
const res = inorderTraversal(tree)
console.log('中序遍历', res)

function postorderTraversal(root) {
    const res = []
    const inorder = (root) => {
        if (!root) {
            return
        }
        inorder(root.l)
        inorder(root.r)
        res.push(root.v)
    }
    inorder(root)
    return res
}

// console.log('后续序遍历', postorderTraversal(tree))

// console.log(JSON.stringify(tree, null, 4))