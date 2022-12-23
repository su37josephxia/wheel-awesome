const createFormater = require("../http/formater");
const craeteParser = require("../http/parser");
const formater = createFormater("response");
const parser = craeteParser("request");
const fs = require("fs");
const { resolve } = require("path");

function getFile(url, dirPath = "./page") {
  let data = "";
  try {
    data = fs.readFileSync(resolve(__dirname, dirPath + url));
  } catch (err) {
    console.error(err);
  } finally {
    return data;
  }
}
const template = {
  version: "HTTP/1.1",
  status: "200",
  message: "OK",
  headers: {
    date: "Sat, 04 Dec 2021 14",
    connection: "keep-alive",
    "keep-alive": "timeout=5",
    // "content-length": "19",
  },
  body: "",
};
/**
 * 响应数据
 * @param {*} req 请求对象
 * @returns
 */
module.exports = function getResponse(reqData) {
  //
  console.log("req", reqData.toString());
  const req = parser.parse(reqData.toString());
  let url = req.url;
  console.log("url....", url);
  url = url === "/" ? "/index.html" : url;
  const file = getFile(url);
  const data = Object.create(template);
  data.body = file.toString();
  return formater.format(data);
};
