<template>
  <div class="answerSheet">
    <div class="titles">答题卡</div>
    <div class="is">
      <div class="colorbox"></div>
      <span>已答</span>
      <div class="wecolorbox"></div>
      <span>未答</span>
    </div>

    <div class="answerlist">
      <div
        :class="
          item.type === '填空题'
            ? item.studentanswer !== null
              ? 'wrong'
              : 'boxs'
            : item.studentanswer !== null
            ? 'wrong'
            : 'boxs'
        "
        v-for="(item, index) in props.Questionlists"
        :key="index"
        @click="modians(index)"
      >
        {{ index + 1 }}
      </div>
    </div>
    <div class="butBox">
      <p>
        共<span>{{ props.Questionlists.length }}</span
        >题，剩余题<span>{{ list.length }}</span
        >未完成
      </p>
      <el-popconfirm width="220" :title="`你还有${list.length} 题未答，确定要提交吗?`">
        <template #reference>
          <el-button type="primary">交卷</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

let props = defineProps<{
  Questionlists: any[]
}>()
let list = computed(() => {
  return props.Questionlists.filter((item: any) => {
    return item.studentanswer == null
  })
})
const modians = (index: number) => {
  document
    .getElementById(`id${index}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}
</script>

<style lang="less" scoped>
/deep/.el-popconfirm {
  display: flex;
}
.wrong {
  cursor: pointer;
  width: 35px;
  height: 30px;
  border-radius: 3px;

  border: 1px solid #e3e3e3;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 6px;
  font-size: 14px;
  background-color: #e5f0f9;
  color: #a2ccf1;
}
.answerlist {
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  .boxs {
    cursor: pointer;
    width: 35px;
    height: 30px;
    border-radius: 3px;
    background-color: #fff;
    border: 1px solid #e3e3e3;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 6px;
    font-size: 14px;
  }
}
.answerSheet {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 290px;
  padding: 25px 24px;
  background-color: #fff;
  .titles {
    font-size: 20px;
    font-weight: 600;
  }
  .is {
    display: flex;
    align-items: center;
    margin-top: 25px;
    .colorbox {
      width: 20px;
      height: 20px;
      background-color: #f0f8ff;
    }
    span {
      margin: 0 16px 0 10px;
    }
    .wecolorbox {
      width: 19px;
      height: 19px;
      border: 1px solid #e9e9e9;
    }
  }
}
.butBox {
  padding: 0 20px;
  position: fixed;
  width: 260px;
  bottom: 20px;
  background-color: #fff;
}
.el-button {
  width: 100%;
  font-size: 13px;
  margin-top: 10px;
}
</style>
