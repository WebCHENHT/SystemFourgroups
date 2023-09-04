import type { subjectsheader, subjectsObject, subjectsid } from '@/assets/TSinterface/subjects'
import index from '@/untils/request'
// 获取试卷列表  
export const subjectslist = (data: subjectsheader) => {
  return index.get<subjectsObject>('subjects/list', data)
}
// 获取单条试卷信息
export const subjectsget = (data: subjectsid) => {
  return index.get<subjectsObject>('subjects/get', data)
}
// 删除试卷
export const subjectsdelete = (data: subjectsid) => {
  return index.get('subjects/delete', data)
}
// 学员批量删除
// export const studentdeletes = (data: studentdel) => {
//   return index.post('student/deleteall', data)
// }

// 学生修改密码
// export const studentchangepass = (data: studentpass) => {
//   return index.post('student/changepass', data)
// }
// 添加学生
// export const classesadd = (data: any) => {
//   return index.post('student/add', data)
// }
