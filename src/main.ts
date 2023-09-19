import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
//element国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// element样式
import 'element-plus/dist/index.css'
// iconfont
import '@/assets/icon/exam/iconfont-exam.css'
import '@/assets/icon/iconfont.css'

import './assets/reset.css'
import { instruct } from './untils/directive'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})

//试题上传
app.provide('url', 'http://apis.90000p.com/exam2212/api/test/upload')
app.use(createPinia())

app.use(router)
app.mount('#app')
app.use(store)
instruct(app)
