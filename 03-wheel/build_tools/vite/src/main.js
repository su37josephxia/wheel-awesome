// import {str} from './moduleA.js'
// console.log('vite ...' + str)

// 支持第三方库
import {createApp, h} from 'vue'
import App from './App.vue'
import './index.css'
// const App = {
//     render() {
//         // <div><div>Hello  Vite</div></div>
//         return h('div',null, [h('div',null, String('Hello Vite'))])
//     }
// }
createApp(App).mount('#app')
