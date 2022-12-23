const net = require('net');
const res = `HTTP/1.1 200 OK
Date: Sat, 04 Dec 2021 14:24:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 14

<h1> Hello <h1>
`
const server = net.createServer(function(connection) { 
   console.log('client connected');
   connection.on('data', data => {
       console.log(data.toString())
   })
   connection.on('end', function() {
      console.log('客户端关闭连接');
   });
   // connection.end('Hello World!\r\n');
   connection.end(res)
   // connection.pipe(connection);
});
server.listen(3000, function() { 
  console.log('server is listening');
});