import type { studens, studentObject, studentdel, studentpass } from '@/assets/TSinterface/studen'
import index from '@/untils/request'
// 学员列表
export const studentlist = (data: studens) => {
  return index.get<studentObject>('student/list', data)
}

// 学员删除
export const studentdelete = (data: studentdel) => {
  return index.get('student/delete', data)
}
// 学员批量删除
export const studentdeletes = (data: studentdel) => {
  return index.post('student/deleteall', data)
}

// 学生修改密码
export const studentchangepass = (data: studentpass) => {
  return index.post('student/changepass', data)
}
// 添加学生
export const classesadd = (data: any) => {
  return index.post('student/add', data)
}
