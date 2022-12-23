const net = require("net");
const getResponse =require('./static')


const server = net.createServer(function (connection) {
  console.log("client connected");
  connection.on("data", (data) => {

    console.log('################')
    const res = getResponse(data)
    console.log(res)
    console.log('################')
  
    connection.end(res)
  });
  connection.on("end", function () {
    console.log("客户端关闭连接");
  });
  // connection.end(formater.format(res));

});
server.listen(3000, function () {
  console.log("server is listening");
});
