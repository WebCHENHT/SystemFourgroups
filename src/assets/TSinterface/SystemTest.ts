export interface TestDatatype {
  page: number
  psize: number
  key: string
  admin: string
  ismy: string
  opentime: string
  begindate: string
  enddate: string
  state: string
}

export interface TestDataupdateState {
  state: number
  ids: number[]
}

export interface SystemList {
  id: number
  title: string
  info: string
  addtime: string
  teacherid: number
  admin: string
  begintime: string
  endtime: string
  currenttime?: any
  studentStartTime?: any
  stuEndTime?: any
  limittime: number
  qorder: number
  aorder: number
  num: number
  pastnum: number
  scores: number
  pastscores: number
  studentScores: number
  subjectnum: number
  isshow: number
  answershow: number
  studentcounts: number
  incomplete: number
  passCounts: number
  unpassCounts: number
  limits?: any
  markteachers?: any
  students?: any
  databaseid: number
  state: number
  result: string
  studentIsComplete: number
  questions?: any
}

export interface SystemTest {
  counts: number
  pageCounts: number
  pageSize: number
  list: SystemList[]
}

export interface DepartmentList {
  id: number
  pid: number
  name: string
  leaf: number
  children?: any
}

export interface DepartmentListtype {
  list: DepartmentList[]
}

export interface ClassesData {
  depid: number
}

export interface ClassesList {
  id: number
  name: string
  classroom: string
  depname: string
  depid: number
}

export interface Classestype {
  counts: number
  pageCounts: number
  pageSize: number
  list: ClassesList[]
}

export interface StudentLists {
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

export interface StudentType {
  counts: number
  pageCounts: number
  pageSize: number
  list: StudentLists[]
}

export interface StudentData {
  depid: number
  classid: number
}

export interface TeacherList {
  id: number
  username: string
  pass: string
  name: string
  tel: string
  depid: number
  depname: string
  roleid: number
  rolename: string
}

export interface TeacherType {
  counts: number
  pageCounts: number
  pageSize: number
  list: TeacherList[]
}

export interface StudentTestList {
  id: number
  name: string
  classid: number
  sex: number
  mobile?: any
  username?: any
  pass?: any
  oldpass?: any
  photo?: any
  addtime: string
  addip?: any
  depname: string
  classname: string
  readtime?: any
  scores: number
  state: string
  stuBeginTime?: any
  stuEndTime?: any
}

export interface StudentTestType {
  counts: number
  pageCounts: number
  pageSize: number
  list: StudentTestList[]
}

export interface TestGetlimitType {
  id: number
  testid: number
  techerid: number
}

export interface TestAnalysePieItem {
  '70-80': number
  '60-70': number
  '80-90': number
  '90以上': number
  '30-40': number
  '30分以下': number
  '50-60': number
  '40-50': number
}

export interface TestAnalyseModel {
  id: number
  title: string
  info: string
  addtime: string
  teacherid: number
  admin?: any
  begintime: string
  endtime: string
  currenttime: string
  studentStartTime: string
  stuEndTime?: any
  limittime: number
  qorder: number
  aorder: number
  num: number
  pastnum: number
  scores: number
  pastscores: number
  subjectnum: number
  isshow: number
  answershow: number
  studentcounts: number
  incomplete: number
  passCounts: number
  unpassCounts: number
  limits?: any
  markteachers?: any
  students?: any
  databaseid: number
  state: number
  result?: any
  studentIsComplete: number
  questions?: any
}

export interface TestAnalysePassCount {
  pass: number
  unpass: number
}

export interface TestAnalyseData {
  pieItems: TestAnalysePieItem
  model: TestAnalyseModel
  passCounts: TestAnalysePassCount
}
