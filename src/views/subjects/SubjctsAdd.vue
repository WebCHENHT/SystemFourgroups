<template>
  <div>
    <h3>创建试卷</h3>
    <div class="one">
      <span class="ones">1</span>
      <span data-v-ab382b7d="" style="padding-left: 17px">基本信息</span>
    </div>
    <el-form-item label="试卷名称" style="margin-left: 150px; margin-top: 10px">
      <el-input />
    </el-form-item>
    <div class="one">
      <span class="ones">2</span>
      <span style="padding-left: 17px">内容设置</span>
    </div>
    <div style="display: flex">
      <!-- 分值 -->
      <div>
        <div class="Score">
          <p>单选题1道</p>
          <p>每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分</p>
        </div>
        <div class="Score">
          <p>单选题1道</p>
          <p>每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分</p>
        </div>
        <div class="Score">
          <p>单选题1道</p>
          <p>每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分</p>
        </div>
        <div class="Score">
          <p>单选题1道</p>
          <p>每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分</p>
        </div>
        <div class="Score">
          <p>单选题1道</p>
          <p>每题&nbsp;&nbsp;<el-input v-model="input" style="width: 50px" />&nbsp;&nbsp;分</p>
        </div>
      </div>
      <!-- 内容 -->
      <div style="display: flex; margin: 10px">
        <div id="el-id-9465-1" class="el-form-item__label" style="width: 110px; margin-left: -25px">
          试卷内容：
        </div>
        <div>
          <!-- 上面 -->
          <div class="god">
            <b>试题列表</b>
            <div class="right">
              <span>总分：0</span>
              <span>已添加0题</span>
              <button
                class="el-button"
                aria-disabled="false"
                type="button"
                style="font-size: 13px; margin-left: 40px"
              >
                清空
              </button>
            </div>
          </div>
          <!-- 中间 -->
          <div class="gods Testboxs">
            <div>
              <span>1.单选题</span>&nbsp;&nbsp;
              <span
                >分值:&nbsp;&nbsp;<el-input v-model="input" style="width: 50px"></el-input
              ></span>
              <span
                ><el-icon><EditPen /></el-icon
              ></span>
              <span
                ><el-icon><Delete /></el-icon
              ></span>
              <div>对vuex中的state说法正确的事</div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; A：state主要用来存储状态，数据的
              </div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; B：state主要用来存储状态，数据的
              </div>
              <div class="bo color">
                <div class="box"></div>
                &nbsp; C：state主要用来存储状态，数据的
              </div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; D：state主要用来存储状态，数据的
              </div>
            </div>
            <!--  -->
            <div>
              <span>1.单选题</span>&nbsp;&nbsp;
              <span
                >分值:&nbsp;&nbsp;<el-input v-model="input" style="width: 50px"></el-input
              ></span>
              <span
                ><el-icon><EditPen /></el-icon
              ></span>
              <span
                ><el-icon><Delete /></el-icon
              ></span>
              <div>对vuex中的state说法正确的事</div>
              <div class="bo color">
                <div class="box"></div>
                &nbsp; A：state主要用来存储状态，数据的
              </div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; B：state主要用来存储状态，数据的
              </div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; C：state主要用来存储状态，数据的
              </div>
              <div class="bo">
                <div class="box"></div>
                &nbsp; D：state主要用来存储状态，数据的
              </div>
            </div>
            <!--  -->
          </div>
          <!-- 下面 -->
          <div class="god">
            <button class="el-button" aria-disabled="false" type="button" style="font-size: 13px">
              添加题目
            </button>
            <button class="el-button" aria-disabled="false" type="button" style="font-size: 13px">
              批量导入
            </button>
            <button class="el-button" aria-disabled="false" type="button" style="font-size: 13px">
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
          <el-select placeholder="请选择题库">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
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
    <el-button type="primary">提交</el-button>
    <el-button>取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { Delete, EditPen } from '@element-plus/icons-vue'
import { ref } from 'vue'
let input = ref(10)
</script>

<style scoped lang="less">
.color {
  background-color: #eefaf6;
  padding-left: 10px;
}
.Score {
  width: 122px;
  height: 90px;
  border: 1px solid #dcdfe6;
  position: relative;
  top: 50px;
  left: 80px;
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
