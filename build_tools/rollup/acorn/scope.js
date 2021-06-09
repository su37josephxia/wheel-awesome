


class Scope {
    constructor(options = {}) {
      this.name = options.name;
      this.parent = options.parent;
      this.names = options.params || []; // 此作用域内变量
    }
  
    add(name) {
      this.names.push(name);
    }
  
    /**
     * 找出作用域声明位置
     * @param {*} name
     */
    findDefiningScope(name) {
      if (this.names.includes(name)) {
        return this;
      }
      if (this.parent) {
        return this.parent.findDefiningScope(name);
      }
      return null;
    }
  }

let a = 1;
function one() {
  let b = 2;
  function two(age) {
    let c = 3;
    console.log(a, b, c, age);
  }
  two();
}
one();

let globalScope = new Scope({
  name: "Global",
  params: [],
  parent: null,
});

globalScope.add("a");
let oneScope = new Scope({
  name: "oneScope",
  params: [],
  parent: globalScope,
});

oneScope.add('b')
let twoScope = new Scope({
    name:'twoScope', params: ['ago'], parent: oneScope
})
twoScope.add('c')

let aScope = twoScope.findDefiningScope('a')
console.log(aScope.name)

let bScope = twoScope.findDefiningScope('b')
console.log(bScope.name)

let cScope = twoScope.findDefiningScope('c')
console.log(cScope.name)


let ageScope = twoScope.findDefiningScope('age')
console.log(ageScope.name)


// tree-shaking原理就是基于作用域链


module.exports = Scope;
