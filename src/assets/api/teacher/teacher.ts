import index from '@/untils/request'
import type { 
  teacher, RootObject, 
  teacherdeletes, teacherdele,
  teacherchanges, teacherchange,
  RoleRootObject,Rolecan,
  teacherRoot,teacherRootAdd,
} from '@/assets/TSinterface/teacher'
// 师资列表
export const teacherlist = (data: teacher) => {
  return index.get<RootObject>('teacher/list', data)
}
// 师资删除
export const teacherdelete = (data: teacherdele) => {
  return index.get<teacherdeletes>('teacher/delete', data)
}
// 师资密码重置
export const teacherchangePass = (data: teacherchange) => {
  return index.post<teacherchanges>('teacher/changePass', data)
}
// 角色 
export const roleList = (data: Rolecan) => {
  return index.get<RoleRootObject>('role/list', data)
}
// 部门列表
export const DepartmentList = (data: Rolecan) => {
  return index.get<RoleRootObject>('department/list', data)
}
// 师资添加
export const teacherchangeAdd = (data: teacherRootAdd) => {
  return index.post<teacherRoot>('teacher/add', data)
}