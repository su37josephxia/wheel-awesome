(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('./src/index.js')
    })({"./src/index.js":{"deps":{"./add.js":"./src/add.js","./minus.js":"./src/minus.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _minus = require(\"./minus.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n// index.js\nconsole.log((0, _add[\"default\"])(1, 2));\nvar sum = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus.minus)(2, 1);\nconsole.log(division);"},"./src/add.js":{"deps":{"./minus.js":"./src/minus.js","./c.js":"./src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _minus = require(\"./minus.js\");\n\nvar _c = require(\"./c.js\");\n\nconsole.log(\"minus:\", (0, _minus.minus)(20, 1));\nconsole.log(\"c:\", _c.c);\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"},"./src/minus.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"},"./src/c.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.c = void 0;\nvar c = 888;\nexports.c = c;"}})