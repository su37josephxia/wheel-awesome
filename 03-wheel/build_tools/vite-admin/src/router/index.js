import {createRouter,createWebHashHistory} from 'vue-router'

// new class 风格
// func 风格
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:'/', component: () => import('/@/views/home.vue')}
    ]
})
export default router