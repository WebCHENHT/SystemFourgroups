export interface List {
  id: number
  title: string
  counts: number
  singles: number
  multiples: number
  judges: number
  blanks: number
  qas: number
  scores: number
  admin: string
  addtime: string
  isshow: number
  limits?: any
  questions?: any
}

export interface Data {
  counts: number
  pageCounts: number
  pageSize: number
  list: List[]
}

export interface subjectsObject {
  data: Data
}

export interface subjectsheader {
  page: number
  psize: number
  key: string
  admin: string
  ismy: string
}

// 获取单条试卷
export interface subjectsid {
  id:number
}
