import type { Classes, Classesadd, Classesdel, RootObject } from '@/assets/TSinterface/Classes'
import index from '@/untils/request'
// 班级列表
export const ClList = (data: Classes) => {
  return index.get<RootObject>('classes/list', data)
}

// 班级删除
export const classesdelete = (data: Classesdel) => {
  return index.get('classes/delete', data)
}
// 班级批量删除
export const classesdeleteall = (data: Classesdel) => {
  return index.post('classes/deleteall', data)
}

// 添加班级
export const classesadd = (data: Classesadd) => {
  return index.post('classes/add', data)
}
