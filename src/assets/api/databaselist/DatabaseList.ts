// 角色
import index from '@/untils/request'
import type { RootObject, databaseid, DatabaseAdds, databaselist, deletealls } from '@/assets/TSinterface/databaselist'
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
// 题库试题列表
export const  DatabaseList= (data: any) => {
  return index.get<RootObject>('databasequestion/list',data)
}
// 试题批量删除
export const DatabaseDeleteall = (data: deletealls) => {
  return index.post<RootObject>('databasequestion/deleteall', data)
}
// 试题删除
export const Databasedel = (data: databaseid) => {
  return index.get<RootObject>('databasequestion/delete', data)
}
// 试题批量添加
export const databasequestionAddlist = (data: any) => {
  return index.post<RootObject>('databasequestion/addlist', data)
}
// 试题添加
export const databasequestionadd = (data: any) => {
  return index.post<RootObject>('databasequestion/add', data)
}