// 角色
export interface List {
  id: number
  name: string
  menus?: any
}

export interface Data {
  counts: number
  pageCounts: number
  pageSize: number
  list: List[]
}

export interface RootObject {
  data: Data
}
// 删除
export interface roleid{
  id:number
}
export interface RolePage {
  page: number
  psize:number
}
export interface roleMenu {
  roleid:number
}
