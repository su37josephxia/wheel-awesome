import { createApp, h } from "vue"; // 名字
const App = {
  render() {
    return h("div", null, [h("div", null, String("123"))]);
  },
};
createApp(App).mount("#app");

// <div><div>123</div></div>
