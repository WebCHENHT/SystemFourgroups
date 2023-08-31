// 部门
import index from '@/untils/request'
import type { RootObject, department } from '@/assets/TSinterface/department'
export const RoleList = (data: department) => {
  return index.get<RootObject>('department/list', data)
}
