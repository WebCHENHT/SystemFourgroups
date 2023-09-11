export interface TestDatatype {
  page: number
  psize: number
  key: string
  admin?: string
  ismy?: string
  opentime?: string
  begindate?: string
  enddate?: string
  state?: string
  result?: string
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

export interface TestGetForResultAnswer {
  id: number
  answerno: string
  questionid: number
  content: string
}

export interface TestGetForResultQuestion {
  id: number
  testid: number
  title: string
  type: string
  scores: number
  answer: string
  tags: string
  explains: string
  answers: TestGetForResultAnswer[]
  answerid: number
  comments?: any
  studentanswer: string
  studentscores: number
}

export interface TestGetForResultData {
  id: number
  title: string
  info: string
  addtime: string
  teacherid: number
  admin?: any
  begintime: string
  endtime: string
  currenttime: string
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
  limits?: any
  markteachers?: any
  students?: any
  databaseid: number
  state: number
  result: string
  studentScores: number
  stuEndTime: string
  questions: TestGetForResultQuestion[]
}

export interface TestGetLimit {
  id: number
  testid: number
  techerid: number
}

export interface TestGetMarkteacher {
  id: number
  testid: number
  techerid: number
}

export interface TestGetStudent {
  id: number
  testid: number
  studentid: number
}

export interface TestGetAnswer {
  id: number
  answerno: string
  questionid: number
  content: string
}

export interface TestGetQuestion {
  id: number
  testid: number
  title: string
  type: string
  scores: number
  answer: string
  tags: string
  explains: string
  answers: TestGetAnswer[]
  answerid: number
  comments?: any
  studentanswer?: any
  studentscores?: any
}

export interface TestGetData {
  id: number
  title: string
  info: string
  addtime: string
  teacherid: number
  admin?: any
  begintime: string
  endtime: string
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
  currenttime: string
  limits: TestGetLimit[]
  markteachers: TestGetMarkteacher[]
  students: TestGetStudent[]
  databaseid: number
  state: number
  questions: TestGetQuestion[]
}

export interface TestAddLimit {
  id: number
}

export interface TestAddMarkteacher {
  id: number
}

export interface TestAddStudent {
  studentid: number
}

export interface TestAddAnswer {
  id: number
  answerno: string
  questionid: number
  content: string
}

export interface TestAddQuestion {
  id: number
  testid: number
  title: string
  type: string
  scores: number
  answer: string
  tags: string
  explains: string
  answers: TestAddAnswer[]
}

export interface TestAddObject {
  id: number
  title: string
  info: string
  admin: string
  begintime: string
  endtime: string
  limittime: number
  scores: number
  pastscores: number
  qorder: number
  aorder: number
  answershow: number
  isshow: number
  databaseid: number
  state: number
  limits: TestAddLimit[]
  markteachers: TestAddMarkteacher[]
  students: TestAddStudent[]
  questions: TestAddQuestion[]
}
