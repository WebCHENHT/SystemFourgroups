import index from '@/untils/request'
import type { Classes, RootObject } from '@/assets/TSinterface/Classes'
export const ClList = (data: Classes) => {
  return index.get<RootObject>('classes/list', data)
}
