module.exports = function createFormater(type) {
  return {
    format(data) {
      const head =
        type === "request"
          ? `${data.method} ${data.url} ${data.version}`
          : `${data.version} ${data.status} ${data.message}`;
      let headers = "";

      // 重新计算 Content-length
      headers['content-length'] = data.body.length

      for (let key in data.headers) {
        const value = data.headers[key];
        headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
      }
      const combineData = [head, headers, data.body].join("\r\n");
      return combineData;
    },
  };
};
