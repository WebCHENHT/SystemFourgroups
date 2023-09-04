// 角色
import index from '@/untils/request'
import type { RootObject, databaseid, DatabaseAdds, databaselist } from '@/assets/TSinterface/databaselist'
// 题库列表
export const datalist = (data: databaselist) => {
  return index.get<RootObject>('database/list', data)
}
// 题库删除
export const DatabaseDelete = (data: databaseid) => {
  return index.get<RootObject>('database/delete', data)
}
// 题库批量删除
export const deleteall = (data: any) => {
  return index.post<RootObject>('database/deleteall', data)
}
// 题库添加
export const DatabaseAdd = (data: DatabaseAdds) => {
  return index.post<RootObject>('database/add', data)
}