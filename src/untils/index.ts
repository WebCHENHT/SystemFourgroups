import router from '@/router'
import { useCounterStore } from '@/stores/counter'
const viteComponent = import.meta.glob('../views/*/*.vue')
export default function () {
  return new Promise((resolve, reject) => {
    const store = useCounterStore()
    router.addRoute({
      path: '/SystemMenu',
      name: 'SystemMenu',
      meta: {
        title: '菜单'
      },
      component: () => import('../views/SystemMenu.vue'),
      children: [],
      redirect: '/SystemMenu/test'
    })

    const menu: any[] = store.menus
    const res = menu.filter((item) => {
      return item.url !== null
    })
    res.forEach((item: any) => {
      const viewsurl =
        '../views' +
        item.url +
        '/' +
        String(item.url).charAt(1).toLocaleUpperCase() +
        String(item.url).slice(2) +
        'View' +
        '.vue'

      const obj = {
        path: '/SystemMenu' + item.url,
        name: item.url,
        meta: {
          name: item.name
        },
        component: viteComponent[viewsurl]
      }
      router.addRoute('SystemMenu', obj)
    })
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: {
        name: '404'
      },
      component: () => import('../views/error.vue')
    })
    resolve(true)
  })
}
