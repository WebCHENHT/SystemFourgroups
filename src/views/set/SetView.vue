<template>
  <div class="box">
    <div class="passbox">
      <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="原密码" prop="oldpass">
          <el-input v-model="form.oldpass" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="form.pass" />
        </el-form-item>
        <el-form-item label="确认新密码 " prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-button class="but" type="primary" @click="passxiu">修改密码</el-button>
        <el-button @click="chongzhi">重置</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StudentPass } from '@/assets/api/Set/Set'
import { errorMsg, succesMsg } from '@/untils/msg'
import { reactive } from 'vue'
const form: any = reactive({
  oldpass: '',
  pass: '',
  password: ''
})
// 修改密码
const passxiu = async () => {
  let red = await StudentPass(form)
  if (red.errCode == 10000) {
    succesMsg('密码修改成功')
  } else {
    errorMsg('旧密码错误请重新输入')
  }
  form.oldpass = ''
  form.pass = ''
  form.password = ''
}
// 重置
const chongzhi = () => {
  form.oldpass = ''
  form.pass = ''
  form.password = ''
}
// 表单验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入6到12位密码'))
  } else {
    if (form.password !== '') {
      if (!form.value) return
      form.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入6到12位密码'))
  } else if (value !== form.pass) {
    callback(new Error('确认密码与确认新密码不同!'))
  } else {
    callback()
  }
}
const rules = reactive({
  pass: [
    { validator: validatePass, trigger: 'blur' },
    { required: true, message: '请输入新密码 ', trigger: 'blur' }
  ],
  password: [
    { validator: validatePass2, trigger: 'blur' },
    { required: true, message: '请输入新密码 ', trigger: 'blur' }
  ],
  oldpass: { required: true, message: '请输入旧密码 ', trigger: 'blur' }
})
</script>

<style scoped lang="less">
.passbox {
  width: 400px;
  height: 300px;
  // background-color:rgb(110, 173, 126);
  margin-left: 15%;
  margin-top: 5%;

  .but {
    margin-left: 120px;
  }
}
</style>
