import { useCounterStore } from '@/stores/counter'

export const instruct = (app: any) => {
  const store = useCounterStore()
  const menus = store.menus
  app.directive('authority', {
    mounted(el: any, binding: any) {
      const res = menus.filter((item: any) => {
        return new RegExp(binding.value.model).test(item.name) && item.pid !== 0
      })

      const arr = res.filter((item: any) => {
        return new RegExp(binding.value.name).test(item.name)
      })

      if (arr.length === 0) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
