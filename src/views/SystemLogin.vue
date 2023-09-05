<template>
  <div class="LoginBoxs">
    <div class="Login">
      <div class="title">
        <img src="http://edu.90000p.com/exam/cyx/assets/log.6449415e.png" alt="" />
      </div>
      <div class="loginsize">
        <div class="sizeleft"><h2>考试系统</h2></div>
        <div class="sizeright" @click="Loginishow = !Loginishow" v-if="Loginishow">
          <img src="../assets/img/QRcode.png" alt="" />
        </div>
        <div class="sizeright" v-if="!Loginishow" @click="Loginishow = !Loginishow">
          <img src="../assets/img/PcLiGon.png" alt="" />
        </div>
      </div>
      <div class="QrCodes" v-if="!Loginishow">
        <div style="display: flex; justify-content: center">
          <img src="../assets/img/CodeData.jpg" alt="" style="width: 180px; height: 180px" />
        </div>
        <div style="display: flex; justify-content: center; margin-top: 70px">
          <p>使用<span style="color: #0089ff">微信</span>扫一扫进行登录</p>
        </div>
        <div></div>
      </div>
      <div class="loginform" v-if="Loginishow">
        <el-form
          ref="ruleFormRef"
          :model="LoginAdd"
          :rules="Loginrules"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item prop="username">
            <el-input v-model="LoginAdd.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="LoginAdd.pass"
              placeholder="请输入密码"
              show-password
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="LogniAddForm(ruleFormRef)">
              {{ Systemname === false ? '登录' : '正在登录中....' }}
            </el-button>
            <div
              style="
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
                color: #0089ff;
                font-size: 15px;
              "
            >
              忘记密码
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { TeacherChecklogin } from '@/assets/api/SystemLiognAdd/index'
import { succesMsg, errorMsg } from '@/untils/msg'
import { debounce } from '@/untils/antishake'
import { useCounterStore } from '@/stores/counter'
import type { LoginAddObject } from '@/assets/TSinterface/SystemLoginInterface'
import { useRouter } from 'vue-router'
let router = useRouter()
const store: LoginAddObject | any = useCounterStore()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let Loginishow = ref(true)
interface RuleForm {
  username: string
  pass: string
}
let Systemname = ref(false)
const LoginAdd = reactive<RuleForm>({
  username: 'admin',
  pass: 'admin'
})
const Loginrules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应在3到10位', trigger: 'blur' }
  ],
  pass: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, message: '长度最少5位数', trigger: 'blur' }
  ]
})

const LogniAddForm = debounce(async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      Systemname.value = true
      let res = await TeacherChecklogin(LoginAdd)
      if (res.errCode === 10000) {
        let resa = res.data.menu.filter((item: any) => {
          if (item.ico) {
            return item
          }
        })
        store.LeftArrDatas = resa
        store.token = res.data.token
        store.menus = res.data.menu
        store.model = res.data.model
        store.type = res.data.type
        Systemname.value = false
        setTimeout(() => {
          succesMsg('登录成功')
          router.push({
            path: '/SystemMenu'
          })
        }, 200)
      } else {
        Systemname.value = false
        errorMsg(res.errMsg)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}, 1000)
</script>

<style lang="less" scoped>
.LoginBoxs {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .Login {
    box-shadow: 0 6px 32px -7px #1d66bd29;
    width: 450px;
    height: 530px;
    background-color: #fff;
    -webkit-user-drag: none;
    user-select: none;
    .title {
      padding-top: 45px;
      -webkit-user-drag: none;
      display: flex;
      justify-content: center;
      img {
        width: 80px;
        height: 62px;
      }
    }
    .loginsize {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .sizeleft {
        margin: auto;
        h2 {
          margin-left: 55px;
        }
      }
      .sizeright {
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
    .loginform {
      .el-form {
        padding: 10px 60px;
        border-radius: 5px;
        .el-form-item {
          margin-bottom: 30px;
          height: 47px;
          .el-input {
            height: 45px;
            border-radius: 5px;
            font-size: 13px;
          }
          .el-button {
            height: 45px;
            width: 100%;
            height: 45px;
            border-radius: 10px;
            background-color: #0089ff;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
.QrCodes {
  padding: 20px 0;
}
</style>
