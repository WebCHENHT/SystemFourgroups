<template>
  <div style="margin-left: 15px">
    <el-button @click="Exportstudent">{{ props.name }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '@/untils/antishake'
let props = defineProps<{
  //传标题
  wenjis?: string
  //传按钮名称
  name?: string
  //接收id
  id?: number
  //接收testid
  testid?: number
  //接收api接口
  url: any
}>()

const Exportstudent = debounce(async () => {
  let res: any
  if (props.testid) {
    res = await props.url(
      {
        testid: props.testid
      },
      {
        responseType: 'blob'
      }
    )
  } else {
    res = await props.url(
      {
        id: props.id
      },
      {
        responseType: 'blob'
      }
    )
  }

  let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  let url = URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.href = url
  a.setAttribute('download', props.wenjis + '.xlsx')
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}, 1000)
</script>

<style scoped></style>
