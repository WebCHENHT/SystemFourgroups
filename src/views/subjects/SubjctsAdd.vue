<template>
  <div>
    <h3>创建试卷</h3>
    <div class="one">
      <span class="ones">1</span>
      <span data-v-ab382b7d="" style="padding-left: 17px">基本信息</span>
    </div>
    <el-form-item label="试卷名称：" style="margin-left: 150px; margin-top: 10px">
      <el-input v-model="pamsea.title" />
    </el-form-item>
    <div class="one">
      <span class="ones">2</span>
      <span style="padding-left: 17px">内容设置</span>
    </div>
    <div style="display: flex">
      <div>
        <!-- 内容 -->
        <div style="display: flex; margin: 10px; margin-left: 110px">
          <div>
            <span style="margin-left: 38px"> 试卷内容：</span>
            <!-- 分值 -->
            <div v-for="item in Arraytype" :key="item">
              <div class="Score" v-if="item === '单选题'">
                <p>{{ item }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分
                </p>
              </div>
            </div>
          </div>
          <div>
            <!-- 上面 -->
            <div class="god">
              <b>试题列表</b>
              <div class="right">
                <span>总分：{{ table.scores }}</span>
                <span>已添加{{ table.length }}题</span>
                <button
                  class="el-button"
                  aria-disabled="false"
                  type="button"
                  style="font-size: 13px; margin-left: 30px"
                  @click="del"
                >
                  清空
                </button>
              </div>
            </div>
            <!-- 中间 -->
            <div class="gods Testboxs" v-if="adds">
              <div v-for="(item, index) in table" :key="item.id">
                <!-- 单选题 -->
                <div v-if="item.type === '单选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="htmlEncode(item.title)"></div>

                  <div v-for="items in item.answers" :key="items.id">
                    <div class="bo color" v-if="item.answer === items.answerno">
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                    <div class="bo" v-if="item.answer != items.answerno">
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 多选题 -->
                <div v-if="item.type === '多选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div>{{ item.title }}</div>

                  <div v-for="items in item.answers" :key="items.id">
                    <div
                      class="bo color"
                      v-if="
                        item.answer.includes(items.answerno) ===
                        items.answerno.includes(items.answerno)
                      "
                    >
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                    <div
                      class="bo"
                      v-if="
                        item.answer.includes(items.answerno) !=
                        items.answerno.includes(items.answerno)
                      "
                    >
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 填空题 -->
                <div v-if="item.type === '填空题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title.replace(/\[\]/g, '_____')"></div>

                  <div v-if="item.type == '填空题' || item.type == '问答题'">
                    <p v-if="item.type == '填空题'" class="Corrects">正确答案：{{ item.answer }}</p>

                    <p class="parse">答案解析：{{ item.explains }}</p>
                  </div>
                  <div v-for="items in item.answers" :key="items.id"></div>
                </div>
                <!-- 判断题 -->
                <div v-if="item.type === '判断题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div>{{ item.title }}</div>
                  <p class="CorrectAnswer">正确答案：{{ item.answer }}</p>
                </div>
                <!-- 问答题 -->
                <div v-if="item.type === '问答题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title.replace(/\[\]/g, '_____')"></div>

                  <div v-if="item.type == '填空题' || item.type == '问答题'">
                    <p v-if="item.type == '填空题'" class="Corrects">正确答案：{{ item.answer }}</p>

                    <p class="parse">答案解析：{{ item.explains }}</p>
                  </div>
                  <div v-for="items in item.answers" :key="items.id"></div>
                </div>
              </div>
            </div>
            <!-- 下面 -->
            <div class="god">
              <button class="el-button" aria-disabled="false" type="button" style="font-size: 13px">
                添加题目
              </button>
              <button
                @click="Batch"
                class="el-button"
                aria-disabled="false"
                type="button"
                style="font-size: 13px"
              >
                批量导入
              </button>
              <button
                @click="bank"
                class="el-button"
                aria-disabled="false"
                type="button"
                style="font-size: 13px"
              >
                从题库中导入
              </button>
            </div>

            <div
              id="el-id-9465-1"
              class="el-form-item__label"
              style="width: 110px; margin-left: -110px; margin-top: 20px"
            >
              试题存入题库：
            </div>
            <el-select placeholder="请选择题库" v-model="pamsea.databaseid">
              <el-option v-for="item in arr" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
            <button
              class="el-button"
              aria-disabled="false"
              type="button"
              style="font-size: 13px; margin-left: 20px"
            >
              + 创建题库
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="one">
      <span class="ones">3</span>
      <span style="padding-left: 17px">教师范围</span>
    </div>
    <div
      id="el-id-9465-1"
      class="el-form-item__label"
      style="width: 110px; margin-left: 100px; margin-top: 20px"
    >
      可见老师：
    </div>
    <button
      class="el-button"
      aria-disabled="false"
      type="button"
      style="font-size: 13px; position: relative"
    >
      <sup class="el-badge__content el-badge__content--primary is-fixed">0</sup>
      + 选择
    </button>
  </div>
  <div style="margin-left: 210px; margin-top: 50px">
    <el-button type="primary" @click="add">提交</el-button>
    <el-button>取消</el-button>
  </div>
  <!-- 批量添加 -->
  <BatchImport v-if="user" v-model="user" @allTableData="allTableData" :call="father"></BatchImport>
  <QuestionBank v-if="users" v-model="users"></QuestionBank>
</template>

<script setup lang="ts">
import { datalist } from '@/assets/api/databaselist/DatabaseList'
import BatchImport from '@/components/BatchImport.vue'
import QuestionBank from '@/views/subjects/QuestionBank.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed, reactive, ref, toRefs } from 'vue'
import { htmlEncode } from '../../untils/Dilist'
let user = ref(false)
let users = ref(false)
let show = ref(false)
let adds = ref(false)
let input = ref(10)
let data = reactive({
  pamsea: {
    title: '',
    databaseid: ''
  }
})
let table: any = ref([])
const allTableData = (val: any) => {
  table.value = val
  adds.value = true
}

const { pamsea } = toRefs(data)
let arr: any = ref([])
let list = async () => {
  let res: any = await datalist({
    page: 1,
    psize: 10,
    key: '',
    admin: '',
    ismy: ''
  })
  if (res.errCode === 10000) {
    arr.value = res.data.list
  }
}
list()
// 添加
const add = () => {
  console.log(pamsea.value)
}
const father = () => {
  user.value = false
  list()
}
const Batch = () => {
  user.value = true
}
// 清空
const del = () => {
  table.value = []
  adds.value = false
}
// 单个删除
const dels = (i: any) => {
  table.value.splice(i, 1)
}
//
// bank
const bank = () => {
  users.value = true
}
const Arraytype = ref<string[]>(['单选题', '多选题', '判断题', '填空题', '问答题'])
const listarray = ref<any[]>([])
const arraytest: any = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  listarray.value.splice(0)
  Arraytype.value.forEach((item: any) => {
    if (table.value.questions.find((items: any) => items.type == item)) {
      listarray.value.push(table.value.questions.find((items: any) => items.type == item))
    }
  }) // })
  return listarray.value
})
</script>

