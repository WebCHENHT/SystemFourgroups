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
      children: []
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
          title: item.name,
          url: '/SystemMenu' + item.url,
          keepAlive: true
        },
        component: viteComponent[viewsurl]
      }

      router.addRoute('SystemMenu', obj)
    })
    router.addRoute('SystemMenu', {
      path: 'SystemMenu/exam/ExamsTudent',
      name: 'ExamsTudent',
      meta: {
        title: '阅卷分析',
        url: '/SystemMenu/exam'
      },
      component: () => import('../views/exam/ExamsTudent.vue')
    })
    router.addRoute('SystemMenu', {
      path: 'SystemMenu/subjects/SubjectsAdd',
      name: 'SubjectsAdd',
      meta: {
        title: '创建试卷',
        url: '/SystemMenu/subjects'
      },
      component: () => import('../views/subjects/SubjctsAdd.vue')
    })
    router.addRoute({
      path: '/SystemMenu/stutest/examprepare',
      name: 'stutest',
      meta: {
        title: '考试详情',
        url: '/SystemMenu/stutest'
      },
      component: () => import('../views/stutest/ExamprepareView.vue')
    })
    router.addRoute({
      path: '/SystemMenu/stutest/examresults',
      name: 'examresults',
      meta: {
        title: '考试结果',
        url: '/SystemMenu/stutest'
      },
      component: () => import('../views/stutest/ExamresultView.vue')
    })
    router.addRoute({
      path: '/SystemMenu/stutest/Questions',
      name: 'Questions',
      meta: {
        title: '答题',
        url: '/SystemMenu/stutest'
      },
      component: () => import('../views/stutest/QuestionsView.vue')
    })
    router.addRoute('SystemMenu', {
      path: '/SystemMenu/databaselist/databasequestionlist',
      name: 'databasequestionlist',
      meta: {
        title: '试题详情',
        url: '/SystemMenu/databaselist'
      },
      component: () => import('../views/databaselist/databasequestionlist.vue')
    })
    router.addRoute('SystemMenu', {
      path: '/SystemMenu/test/AnalyseView',
      name: 'AnalyseView',
      meta: {
        title: '考试分析',
        url: '/SystemMenu/test'
      },
      component: () => import('../views/test/AnalyseView.vue')
    })
    router.addRoute('SystemMenu', {
      path: '/SystemMenu/set',
      name: 'set',
      meta: {
        title: '修改密码',
        url: '/SystemMenu/set'
      },
      component: () => import('../views/set/SetView1.vue')
    })
    router.addRoute('SystemMenu', {
      path: '/SystemMenu/test/TestAdd',
      name: 'TestAdd',
      meta: {
        title: '创建考试',
        url: '/SystemMenu/test'
      },
      component: () => import('../views/test/TestAddView.vue')
    })
    router.addRoute({
      path: '/SystemMenu/stutest/ViewthetestpaperVview',
      name: 'ViewthetestpaperVview',
      meta: {
        title: '查看试卷',
        url: '/SystemMenu/stutest'
      },
      component: () => import('../views/stutest/ViewthetestpaperVview.vue')
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
