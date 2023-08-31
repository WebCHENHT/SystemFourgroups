export const res = (data: any[], current: number | string) => {
  for (let i = 0; i < data.length; i++) {
    const item: any = data[i]
    if (item.id === current) {
      return item.name
    } else {
      // item.children 不等于 undefined && item.children.length 大于 0 时
      if (item.son && item.son.length > 0) {
        const ress: any = res(item.son, current)

        if (ress) {
          return ress
        }
        return current
        // 当 res = undefined 时不会进入判断中
        // 也就是不会return
      }
    }
  }
}
