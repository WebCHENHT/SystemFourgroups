<template>
  <div>
    <el-drawer
      v-model="table"
      title="试题详情"
      direction="rtl"
      size="50%"
      :modal="false"
      :before-close="handleClose"
    >
      <div class="content">
        <div class="question">
          <p class="topic">{{ getEestDetail.type }}</p>
          <span class="score">分值：{{ getEestDetail.scores }}</span>
        </div>
        <p class="title" v-html="getEestDetail.title.replace(/\[\]/g, '_____')"></p>
        <div
          class="SingleMany"
          v-if="getEestDetail.type == '单选题' || getEestDetail.type == '多选题'"
        >
          <el-radio
            class="radios"
            :class="getEestDetail.answer.includes(item.answerno) ? 'selRadio' : 'noselRadio'"
            label="1"
            size="large"
            v-for="(item, index) in getEestDetail.answers"
            :key="index"
          >
            <span>{{ item.answerno }}</span
            >:
            <span class="radios-span">{{ item.content }}</span>
          </el-radio>
        </div>
        <div v-if="getEestDetail.type == '判断题'">
          <p class="CorrectAnswer">正确答案：{{ getEestDetail.answer }}</p>
        </div>
        <div v-if="getEestDetail.type == '填空题' || getEestDetail.type == '问答题'">
          <p v-if="getEestDetail.type == '填空题'" class="Corrects">
            正确答案：{{ getEestDetail.answer }}
          </p>
          <p class="parse">答案解析：{{ getEestDetail.explains }}</p>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const table = ref(true)
const props = defineProps({
  getEestDetail: {
    type: Object,
    required: true
  }
})
const detail = props.getEestDetail
const emit = defineEmits(['closeDrawer'])

const handleClose = (done:any) => {
  emit('closeDrawer', false)
}
</script>

<style scoped lang="less">
.content {
  .question {
    display: flex;
    margin-top: -20px;
    margin-left: 13px;
    .topic {
      color: #666;
      margin-right: 20px;
      font-size: 16px;
    }
    .score {
      font-size: 14px;
      color: #999;
    }
  }
  .title {
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    margin-left: 13px;
  }
  .SingleMany {
    display: flex;
    flex-direction: column;
    .selRadio {
      width: 100%;
      font-size: 14px;
      color: #000;
      background-color: #f0faf6;
      padding-left: 8px;
      margin-bottom: 8px;
    }
    .noselRadio {
      font-size: 14px;
      color: #000;
      padding-left: 8px;
      margin-bottom: 8px;
    }
    .radios {
      // width: 20px;
      // height: 20px;
      // border-radius: 50%;
      // border: 1px #edf3f1 solid;
      // background-color: #fff;
      // margin-right: 5px;
      .radios-span {
        margin-left: 10px;
      }
      ::v-deep .el-radio__inner {
        width: 19px;
        height: 19px;
      }
    }
  }
  .CorrectAnswer {
    background-color: #f0faf6;
    color: #84d5b1;
    padding: 12px;
  }
  .Corrects {
    background-color: #f0faf6;
    color: #84d5b1;
    padding: 12px;
    margin-bottom: 15px;
  }
  .parse {
    background-color: #f6faff;
    color: #a0adbd;
    padding: 12px;
  }
}
</style>
