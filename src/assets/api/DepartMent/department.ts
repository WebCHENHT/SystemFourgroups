// 部门
import index from '@/untils/request'
import type { RootObject, department, DepartmentAdd, Delete } from '@/assets/TSinterface/department'
// 部门列表
export const RoleList = (data: department) => {
  return index.get<RootObject>('department/list', data)
}
// 部门添加、修改
export const DepartAdd = (data: DepartmentAdd) => {
  return index.post<RootObject>('department/add',data)
}
// 部门删除
export const DepartmentDelete = (data: Delete) => {
  return index.get<RootObject>('department/delete', data)
}