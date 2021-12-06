var net = require("net");
var server = net.createServer((connection) => {
  console.log("client connected");
  connection.on("data", (data) => {
    console.log("Server接收: " + data.toString());
  });
  connection.on("end", function () {
    console.log("客户端关闭连接");
  });
  connection.end("Hello I am \r\n");
});
server.listen(3000, function () {
  console.log("server is listening at 3000");
});
