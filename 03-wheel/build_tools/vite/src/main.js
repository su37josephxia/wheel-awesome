console.log('main....')
// alert('2')


// import 都会发起一个网络请求 viet拦截这个请求，渲染
import { createApp } from 'vue' // node_module
import App from './App.vue' // 解析成额外的 ?type=template请求 
import './index.css'

createApp(App).mount('#app')


