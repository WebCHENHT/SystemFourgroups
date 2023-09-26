<template>
  <div v-loading="loading">
    <div class="stutesbox" v-if="StutesDatas.length > 0">
      <div class="contotest">
        <div class="Tesgtbox">
          <div
            class="stutesli"
            v-for="(item, index) in StutesDatas"
            :key="index"
            @click="tioazhs(item, item.result)"
          >
            <div class="stutesboxtop">
              <img src="../assets/img/wait.4d1f79c9.jpg" alt="" v-if="item.result === '待阅卷'" />
              <img
                src="../assets/img/didNotPass.dc717b15.jpg"
                alt=""
                v-if="item.result === '未通过'"
              />
              <img src="../assets/img/yes.8b1bd2e5.jpg" alt="" v-if="item.result === '已通过'" />
              <img
                src="../assets/img/notInvolved.69f5f7c2.jpg"
                alt=""
                v-if="item.result === '未考试'"
              />
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="buttomtime">
              <div>
                考试时间:{{
                  item.begintime !== null && item.endtime !== null
                    ? `${dayjs(item.begintime).format('YYYY-MM-DD HH:mm')}至${dayjs(
                        item.endtime
                      ).format('YYYY-MM-DD HH:mm')}`
                    : '不限'
                }}
              </div>
              <div>0人通过</div>
            </div>
          </div>
        </div>
        <div style="width: 100%; display: flex; justify-content: center; margin-top: 30px">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 36, 24, 12].reverse()"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
let props = defineProps<{
  StutesDatas: any
  loading: boolean
  total: number
}>()
let emits = defineEmits<{
  (name: 'MyhandleSize', value: any): void
  (name: 'MyhandleCurrent', value: any): void
}>()
let router = useRouter()

const currentPage4 = ref(1)
const pageSize4 = ref(12)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const tioazhs = (data: any, status: any) => {
  if (status === '未考试') {
    router.push({
      path: '/SystemMenu/stutest/examprepare',
      query: {
        id: data.id
      }
    })
  } else {
    router.push({
      path: '/SystemMenu/stutest/examresults',
      query: {
        id: data.id
      }
    })
  }
}
const handleSizeChange = (val: number) => {
  emits('MyhandleSize', val)
}
const handleCurrentChange = (val: number) => {
  emits('MyhandleCurrent', val)
}
</script>

<style lang="less" scoped>
.stutesbox {
  width: 100%;
  background-color: #fff;
  height: 94vh;
  .contotest {
    height: 94%;

    .Tesgtbox {
      display: flex;
      flex-wrap: wrap;
      .stutesli {
        cursor: pointer;
        width: 30%;
        background-color: #fafbff6a;
        border: #ebebeb 1px solid;
        border-radius: 5px;
        padding: 10px 10px 20px;
        margin-top: 15px;
        margin-left: 20px;
        -webkit-transition: transform 0.5s ease-in;
      }
      .stutesli:hover {
        transform: scale(1.05);
        -webkit-transition: transform 0.5s ease-in;
      }
    }
  }
}
.stutesboxtop {
  display: flex;
  img {
    width: 130px;
    height: 74px;
  }
  .title {
    width: 60%;
    padding: 10px;
    height: 33px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 20px;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
}
.buttomtime {
  margin-top: 10px;
  font-size: 12px;
  color: #aaabad;
  display: flex;
  justify-content: space-between;
}
</style>
