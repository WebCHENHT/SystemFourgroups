export interface List {
  id: number
  title: string
  counts: number
  singles: number
  multiples: number
  judges: number
  blanks: number
  qas: number
  admin: string
  addtime: string
  isshow: number
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
export interface databaselist{
  page: number
  psize: number
  key: string
  admin: string
  ismy:string
}
export interface databaseid{
  id:number
}
export interface deletealls {
  ids: any
}
export interface Limit {
	id: number;
}

export interface DatabaseAdds {
	id:any;
	title: string;
	isshow: number;
	limits: any;
}