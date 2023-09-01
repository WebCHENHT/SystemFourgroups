import index from '@/untils/request'
import type { teacher, TeacherList } from '@/assets/TSinterface/teacher'
export const teacherlist = (data: teacher) => {
  return index.post<TeacherList>('teacher/list', data)
}