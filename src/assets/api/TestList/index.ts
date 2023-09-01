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
  TestAnalyseData
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
export const StudentTest = (data: { testid: number }) => {
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
