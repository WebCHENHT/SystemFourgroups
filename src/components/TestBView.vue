<template>
  <div
    class="Oppositetopictop"
    :id="'id' + index"
    v-for="(item, index) in props.DrawerDatas.questions"
    :key="index"
  >
    <div class="OppositetopicList">
      <div class="Oppositetopictitle">
        <div class="titlType">
          <div class="typeFsiz">{{ index + 1 }}</div>
          <div class="typeTitle">{{ item.type }}</div>
        </div>
        <span class="TitlScore">分值: {{ item.scores }}</span>
        <div :class="item.studentscores > 0 ? 'Drawsusson' : 'Drawerror'">
          得分：{{ item.studentscores }}
        </div>
      </div>
      <span class="titleres" v-if="item.type !== '填空题'" v-html="item.title"></span>
      <span
        class="titleres"
        v-else
        v-html="tiankongs(index, item.title, item.studentanswer)"
      ></span>
      <!-- 判断题 -->
      <div v-if="item.type === '判断题'">
        <div v-if="item.studentanswer !== ''">
          <div v-if="item.studentanswer === '错误'">
            <div class="optionsLi">
              <div class="left">
                <div class="opt"></div>
                <span>正确</span>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              :class="item.answer === item.studentanswer ? 'optionsLi okdak' : 'optionsLi wrong'"
            >
              <div class="left">
                <div class="opt"></div>
                <span :class="item.answer === item.studentanswer ? 'timright' : 'error'">正确</span>
              </div>
              <div class="timright" v-if="item.answer === item.studentanswer">回答正确</div>
              <div class="error" v-else>回答错误</div>
            </div>
          </div>
          <div v-if="item.studentanswer === '正确'">
            <div class="optionsLi">
              <div class="left">
                <div class="opt"></div>
                <span>错误</span>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              :class="item.answer === item.studentanswer ? 'optionsLi okdak' : 'optionsLi wrong'"
            >
              <div class="left">
                <div class="opt"></div>
                <span :class="item.answer === item.studentanswer ? 'timright' : 'error'">错误</span>
              </div>
              <div class="timright" v-if="item.answer === item.studentanswer">回答正确</div>
              <div class="error" v-else>回答错误</div>
            </div>
          </div>
          <div class="timanswer" v-if="item.type === '判断题'">
            <span style="font-size: 15px; color: #90adca">正确答案：</span>
            <div class="parse">{{ item.answer }}</div>
          </div>
        </div>
        <div v-else>
          <div class="optionsLi">
            <div class="left">
              <div class="opt"></div>
              <span>正确</span>
            </div>
          </div>
          <div class="optionsLi">
            <div class="left">
              <div class="opt"></div>
              <span>错误</span>
            </div>
          </div>
          <div class="timanswer" v-if="item.type === '判断题'">
            <span style="font-size: 15px; color: #90adca">正确答案：</span>
            <div class="parse">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 问答题和填空题 -->
    <div v-if="item.type === '问答题' || item.type === '填空题'">
      <div class="datis">
        <div class="datitle">答:</div>
        <div class="answer">{{ item.studentanswer }}</div>
        <div v-if="item.type === '填空题'">
          <div class="correct">正确答案 {{ item.answer }}</div>
        </div>
        <div class="answer">答题解析 {{ item.comments }}</div>
      </div>
    </div>
    <!-- 单选和多选题 -->
    <div v-if="item.type === '单选题' || item.type === '多选题'">
      <div class="xuzix" v-for="(item1, index1) in item.answers" :key="index1">
        <div
          :class="
            item.answer.split('|').includes(item1.answerno)
              ? 'timiunxs timiunxscord'
              : 'timiunxs wrong'
          "
          :style="
            !item.studentanswer.split('|').includes(item1.answerno)
              ? 'background-color: #fafbfd'
              : ''
          "
        >
          <div class="timleft">
            <div class="xunze">{{ item1.answerno }}</div>
            <span>{{ item1.content }}</span>
          </div>

          <div
            v-if="item.studentanswer.split('|').includes(item1.answerno)"
            :class="item.answer.split('|').includes(item1.answerno) ? 'timright' : 'error'"
          >
            {{ item.answer.split('|').includes(item1.answerno) ? '回答正确' : '回答错误' }}
          </div>
        </div>
      </div>

      <div class="timanswer" v-if="item.type === '单选题'">
        <span style="font-size: 15px; color: #90adca">正确答案：</span>
        <div class="Subutton">{{ item.answer }}</div>
      </div>
      <div class="timanswer" v-if="item.type === '多选题'">
        <span style="font-size: 15px; color: #90adca">正确答案：</span>

        <div class="Subutton" v-for="(itema, index) in item.answer.split('|')" :key="index">
          {{ itema }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
let props = defineProps<{
  DrawerDatas: any
}>()
const tiankongs = (index: any, title: string, studentanswer: string) => {
  if (title.includes('[]')) {
    studentanswer.split('|').forEach((item: any) => {
      title = title.replace(
        '[]',
        `<div style="min-width:50px;height:18px;border-bottom: 1px solid #999;padding:0 10px;margin:0 1px">${item}</div>`
      )
    })
  }
  return title
}
</script>

<style lang="less" scoped>
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
  display: flex;
  flex-wrap: wrap;
}
.timiunxscord {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color: #f0faf6;
  border: 1px solid #f0faf6;
}
.timiunxs {
  height: 40px;
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
.okdak {
  background-color: #f0faf6;
}
.optionsLi {
  width: 100%;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;

  margin-bottom: 10px;
  .left {
    display: flex;
    span {
      font-size: 16px;
    }
    .opt {
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

.answer {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color: #f7fbff;
}
.parse {
  font-size: 15px;
  padding: 20px 15px;
  display: flex;
}
.correct {
  font-size: 16px;
  background-color: #f5f7fa;
  padding: 10px 20px;
  margin-top: 10px;
  width: 100%;
  background-color: #f0faf6;
  height: 30px;
  display: flex;
  align-items: center;
}
.datis {
  .datitle {
    font-size: 15px;
  }
  .answer {
    background-color: #f5f7fa;
    padding: 10px 20px;
    margin-top: 10px;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
  }
}
.error {
  color: #e25e61;
  display: block;
}
.timright {
  color: #4cc0a4;
  display: block;
}
.wrong {
  background-color: #fcf3f3;
}
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
</style>
