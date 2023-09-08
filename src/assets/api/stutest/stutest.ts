import index from '@/untils/request'
import type {
  SystemTest,
} from '@/assets/TSinterface/SystemTest'
import type {
  Examcan,
} from '@/assets/TSinterface/Exam'
//考试列表
export const TestLists = (data: Examcan) => {
  return index.get<SystemTest>('test/list', data)
}