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
export interface RolePage {
  page: number
  psize:number
}