<style scoped lang="less">
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
.color {
  background-color: #eefaf6;
  padding-left: 10px;
}
.Score {
  width: 122px;
  height: 90px;
  border: 1px solid #dcdfe6;
  position: relative;
  top: 10px;
  left: -10px;
  font-size: 13px;
  color: #848484;
  text-align: center;
  line-height: 40px;
}
h3 {
  font-size: 20px;
  padding: 20px;
}
.one {
  display: flex;
  align-items: center;
  background-color: #f9faff;
  padding: 5px 30px;
}
.ones {
  font-size: 35px;
  color: #c7e5ff;
}
.el-input {
  width: 300px;
}

.god {
  display: flex;
  width: 1005px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdfe6;
  padding: 10px 30px;
}
.gods {
  width: 1005px;
  line-height: 30px;
  border: 1px solid #dcdfe6;
  padding: 10px 30px;
}
b {
  font-weight: bold;
  font-size: 1rem;
}
.right {
  color: #90909e;
  margin-left: 65%;
}
.right span {
  margin-left: 36px;
}

.el-badge__content--primary {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 5px;
  transform: translateY(-50%) translate(100%);
  background-color: var(--el-color-primary);
  font-size: 12px;
}
.Testboxs {
  max-height: 74vh;
  overflow-y: scroll;
}
.el-icon {
  color: #409eff;
  font-size: 25px;
  position: relative;
  left: 800px;
}
.box {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  margin-top: 5px;
}
.bo {
  display: flex;
  color: #606266;
  margin: 10px;
  padding-left: 10px;
}
</style>
