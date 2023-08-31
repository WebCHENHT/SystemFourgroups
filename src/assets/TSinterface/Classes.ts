export interface List {
  id: number
  name: string
  classroom: string
  depname: string
  depid: number
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
export interface Classes {
  page: number
  psize: number
  depid: number
  key: string
}
