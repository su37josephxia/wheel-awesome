export const createDiff = ({
  createElement,
  patchProp,
  setText,
  mountElement,
  replaceElement,
}) => {
  const diff = (oldNode, newNode) => {
    // 1. 如果 tag 都不一样的话，直接替换
    // 2. 如果 tag 一样的话
    //    1. 要检测 props 哪些有变化
    //    2. 要检测 children  -》 特别复杂的
    const { props: oldProps, children: oldChildren = [] } = oldNode;
    const { props: newProps, children: newChildren = [] } = newNode;
    if (oldNode.tag !== newNode.tag) {
      // 同层级比较
      // TODO
      replaceElement(oldNode.el, createElement(newNode.tag));
      // oldNode.el.replaceWith(createElement(newNode.tag));
    } else {
      const el = (newNode.el = oldNode.el);
      // 对比 props
      // 1. 新的节点不等于老节点的值 -> 直接赋值
      // 2. 把老节点里面新节点不存在的 key 都删除掉
      if (newProps) {
        Object.keys(newProps).forEach((key) => {
          if (newProps[key] !== oldProps[key]) {
            patchProp(el, key, oldProps[key], newProps[key]);
          }
        });
        // 遍历老节点 -》 新节点里面没有的话，那么都删除掉
        Object.keys(oldProps).forEach((key) => {
          if (!newProps[key]) {
            patchProp(el, key, oldProps[key], null);
          }
        });
      }
      // 对比 children
      // newChildren -> string
      // oldChildren -> string   oldChildren -> array
      // newChildren -> array
      // oldChildren -> string   oldChildren -> array
      if (typeof newChildren === "string") {
        if (typeof oldChildren === "string") {
          if (newChildren !== oldChildren) {
            setText(el, newChildren);
          }
        } else if (Array.isArray(oldChildren)) {
          // TODO：把之前的元素都替换掉
          // oldNode.el.textContent = newChildren;
          setText(old.el, newChildren);
        }
      } else if (Array.isArray(newChildren)) {
        if (typeof oldChildren === "string") {
          // TODO： 清空之前的数据
          // n1.el.innerHTML = "";
          setText(oldNode.el, "");

          // 把所有的 children mount 出来
          newChildren.forEach((vnode) => {
            mountElement(vnode, el);
          });
        } else if (Array.isArray(oldChildren)) {
          // a, b, c, d, e -> new
          // a1,b1,c1,d1 -> old
          // 如果 new 的多的话，那么创建一个新的
          // a, b, c -> new
          // a1,b1,c1,d1 -> old
          // 如果 old 的多的话，那么把多的都删除掉
          const length = Math.min(newChildren.length, oldChildren.length);
          for (let i = 0; i < length; i++) {
            const oldVnode = oldChildren[i];
            const newVnode = newChildren[i];
            // 可以十分复杂
            diff(oldVnode, newVnode);
          }
          if (oldChildren.length > length) {
            // 说明老的节点多
            // 都删除掉
            for (let i = length; i < oldChildren.length; i++) {
              remove(oldChildren[i], el);
            }
          } else if (newChildren.length > length) {
            // 说明 new 的节点多
            // 那么需要创建对应的节点
            for (let i = length; i < newChildren.length; i++) {
              mountElement(newChildren[i], el);
            }
          }
        }
      }
    }
  };

  return diff;
};
