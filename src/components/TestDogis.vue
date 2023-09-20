<template>
  <el-dialog v-model="dialogVisible" :title="getDogisTest.title" width="85%" @close="TestDigclose">
    <div class="toptitle">
      <div class="topleft">
        <div class="zongfen">
          <div>总分</div>
          <div>{{ getDogisTest.scores }}</div>
        </div>
        <div class="fenshuix">
          <div>通过分数</div>
          <div>{{ getDogisTest.pastscores }}</div>
        </div>
        <div class="zongfen">
          <div>考试时长</div>
          <div>{{ getDogisTest.limittime !== 0 ? getDogisTest.limittime : '不限' }}</div>
        </div>
        <div class="fenshuix">
          <div>开放时间</div>
          <div>
            {{
              getDogisTest.begintime === null && getDogisTest.endtime === null
                ? '不限'
                : getDogisTest.begintime + '至' + getDogisTest.endtime
            }}
          </div>
        </div>
      </div>

      <TestExpor
        :id="testid"
        :name="'导出excel'"
        :wenjis="getDogisTest.title"
        :url="TestExportExcel"
      ></TestExpor>
    </div>
    <div class="Testboxs">
      <div class="Testboxskao" v-for="(item, index) in getDogisTest.questions" :key="index">
        <div class="titleType">
          <div>{{ index + 1 }}.{{ item.type }}</div>
          <div>分值：{{ item.scores }}</div>
        </div>
        <div style="padding: 15px 10px; color: #909090" v-html="item.title"></div>
        <div v-if="item.type === '单选题' || item.type === '多选题'">
          <div
            :class="item.answer.includes(item1.answerno) ? 'Testone Testonesoum' : 'Testone'"
            v-for="(item1, index1) in item.answers"
            :key="index1"
          >
            <el-radio :label="3"> {{ item1.answerno }}:</el-radio>
            <div>{{ item1.content }}</div>
          </div>
        </div>
        <div v-if="item.type === '判断题'">
          <div class="tiankongs">
            <div>
              正确答案 <span style="margin-left: 8px">{{ item.answer }}</span>
            </div>
          </div>
        </div>
        <div v-if="item.type === '问答题'">
          <div class="jexis">
            <div>
              答案解析： <span style="margin-left: 8px">{{ item.explains }}</span>
            </div>
          </div>
        </div>
        <div v-if="item.type === '填空题'">
          <div class="options">
            <div class="tiankongs">
              <div>
                正确答案 <span style="margin-left: 8px">{{ item.answer }}</span>
              </div>
            </div>
            <div class="jexis">
              <div>
                答案解析： <span style="margin-left: 8px">{{ item.explains }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TestGetData } from '@/assets/TSinterface/SystemTest'
import TestExpor from './TestExpor.vue'
import { TestExportExcel } from '@/assets/api/TestList/index'
let emits = defineEmits<{
  (name: 'MyTestDigclose'): any
}>()
let testid = ref(0)
let getDogisTest = ref<TestGetData | any>([])
const dialogVisible = ref(false)

const TestDigclose = () => {
  emits('MyTestDigclose')
}
defineExpose({ dialogVisible, getDogisTest, testid })
</script>

<style lang="less" scoped>
.jexis {
  background-color: #f5faff;
  display: flex;
  align-items: center;
  height: 26px;
  margin-bottom: 10px;
  padding: 10px;
  color: #9dadbc;
}
.tiankongs {
  background-color: #eefaf6;
  display: flex;
  align-items: center;
  height: 26px;
  margin-bottom: 10px;
  padding: 10px;
  color: #70d3b2;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.toptitle {
  margin-top: -20px;
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px;
  border-bottom: 1px solid #eee;
  .topleft {
    display: flex;
    height: 57px;

    .zongfen {
      display: flex;
      flex-direction: column;

      justify-content: space-between;
    }
    .fenshuix {
      padding: 0 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
.Testboxs {
  max-height: 74vh;
  overflow-y: scroll;
  .Testboxskao {
    padding: 15px 10px;
    .titleType {
      width: 130px;
      display: flex;
      justify-content: space-around;
    }
  }
}
.Testonesoum {
  background-color: #eefaf6;
  margin-bottom: 10px;
}
.Testone {
  display: flex;
  align-items: center;
  height: 26px;
  padding: 8px;
}
/deep/.el-radio {
  margin-right: 10px;
}
/deep/.el-radio__inner {
  width: 20px;
  height: 20px;
}
</style>
