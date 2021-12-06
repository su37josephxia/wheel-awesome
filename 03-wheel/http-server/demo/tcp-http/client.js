var net = require("net");
const req = `GET / HTTP/1.1
User-Agent: curl/7.71.1
Accept: */*

`
var client = net.connect(80,'www.baidu.com',  () =>{
  console.log("连接到服务器！");
  client.write(req)

});
client.on("data", function (data) {
  console.log(data.toString());
  client.end();
});
client.on("end", function () {
  console.log("断开与服务器的连接");
});


