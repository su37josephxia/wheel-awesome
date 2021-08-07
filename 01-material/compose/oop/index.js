//定义一个链表节点
class Node {
    constructor(middleware) {
        this.data = middleware;
        this.next = null;
    }
}

module.exports.compose = function (middlewares) {
    let firstNode = null;
    let currentNode = null;

    for (let i = 0; i < middlewares.length; i++) {
        const node = new Node(middlewares[i]);

        if (i == 0) {
            firstNode = node
            currentNode = firstNode;
        } else {
            currentNode.next = node;
            currentNode = node;
        }
    }

    return () => {
        function interFunc(node) {
            if (!node) {
                return Promise.resolve();
            }

            return Promise.resolve(
                node.data(
                    () => interFunc(node.next)
                )
            );
        }

        return interFunc(firstNode);
    }
}