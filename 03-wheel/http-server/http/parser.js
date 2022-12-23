module.exports = function createParser(type) {
  const httpMessage = {};
  function parse(message) {
    const messages = message.split("\r\n");
    const [head] = messages;
    const headers = messages.slice(1, -2);
    const [body] = messages.slice(-1);
    parseHead(head);
    parseHeaders(headers);
    parseBody(body);
    return httpMessage;
  }

  function parseHead(headStr) {
    if (type === "request") {
      const [method, url, version] = headStr.split(" ");
      httpMessage.method = method;
      httpMessage.url = url;
      httpMessage.version = version;
    } else if (type === "response") {
      const [version, status, message] = headStr.split(" ");
      httpMessage.version = version;
      httpMessage.status = status;
      httpMessage.message = message;
    }
  }

  function parseHeaders(headerStrList) {
    httpMessage.headers = {};
    for (let i = 0; i < headerStrList.length; i++) {
      const header = headerStrList[i];
      let [key, value] = header.split(":");
      key = key.toLocaleLowerCase();
      value = value.trim();
      httpMessage.headers[key] = value;
    }
  }

  function parseBody(bodyStr) {
    if (!bodyStr) return (httpMessage.body = "");
    httpMessage.body = bodyStr;
  }
  return { parse };
};
