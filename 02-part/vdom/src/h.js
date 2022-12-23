/**
 * 返回一个虚拟DOM节点
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
export function h(tag, props, children = []) {
  return {
    tag,
    props,
    children,
  };
}


