describe("HTTP Parser", () => {
  it("Request测试", () => {
    const createParser = require("../parser");
    const parser = createParser("request");
    const req =
      "GET / HTTP/1.1\r\n" +
      "User-Agent: curl/7.71.1\r\n" +
      "Accept: */*\r\n" +
      "\r\n";
    // console.log(parser.parse(req));
    // TODO 缺乏断言
  });

  it("Response测试", () => {
    const createParser = require("../parser");
    const parser = createParser("response");
    const req =
      "HTTP/1.1 200 OK\r\n" +
      "Date: Sat, 04 Dec 2021 14:24:09 GMT\r\n" +
      "Connection: keep-alive\r\n" +
      "Keep-Alive: timeout=5\r\n" +
      "Content-Length: 14\r\n" +
      "\r\n" +
      "<h1> Hello <h1>";
    // console.log(parser.parse(req));
    // TODO 缺乏断言
  });
});
