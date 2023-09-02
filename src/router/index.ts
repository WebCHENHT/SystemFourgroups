import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import indexfors from '@/untils/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SystemLogin',
      meta: {
        title: '登录'
      },
      component: () => import('../views/SystemLogin.vue')
    },
    {
      path: '/SystemMenu',
      name: 'SystemMenu',
      meta: {
        title: '菜单'
      },
      component: () => import('../views/SystemMenu.vue'),
      children:[
      ]
    },
    
   
  ]
})
router.beforeEach(async (to, form, next) => {
  const store = useCounterStore()
  const token = store.token
  const routers = router.getRoutes()
  if (token) {
    if (to.path === '/') {
      next('/SystemMenu')
    } else {
      if (routers.length > 2 && to.path !== 'undefined') {
        next()
      } else {
        await indexfors()
        next({ ...to, replace: true })
      }
      next()
    }
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/')
    }
  }
  document.title = to.meta.title as string
})
export default router
