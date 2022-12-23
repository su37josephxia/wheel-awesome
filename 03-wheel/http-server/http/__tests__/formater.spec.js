describe("HTTP Formater", () => {
  it("Request测试", () => {
    const createFormater = require("../formater");
    const formater = createFormater("request");
    const req = {
      method: "GET",
      url: "/",
      version: "HTTP/1.1",
      headers: { "user-agent": "curl/7.71.1", accept: "*/*" },
      body: "",
    };
    console.log(formater.format(req));
    // TODO 缺乏断言
  });

  it("Response测试", () => {
    const createFormater = require("../formater");
    const formater = createFormater("response");
    const res ={
        version: 'HTTP/1.1',
        status: '200',
        message: 'OK',
        headers: {
          date: 'Sat, 04 Dec 2021 14',
          connection: 'keep-alive',
          'keep-alive': 'timeout=5',
          'content-length': '14'
        },
        body: '<h1> Hello <h1>'
      };
    console.log(formater.format(res));
    // TODO 缺乏断言
  });
});
