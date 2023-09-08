<template>
  <div class="Paper" v-if="drawer">
    <div class="toptitle">试题详情</div>
    <div class="del" @click="drawer = false">x</div>
    <div class="content">
      <div class="topbox">
        <div class="fenzhis">
          <span>{{ Optionstyles.type }}</span>
          <span style="margin-left: 10px">分值：{{ Optionstyles.scores }}</span>
          <div style="margin-top: 10px; font-size: 14px" v-html="Optionstyles.title"></div>
        </div>
        <div v-for="(item, index) in Optionstyles.answers" :key="index">
          <div v-if="Optionstyles.type === '单选题' || Optionstyles.type === '多选题'">
            <div class="option">
              <el-form-item>
                <el-radio-group
                  v-model="radio"
                  :class="
                    Optionstyles.answer.split(',').includes(item.answerno) ||
                    Optionstyles.answer.split('|').includes(item.answerno)
                      ? 'optionradios'
                      : 'el-radio-group'
                  "
                >
                  <div v-if="Optionstyles.type === '单选题'">
                    <el-radio :label="index"
                      >{{ item.answerno }}:<span style="margin-left: 10px">
                        {{ item.content }}</span
                      ></el-radio
                    >
                  </div>
                  <div v-if="Optionstyles.type === '多选题'">
                    <el-checkbox v-model="checkbox" @change="chenckboxs"
                      >{{ item.answerno }}:<span style="margin-left: 10px">
                        {{ item.content }}</span
                      >
                    </el-checkbox>
                  </div>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
        <div
          v-if="
            Optionstyles.type === '填空题' ||
            Optionstyles.type === '问答题' ||
            Optionstyles.type === '判断题'
          "
          style="margin-top: 20px"
        >
          <!-- databasequestion/list  -->
          <div v-if="Optionstyles.type === '填空题' || Optionstyles.type === '判断题'">
            <div class="radi">
              正确答案
              <span style="margin-left: 20px">{{
                String(Optionstyles.answer).split('|').join().replace(/,/g, '、')
              }}</span>
            </div>
          </div>

          <div v-if="Optionstyles.type === '填空题' || Optionstyles.type === '问答题'">
            <div class="expla">答案解析：{{ Optionstyles.explains }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let radio = ref([])
let checkbox: any = ref('false')
let Optionstyles: any = ref()
let drawer = ref(false)
const chenckboxs = (data: any) => {
  if (data === true) {
    checkbox.value = 1
  } else {
    checkbox.value = 0
  }
}

defineExpose({ drawer, Optionstyles })
</script>

<style lang="less" scoped>
.expla {
  padding: 13px 17px;
  width: 98%;
  background-color: #f5faff;
}
.radi {
  padding: 13px 17px;
  width: 98%;
  background-color: #eefaf6;
  margin-bottom: 10px;
  color: #65d1ac;
}
.el-radio-group {
  padding: 1px 17px;
  width: 98%;
}
/deep/.el-radio__inner {
  width: 22px;
  height: 22px;
}
.Paper {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 565px;
  background-color: #fff;
  height: 100%;
  z-index: 999;
  box-shadow: -10px 0 10px #ccc;
  .toptitle {
    padding: 25px 20px;
    color: #72767b;
  }
  .del {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
  }
  .content {
    width: 91.5%;
    padding: 10px;
    .topbox {
      .fenzhis {
        padding: 0 25px;
      }
    }
  }
}
.optionradios {
  padding: 1px 17px;
  width: 98%;
  background-color: #eefaf6;
}
.option {
  margin-top: 20px;
  padding: 0 10px;
}
</style>
