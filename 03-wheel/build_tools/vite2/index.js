const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path = require("path");
app.use(async (ctx) => {
  // 提供静态服务

  const {
    request: { url, query },
  } = ctx;
  console.log("url:" + url);
  // index.thml
  if (url === "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync("./index.html", "utf-8");
    content = content.replace(
        "<script ",
        `
        <script>
          window.process = {env:{ NODE_ENV:'dev'}}
        </script>
        <script 
      `
      );
    
    ctx.body = content;
  } else if (url.endsWith(".js")) {
    // *.js
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = "application/javascript";
    const content = fs.readFileSync(p, "utf-8");
    // 改写第三方库模块路径
    // 第三方库 vue => /@moudules/vue
    // from 'xxx'
    ctx.body = rewriteImport(content);
  } else if (url.startsWith("/@modules/")) {
    // 第三方库
    // vue入口  vue =》  /node_modules(绝对路径)
    // /@modules/vue => /xxx/node_modules/vue/
    const prefix = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@modules/", "")
    );

    // dist/vue.runtime.esm-bundler.js
    const module = require(prefix + "/package.json").module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(ret);
  }
  // process.env
});

function rewriteImport(content) {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    console.log("s", s0, s1);
    // . ../ /开头的，都是相对路径
    if (s1[0] !== "." && s1[1] !== "/") {
      return ` from '/@modules/${s1}'`;
    } else {
      return s0;
    }
  });
}

app.listen(3000, () => {
  console.log("Vite Start at 3000");
});
