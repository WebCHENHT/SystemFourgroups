export interface RuleForm {
  username: string
  pass: string
}

export interface Model {
  id: number
  username: string
  pass: string
  name: string
  tel: string
  depid: number
  depname?: any
  roleid: number
  rolename?: any
}

export interface Menu {
  id: number
  name: string
  ico?: any
  url?: any
  pid: number
  sort: number
  checked: number
  postion?: any
  children?: any
}

export interface LoginAddObject {
  model: Model
  type: string
  menu: Menu[]
  token: string
}


