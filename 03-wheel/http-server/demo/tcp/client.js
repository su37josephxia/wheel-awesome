var net = require("net");
var client = net.connect(3000, () => {
  console.log("连接到服务器！");
});

let n = 3;
const interval = setInterval(() => {
  const msg = "Time " + new Date().getTime();
  console.log("客户端发送: " + msg);
  client.write(msg);
  if (n-- === 0) {
    client.end();
    clearInterval(interval);
  }
}, 500);

client.on("end", function () {
  console.log("断开与服务器的连接");
});
