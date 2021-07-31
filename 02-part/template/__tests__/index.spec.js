const { compile } = require("../index");
describe("模板编译", () => {
  it("{{}} 表达式", () => {
    const output = compile("<b>{{ name }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>tom</b>`);
  });

  it("{{}} toUpperCase 表达式", () => {
    const output = compile("<b>{{ name.toUpperCase() }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>TOM</b>`);
  });

  it("{{}} +连接", () => {
    const output = compile("<b>{{ '[' + name + ']' }}</b>")({ name: "tom" });
    expect(output).toBe(`<b>[tom]</b>`);
  });

  it("forEach 遍历", () => {
    const output = compile(
`{%arr.forEach(item => {%}
    <li>{{item}}</li>
{%})%}`
    )
    ({
      arr: ["aaa", "bbb"],
    });
    expect(output).toBe(
`

    <li>aaa</li>


    <li>bbb</li>

`);
  });


  it("if 表达式", () => {
    const output = compile(`{% if(isShow) { %} <b>{{ name }}</b> {% } %}`
       )({ isShow:true ,name: "tom" });
    expect(output).toBe(
`
 <b>tom</b> 
`);
  });
});
