const path = require("path");
const fs = require('fs')
const Module = require("./module");
const { default: MagicString } = require("magic-string");
class Bundle {
    constructor({ entry }) {
        this.entryPath = entry
        // 存放所有模块
        this.modules
    }

    /**
     * 输出文件
     * @param {*} outputFileName 
     */
    build(outputFileName) {
        // 查找模块定义
        const entryModule = this.fetchModule(this.entryPath)

        // 查找依赖
        this.statements = entryModule.expandAllStatements();

        // // 生成代码
        // const { code } = this.generate();

    }


    /**
      * 读取模块构建 Module对象链表
      * @param {*} importee 被调用的模块
      * @param {*} importer 调用模块
      * @description main.js 导入 foo.js importee: foo importer main.js
      * @returns 模块实例
      */
    fetchModule(importee, importer) {
        let route;
        if (!importer) {
            // 没有入口说明 主模块
            route = importee;
        } else {
            // 路径处理
            if (path.isAbsolute(importee)) {
                route = importee;
            } else if (importee[0] == ".") {
                // 相对路径
                // 计算相对于导入者的绝对路径
                route = path.resolve(
                    path.dirname(importer),
                    importee.replace(/\.js$/, "") + ".js"
                );
            }
        }
        if (route) {
            // 读代码
            const code = fs.readFileSync(route, "utf-8").toString();
            console.log('code:', this.entryPath)
            console.log('===================')
            console.log(code)
            console.log('===================')
            const module = new Module({
                code,
                path: route, // 模块的绝对路径
                bundle: this, // 上下文
            });
            return module;
        } else {
            // TODO: 第三方库导入 目前不支持
        }

    }
}
module.exports = Bundle