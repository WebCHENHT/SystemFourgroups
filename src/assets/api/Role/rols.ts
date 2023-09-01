// 角色
import index from '@/untils/request'
import type {
  RootObject,
  RolePage,
  roleid,
  roleMenu
} from '@/assets/TSinterface/Roleinterface'
// 角色列表
export const RoleList = (data: RolePage) => {
  return index.get<RootObject>('role/list', data)
}
// 角色删除
export const RoleDelete = (data: roleid) => {
  return index.get('role/delete', data)
}
// 权限功能
export const MenuList = (data: roleMenu) => {
  return index.get('menu/list', data)
}
// 添加角色
export const RoleAdd = (data: any) => {
  return index.post('role/add', data)
}
