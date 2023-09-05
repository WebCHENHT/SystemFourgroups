<template>
  <div style="margin-left: 15px">
    <el-button @click="Exportstudent">{{ props.name }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { StudentExportExcel } from '@/assets/api/TestList/index'
import { debounce } from '@/untils/antishake'
let props = defineProps<{
  name?: string
  testid?: number
  depid?: number
  classid?: number
}>()

const Exportstudent = debounce(async () => {
  let res: any = await StudentExportExcel(
    {
      testid: props.testid as number
    },
    {
      responseType: 'blob'
    }
  )
  let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  let url = URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.href = url
  a.setAttribute('download', '题库.xlsx')
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}, 1000)
</script>

<style scoped></style>
