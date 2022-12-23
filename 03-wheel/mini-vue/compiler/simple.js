let startTag = /<([a-zA-Z_][\w\-\.]*)((?:\s+([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))*)\s*(\/?)>/;
// // < 任意内容 任意内容="" >
let endTag = /<\/([a-zA-Z_][\w\-\.]*)>/; // </ 任意内容 >

let attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
const bufArray = [];
function parser(html) {
  while (html && last !== html) {
    if (html.indexOf("</") == 0) {
      // 标签结尾
    } else if (html.indexOf("<") == 0) {
      // 标签开头
      match = html.match(startTag);
    }
  }
}




let html = `<div attr="abc" attr2="efg">hij</div>`;
// const ast = parser(html);
// console.log("ast", ast);
// console.log(html.match(startTag))

// var str = "abcdbce";
// str = str.replace(/(b)(c)/g, (...args) => {
//   console.log(args);
//   return "&&";
// });
// console.log(str);

// startTag = /<([a-zA-Z_][\w\-\.]*)>/g
// ([a-zA-Z_][\w\-\.]*) 标签头部 包含下划线和.
// <字母> <div> <([a-zA-Z]*)>
// <字母 字母=字母> <([a-zA-Z]*)(\s*([a-zA-Z]*))=>
// <字母 字母=字母> 可以加空格 \s*
// startTag = /<([a-zA-Z]*)(\s*([a-zA-Z]*))=("*[a-zA-Z]*"*)\s*>/g
// 多attr
startTag = /<([a-z]*)(((\s+([a-z0-9]*))=("[^"]*"))*)\s*>/g;
// startTag = /<([a-zA-Z_]*)((\s+([a-zA-Z][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))*)\s*>/

// attr = /([a-zA-Z0-9)=("[^"]*")/g;
attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

// 找到标签头部
match = html.match(startTag);
console.log("找到头部内容", match);
if (match) {
  chars = false;
  html = html.substring(match[0].length);

  console.log("html", html);
  // 递归调用
  match[0].replace(startTag, parseStartTag);
  console.log("============End============");
  console.log(match[0], bufArray);
}

function parseStartTag(tag, tagName, rest) {
  console.log("parseTag头部:", arguments);
  tagName = tagName.toLowerCase();

  // 解析属性
  const attrs = [];
  let unary = !!arguments[7];

  const node = {
    node: "element",
    tag: tagName,
  };

  // 解析属性
  console.log("rest", rest);
  rest.replace(attr, function (match, name, value) {
    console.log("attr replace:",arguments);

    // const value = arguments[2]
    //   ? arguments[2]
    //   : arguments[3]
    //   ? arguments[3]
    //   : arguments[4]
    //   ? arguments[4]
    //   : "";

    // console.log("===", arguments[2]);

    // const value = arguments[2] ? arguments[2] : arguments[3];

    console.log("value", value);

    if (name == "class") {
      node.class = value;
    } else {
      attrs.push({
        name,
        value,
      });
    }
  });
  // node.dataset = ds;
  node.attrs = attrs;
  if (!unary) {
    bufArray.push(node);
  } else {
    pushChild(node);
  }
}
