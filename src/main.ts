import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
//element国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// element样式
import 'element-plus/dist/index.css'
// iconfont
import '@/assets/icon/iconfont.css'
import '@/assets/icon/exam/iconfont-exam.css'

import './assets/reset.css'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(store)
