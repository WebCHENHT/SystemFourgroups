import index from '@/untils/request'

// 学生密码重置
export const StudentPass = (data:any) => {
  return index.post<any>('student/changepass', data)
}