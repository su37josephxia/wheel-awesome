const { bigAdd, bigMin } = require("../index");

describe("大数加减", () => {
  describe("加法", () => {
    it("普通加法", () => {
      expect(bigAdd("1", "1")).toEqual("2");
      expect(bigAdd("9", "1")).toEqual("10");
      expect(bigAdd("10", "1")).toEqual("11");
      expect(bigAdd("19999", "1")).toEqual("20000");
      expect(bigAdd("99999", "1")).toEqual("100000");
      expect(bigAdd("100", "1")).toEqual("101");
      expect(bigAdd("1", "199")).toEqual("200");
    });
  });
  describe("减法", () => {
    it("正减正", () => {
      expect(bigMin("1", "1")).toEqual("0");
      expect(bigMin("0", "1")).toEqual("-1");
      expect(bigMin("10", "1")).toEqual("9");
      expect(bigMin("19", "1")).toEqual("18");
      expect(bigMin("100", "1")).toEqual("99");
      expect(bigMin("1", "100")).toEqual("-99");
    });
    it("正减负", () => {
      expect(bigMin("1", "-1")).toEqual("2");
      expect(bigMin("0", "-1")).toEqual("1");
      expect(bigMin("10", "-1")).toEqual("11");
      expect(bigMin("19", "-1")).toEqual("20");
      expect(bigMin("100", "-1")).toEqual("101");
      expect(bigMin("1", "-100")).toEqual("101");
    });
    it("负减正", () => {
      expect(bigMin("-1", "1")).toEqual("-2");
      expect(bigMin("-2", "1")).toEqual("-3");
      expect(bigMin("-10", "1")).toEqual("-11");
      expect(bigMin("-19", "1")).toEqual("-20");
      expect(bigMin("-100", "1")).toEqual("-101");
      expect(bigMin("-1", "100")).toEqual("-101");
    });
    it("负减负", () => {
      expect(bigMin("-1", "-1")).toEqual("0");
      expect(bigMin("-2", "-1")).toEqual("-1");
      expect(bigMin("-10", "-1")).toEqual("-9");
      expect(bigMin("-19", "-1")).toEqual("-18");
      expect(bigMin("-100", "-1")).toEqual("-99");
      expect(bigMin("-1", "-100")).toEqual("99");
    });
  });
});
