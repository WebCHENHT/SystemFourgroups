export interface List {
  id: number
  name: string
  classid: number
  sex: number
  mobile?: any
  username: string
  pass: string
  photo?: any
  addtime: string
  addip?: any
  depname: string
  classname: string
}

export interface Data {
  counts: number
  pageCounts: number
  pageSize: number
  list: List[]
}

export interface studentObject {
  data: Data
}

export interface studens {
  page: number
  psize: number
  key: string
  depid: number
  classid: string
}
export interface studentdel {
  id: number
}

export interface studentpass {
  oldpass: string
  pass: string
}
