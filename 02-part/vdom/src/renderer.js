
export const createMount = ({
  createElement,
  patchProp,
  mountElement,
  insert,
  createText,
}) => {
  function mountElement(vnode, container) {
    // 渲染成真实的 dom 节点
    const el = (vnode.el = createElement(vnode.tag));

    // 处理 props
    if (vnode.props) {
      for (const key in vnode.props) {
        const val = vnode.props[key];
        patchProp(vnode.el, key, null, val);
      }
    }

    // 要处理 children
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((v) => {
        mountElement(v, el);
      });
    } else {
      insert(createText(vnode.children), el);
    }

    // 插入到视图内
    insert(el, container);

    return vnode;
  }

  return mountElement;
};
