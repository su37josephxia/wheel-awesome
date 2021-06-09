const Koa = require("koa");
const fs = require('fs')
const path = require('path')
const app = new Koa();
app.use(async (ctx) => {
  const {
    request: { url, query },
  } = ctx;
  console.log("url:" + url, "query type", query.type);
  // 首页
  if (url == "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync("./index.html", "utf-8");
    ctx.body = content;
  } else if (url.endsWith(".js")) {
    // js文件
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = "application/javascript";
    const content = fs.readFileSync(p, "utf-8");
    ctx.body = content;
  }
});
app.listen(3000, () => {
  console.log("Vite Start ....");
});
