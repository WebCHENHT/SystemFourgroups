import index from '@/untils/request'
import type {
  TestDatatype,
  SystemTest,
  TestDataupdateState,
  DepartmentListtype,
  ClassesData,
  Classestype,
  StudentType,
  StudentData,
  TeacherType,
  StudentTestType,
  TestGetlimitType,
  TestAnalyseData,
  TestGetForResultData,
  TestGetData,
  TestAddQuestion
} from '@/assets/TSinterface/SystemTest'

//考试列表

export const TestLists = (data: TestDatatype) => {
  return index.get<SystemTest>('test/list', data)
}

//考试修改
export const TestUpdateState = (data: TestDataupdateState) => {
  return index.post('test/updateState', data)
}

//部门列表
export const DepartmentList = (data?: any) => {
  return index.get<DepartmentListtype>('department/list', data)
}

//班级列表
export const ClassesList = (data: ClassesData) => {
  return index.get<Classestype>('classes/list', data)
}
//学生列表
export const StudentList = (data: StudentData) => {
  return index.get<StudentType>('student/list', data)
}

//老师列表
export const TeacherList = (data: { depid: number }) => {
  return index.get<TeacherType>('teacher/list', data)
}

//获取考试学生列表
export const StudentTest = (data: {}) => {
  return index.get<StudentTestType>('student/test', data)
}
//获取考试可见范围
export const TestGetlimit = (data: { testid: number }) => {
  return index.get<TestGetlimitType[]>('test/getlimit', data)
}

//获取考试阅卷老师
export const TestGetmarkteachers = (data: { testid: number }) => {
  return index.get<TestGetlimitType[]>('test/getmarkteachers', data)
}

//获取考试分析统计
export const TestAnalyse = (data: { testid: number }) => {
  return index.get<TestAnalyseData>('test/analyse', data)
}

//获取考试结果

export const TestGetForResult = (data: { testid: number; studentid?: number }) => {
  return index.get<TestGetForResultData>('test/getForResult', data)
}

//根据id获取单个考试信息
export const TestGet = (data: { id: number }) => {
  return index.get<TestGetData>('test/get', data)
}

//修改发布状态

export const TestUpdateStates = (data: { ids: []; state: number }) => {
  return index.post('test/updateState', data)
}

//批量删除试题

export const TestDeleteall = (data: { ids: [] }) => {
  return index.post('test/deleteall', data)
}
//Excle导出
export const StudentExportExcel = (data: any, data1: any) => {
  return index.get('student/exportExcel', data, data1)
}

//创建考试
export const TestAdd = (data: TestAddQuestion) => {
  return index.post('test/add', data)
}
//题库列表
export const DatabaseList = (data?: any) => {
  return index.get('database/list', data)
}

//题库添加
export const DatabaseAdd = (data: {
  id: number
  title: string
  isshow: number
  limits: never[]
}) => {
  return index.post('database/add', data)
}

//题库列表
export const DatabasequestionList = (data?: any) => {
  return index.get('databasequestion/list', data)
}

//获取试卷列表
export const SubjectsList = (data: any) => {
  return index.get('subjects/list', data)
}
//获取单条试卷信息
export const SubjectsGet = (data: any) => {
  return index.get('subjects/get', data)
}

//考试单个删除
export const TestDelete = (data: any) => {
  return index.get('/test/delete', data)
}

//获取考试题目（开始考试）
export const TestStart = (data: { testid: number | string }) => {
  return index.get('/test/start', data)
}
//根据id下载单个考试试题列表

export const TestExportExcel = (data: any, data1: any) => {
  return index.get('/test/exportExcel', data, data1)
}
//考试可见老师添加
export const TestlimitAdd = (data: any) => {
  return index.post('/testlimit/add', data)
}

//考试判卷老师添加
export const TestmarkteacherAdd = (data: any) => {
  return index.post('/testmarkteacher/add', data)
}

//考试学生添加
export const TeststudentsAdd = (data: any) => {
  return index.post('/teststudents/add', data)
}

//获取可以参加考试的学生
export const TestGetstudents = (data: any) => {
  return index.get('/test/getstudents', data)
}
