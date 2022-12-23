import { reactive } from "./core/reactivity/index.js";
import { h } from "./core/h.js";

export const App = {
  render(content) {
    return h("div", { testId: content.state.testId }, [
      h("div", null, content.state.title),
      h("div", null, String(content.state.count)),
      h(
        "button",
        {
          onClick: content.state.onClick,
        },
        "click"
      ),
    ]);
  },

  setup() {
    const state = reactive({
      title: "mini-vue",
      count: 0,
      testId: "heihei",
      onClick() {
        state.testId = "hahah";
        state.count++;
        console.log(state);
      },
    });

    window.state1 = reactive({
      content: "hello",
    });

    window.state2 = reactive({
      content: [h("p", null, "123")],
    });

    return {
      state,
      state1,
      state2,
    };
  },
};
