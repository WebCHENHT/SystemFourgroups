export interface List {
  id: number
  pid: number
  name: string
  leaf: number
  children?: any
}

export interface Data {
  list: List[]
}

export interface RootObject {
  data: Data
}
export interface department {
  page: number
  psize:number
}
export interface DepartmentAdd {
  id: number
  pid: number
  name: string
}
export interface Delete{
  id:number
}
  
