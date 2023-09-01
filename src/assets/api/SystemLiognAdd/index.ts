import index from '@/untils/request'
import type { RuleForm, LoginAddObject } from '@/assets/TSinterface/SystemLoginInterface'
export const TeacherChecklogin = (data: RuleForm) => {
  return index.post<LoginAddObject>('teacher/checklogin', data)
}



