<template>
  <div>
    <el-drawer v-model="Drawertableis" :title="DrawerDatas.title" direction="rtl" size="50%">
      <div class="Drawtop">
        <div class="DrawtopText">
          <div class="Drawtitels">
            <div style="padding-left: 15px">
              得分<span style="padding-left: 10px">{{ DrawerDatas.studentScores }}</span>
            </div>
            <div style="padding-left: 15px">
              总分<span style="padding-left: 10px">{{ DrawerDatas.scores }}</span>
            </div>
            <div style="padding-left: 15px">
              通过分数：<span style="padding-left: 10px">{{ DrawerDatas.pastscores }}</span>
            </div>
            <div style="padding-left: 15px">
              考试时：<span style="padding-left: 10px">{{ DrawerDatas.limittime }}</span>
            </div>
            <div style="padding-left: 15px">
              交卷时间：<span style="padding-left: 10px">{{ DrawerDatas.stuEndTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="Drawtop2"></div>
      <div class="Oppositetopictop" v-for="(item, index) in DrawerDatas.questions" :key="index">
        <div class="OppositetopicList">
          <div class="Oppositetopictitle">
            <div class="titlType">
              <div class="typeFsiz">{{ index + 1 }}</div>
              <div class="typeTitle">单选题</div>
            </div>
            <span class="TitlScore"> {{ item.studentscores }}</span>
            <div :class="DrawerDatas.studentScores > 0 ? 'Drawsusson' : 'Drawerror'">
              得分：{{ item.scores }}
            </div>
          </div>
          <span class="titleres" v-html="item.title"></span>
          <div class="xuzix" v-for="(item1, index1) in item.answers" :key="index1">
            <div
              :class="
                item1.answerno.includes(item.answer.split('|').join())
                  ? 'timiunxs timiunxscord'
                  : 'timiunxs'
              "
            >
              <div class="timleft">
                <div class="xunze">{{ item1.answerno }}</div>
                <span>{{ item1.content }}</span>
              </div>
            </div>
          </div>
          <div class="timanswer">
            <span style="font-size: 15px; color: #90adca">正确答案：</span>
            <div class="Subutton">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TestGetForResultData } from '@/assets/TSinterface/SystemTest'
let DrawerDatas = ref<TestGetForResultData>([])
const Drawertableis = ref(false)

defineExpose({ Drawertableis, DrawerDatas })
</script>

<style lang="less" scoped>
.Drawtop {
  width: 100%;
  .DrawtopText {
    display: flex;
    .Drawtitels {
      display: flex;
      font-size: 14px;
    }
  }
}
.Drawtop2 {
  display: flex;
  transform: 0.5;
  padding-bottom: 10px;
  border-bottom: 1px solid #ececec;
}
.Oppositetopictop {
  width: 100%;
  .OppositetopicList {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 98%;
    padding-bottom: 20px;
    border-bottom: 1px #f0f0f0 solid;
    .Oppositetopictitle {
      display: flex;
      align-items: center;
    }
  }
}
.titlType {
  height: 21px;
  width: 80px;
  border: 1px #3377f9 solid;
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  font-size: 13px;
  .typeFsiz {
    width: 35%;
    height: 100%;
    background-color: #3377f9;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .typeTitle {
    flex: 1;
    display: flex;
    height: 100%;
    background-color: #f1f5fb;
    justify-content: center;
    align-items: center;
    color: #3377f9;
  }
}
.TitlScore {
  font-size: 12px;
  color: #aca4ab;
  margin: 0 10px;
}
.Drawsusson {
  border: #4cc0a4 1px solid;
  color: #4cc0a4;
  height: 16px;
  font-size: 12px;
  border-radius: 3px;
  padding: 0 5px;
}
.Drawerror {
  height: 16px;
  font-size: 12px;
  border: #ee0000 solid 1px;
  border-radius: 3px;
  color: #e00;
  padding: 0 5px;
}
.titleres {
  font-size: 15px;
  margin: 20px 0;
}
.timiunxscord {
  background-color: #f0faf6;
  border: 1px solid #f0faf6;
}
.timiunxs {
  height: 35px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  margin-bottom: 10px;
  .timleft {
    display: flex;
    align-items: center;
    .xunze {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 12px;
      border: #d3d4d8 1px solid;
      color: #777f86;
      background-color: #fff;
      margin-right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.timanswer {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color: #f7fbff;
  .Subutton {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #4cc0a4;
    font-size: 13px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
}
</style>
