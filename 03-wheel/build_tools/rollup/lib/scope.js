/**
 * 模拟作用域链
 */
class Scope {
	constructor(options = {}) {
		this.parent = options.parent // 父作用域
		this.depth = this.parent ? this.parent.depth + 1 : 0 // 作用域层级
		this.names = options.params || [] // 作用域内的变量
		this.isBlockScope = !!options.block // 是否块作用域
	}

	/**
	 * 将变量添加到作用域
	 * @param {*} name 
	 * @param {*} isBlockDeclaration 
	 */
	add(name, isBlockDeclaration) {
		if (!isBlockDeclaration && this.isBlockScope) {
			// it's a `var` or function declaration, and this
			// is a block scope, so we need to go up
			this.parent.add(name, isBlockDeclaration)
		} else {
			this.names.push(name)
		}
	}

	/**
	 * 判断变量是否被声明
	 * @param {*} name 
	 * @returns 
	 */
	cantains(name) {
		
		return !!this.findDefiningScope(name)
	}
	
	/**
	 * 返回变量坐在的作用域
	 * @param {*} name 
	 * @returns 
	 */
	findDefiningScope(name) {
		if (this.names.includes(name)) {
			return this
		}
		if (this.parent) {
			return this.parent.findDefiningScope(name)
		}
		return null
	}
}

module.exports = Scope