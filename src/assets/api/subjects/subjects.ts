import type { subjectsObject, subjectsheader, subjectsid } from '@/assets/TSinterface/subjects'
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

// 添加试卷
export const subjectsadd = (data: any) => {
  return index.post('subjects/add', data)
}

// 根据id下载单个试卷试题列表
// export const subjectsadd = (data: any) => {
//   return index.post('subjects/add', data)
// }
