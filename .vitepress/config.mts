import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "WHEEL-AWESOME",
  description: "Talk is cheap. Show me the code.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '新手村任务', link: '/00-helloworld/unittest/README.md' }
    ],

    sidebar: [
      {
        text: '新手村任务', link: '/00-helloworld/unittest/README.md'
      },
      {
        text: 'Material(材料)',
        items: [
          { text: 'call-apply-bind', link: '/01-material/call-apply-bind/README.md' },
          { text: '中间件实现 - Compose', link: '/compose/README.md' }
        ]
      },
      {
        text: 'Part(零部件)',
        items: [
          { text: 'Mixin(混入)', link: '/02-part/mixin/README.md' },
          { text: 'Reactivity(响应式)', link: '/02-part/reactivity/README.md' },
          // { text: 'Template(模版引擎)', link: '/02-part/template/README.md' },
          { text: 'Vdom(虚拟Dom)', link: '/02-part/vdom/README.md' },
          { text: 'Subscribe(响应式)', link: '/02-part/subscribe/README.md' },
        ]
      },
      {
        text: 'Wheel(轮子)',
        items: [
          { text: 'Vue', link: '/02-part/mixin/README.md' },
          { text: 'Babel', link: '/02-part/mixin/README.md' },
          { text: 'Babel', link: '/02-part/mixin/README.md' },
          { text: 'Rollup', link: '/02-part/reactivity/README.md' },
          { text: 'Vite', link: '/02-part/reactivity/README.md' },
          { text: 'HttpServer', link: '/02-part/reactivity/README.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
