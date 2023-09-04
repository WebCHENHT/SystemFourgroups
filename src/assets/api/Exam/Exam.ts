import index from '@/untils/request'
import type {
  SystemTest,
} from '@/assets/TSinterface/SystemTest'
import type {
  Examcan,
  RootObject,
  Examcans,
  question,
  questionsList,
  classdata,
  classesfan,
  optionList,
  optiondata,
} from '@/assets/TSinterface/Exam'
//考试列表
export const TestLists = (data: Examcan) => {
  return index.get<SystemTest>('test/list', data)
}
//考试学生列表
export const studentlist = (data: Examcans) => {
  return index.get<RootObject>('student/test', data)
}


//考试学生试卷抽屉
export const questionlist = (data: question) => {
  return index.get<questionsList>('question/listforstu', data)
}

//班级列表
export const classeslist = (data: classdata) => {
  return index.get<classesfan>('classes/list', data)
}
// 阅卷
export const queslist = (data: optionList) => {
  return index.get<optiondata>('question/listforstu', data)
}




