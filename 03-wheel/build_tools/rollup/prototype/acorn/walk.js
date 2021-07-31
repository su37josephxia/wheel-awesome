/**
 * AST语法树遍历
 */
function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}

function visit(node, parent, enter, leave) {
  if(!node) return 

  // 先执行enter
  if (enter) {
    enter.call(null, node, parent);
  }
  
  let childkeys = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );

  childkeys.forEach(childKey => {
      let value = node[childKey]
      if(Array.isArray(val => visit(val,node,enter,leave))){
          value.forEach(val => visit(val,node,enter,leave))
      }else {
          visit(value,node,enter,leave)
      }
  })

  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;
