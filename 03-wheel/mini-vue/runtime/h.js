/**
 * 返回一个虚拟DOM节点
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
function h(tag, props, children = []) {
  return {
    tag,
    props,
    children,
  };
}
