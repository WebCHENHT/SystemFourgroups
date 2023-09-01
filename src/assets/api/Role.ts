// 角色
import index from '@/untils/request'
import type { RootObject, RolePage } from '@/assets/TSinterface/Roleinterface'
export const RoleList = (data: RolePage) => {
  return index.get<RootObject>('role/list', data)
}
// 角色删除
export const RoleDelete = (data: any) => {
  return index.get('role/delete', data)
}