import { createApp } from 'vue'
import App from './App.vue'
import router from '/@/router'
createApp(App)
// 使用vue插件
.use(router)
.mount('#app')
