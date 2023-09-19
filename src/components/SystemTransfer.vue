<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="res.names"
    width="50%"
    :close-on-click-modal="false"
    @close="DelSystemTransfer"
  >
    <el-row :gutter="22">
      <el-col :span="11"
        ><div class="grid-content ep-bg-purple" />
        <el-form-item label="部门">
          <el-select
            v-model="Departmentvalue"
            class="m-2"
            placeholder="请选择"
            @change="getDepartment"
          >
            <el-option
              v-for="item in Testdatast"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11"
        ><div class="grid-content ep-bg-purple" />
        <el-form-item label="班级" v-if="ishow">
          <el-select
            v-model="Classesvalue"
            class="m-2"
            placeholder="请选择"
            @change="getClasses"
            :disabled="Departmentvalue !== '' ? false : true"
          >
            <el-option
              v-for="item in ClassesDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-transfer
      v-loading="loading"
      v-model="Classes"
      :data="TransferDatas"
      :props="{ label: 'name', key: 'id' }"
      :titles="['未选', '全选']"
      @left-check-change="getLeftTransfer"
      @right-check-change="getRightTransfer"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="SystemTransferAdd"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import {
  ClassesList,
  StudentList,
  TeacherList,
  TestlimitAdd,
  TestmarkteacherAdd,
  TeststudentsAdd,
  TestGetstudents,
  DepartmentList,
  TestGetlimit,
  TestGetmarkteachers
} from '@/assets/api/TestList/index'
import { ElMessage } from 'element-plus'

let res = defineProps<{
  //控制班级显示隐藏
  ishow: boolean
  //弹框名称
  names: string
  //编辑时需要id 不传时需要传零
  testid?: number
}>()

let emits = defineEmits<{
  (name: 'MySystemTransferAdd', value: any): any
}>()
const dialogVisible = ref(false)
//部门数据
let Testdatast: any = ref([])
//班级数据
let ClassesDatas: any = ref([])
//穿梭框数据
let TransferDatas: any = ref([])
//获取穿梭框左侧id
const Classes: any = ref([])
//加载
let loading = ref(false)
//部门id
const Departmentvalue = ref('')
//班级id
let Classesvalue = ref('')
//穿梭框左侧选中
const getLeftTransfer = (data: any) => {
  Classes.value = [...Classes.value, ...data]
}
//穿梭框右侧选中
const getRightTransfer = (data: any) => {
  let resa = Classes.value.filter((item: string, index: number) => {
    return !data.includes(item)
  })
  Classes.value = resa
}
//编辑时使用
const gethuisxia = async () => {
  if (res.testid != 0) {
    if (res.names === '学生考试列表') {
      let reesa: any = await TestGetstudents({
        testid: res.testid
      })
      if (reesa.errCode === 10000) {
        console.log(reesa)

        let resas = reesa.data.map((item: any) => item.id)
        Classes.value = resas
        TransferDatas.value = reesa.data
      }
    } else {
      if (res.names === '可见老师') {
        let resasTeches = await TestGetlimit({
          testid: res.testid as unknown as number
        })
        if (resasTeches.errCode === 10000) {
          let arr = resasTeches.data.map((item: any) => {
            return item.id
          })
          Classes.value = arr
          TransferDatas.value = resasTeches.data
        }
      } else {
        let resyuejuans = await TestGetmarkteachers({
          testid: res.testid as unknown as number
        })
        if (resyuejuans.errCode === 10000) {
          let resas = resyuejuans.data.map((item: any) => {
            return item.id
          })
          Classes.value = resas
          TransferDatas.value = resyuejuans.data
        }
      }
    }
  }
  let resDepartems = await DepartmentList()
  if (resDepartems.errCode === 10000) {
    Testdatast.value = resDepartems.data.list as any
  }
}
onUpdated(() => {
  gethuisxia()
})
//部门选中
const getDepartment = async (data: number) => {
  if (res.ishow === true) {
    let res = await ClassesList({
      depid: data
    })
    if (res.errCode === 10000) {
      ClassesDatas.value = res.data.list
    }
  } else {
    loading.value = true
    let resa = await TeacherList({
      depid: data
    })
    if (resa.errCode === 10000) {
      loading.value = false
      if (res.testid !== 0) {
        getTransadd(resa.data.list)
      } else {
        TransferDatas.value = resa.data.list
      }
    }
  }
}
//班级选中
const getClasses = async () => {
  loading.value = true
  let resa = await StudentList({
    depid: Departmentvalue.value as unknown as number,
    classid: Classesvalue.value as unknown as number
  })
  if (resa.errCode === 10000) {
    loading.value = false
    if (res.testid !== 0) {
      getTransadd(resa.data.list)
    } else {
      TransferDatas.value = resa.data.list
    }
  }
}

//编辑合并
const getTransadd = (data: any) => {
  let resid = data.map((item: any) => item.id)
  let resas = TransferDatas.value.filter(
    (item: any) => Classes.value.includes(item.id) && !resid.includes(item.id)
  )
  TransferDatas.value = [...data, ...resas]
}

//确定提交
const SystemTransferAdd = () => {
  console.log(TransferDatas.value)
  let resas = TransferDatas.value.filter((item: any, index: any) => {
    return Classes.value.includes(item.id)
  })
  if (res.testid !== 0) {
    MySystemTransferAdd(resas)
  } else {
    emits('MySystemTransferAdd', resas)
  }
}
//穿梭框提交
const MySystemTransferAdd = async (data: any) => {
  console.log(data)

  if (res.ishow === true) {
    if (data.length <= 0) {
      ElMessage.warning('数据不能为空')
    } else {
      let list = data.map((item: any) => {
        return {
          studentid: item.id,
          testid: res.testid
        }
      })
      let Teststudentsres = await TeststudentsAdd({
        testid: res.testid,
        list
      })
      if (Teststudentsres.errCode === 10000) {
        ElMessage.success('更改成功')
        dialogVisible.value = false
      }
    }
  } else {
    if (res.names === '可见老师') {
      //考试可见老师修改
      if (data.length <= 0) {
        ElMessage.warning('数据不能为空')
      } else {
        let list = data.map((item: any) => {
          return {
            id: item.id
          }
        })
        let Testlimitres = await TestlimitAdd({
          testid: res.testid,
          list
        })
        if (Testlimitres.errCode === 10000) {
          ElMessage.success('更改成功')
          dialogVisible.value = false
        }
      }
    } else {
      //考试判卷老师修改
      if (data.length <= 0) {
        ElMessage.warning('数据不能为空')
      } else {
        let list = data.map((item: any) => {
          return {
            id: item.id
          }
        })
        let Testmarkres = await TestmarkteacherAdd({
          testid: res.testid,
          list
        })
        if (Testmarkres.errCode === 10000) {
          ElMessage.success('更改成功')
          dialogVisible.value = false
        }
      }
    }
  }
}

//关闭回调
const DelSystemTransfer = () => {
  dialogVisible.value = false
  Testdatast.value = []
  Classes.value = []
  Departmentvalue.value = ''
  Classesvalue.value = ''
  TransferDatas.value = []
}
defineExpose({ dialogVisible, loading })
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  justify-content: space-between;
  /deep/.el-col-11 {
    max-width: 45.8333333333%;
    flex: 0 0 45.8333333333%;
  }
}
/deep/.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}
.el-transfer {
  padding: 0 13px !important;
  display: flex !important;
  justify-content: space-between !important;
}
/deep/.el-transfer-panel {
  width: 292px;
}
/deep/.el-transfer__buttons {
  display: none;
}
/deep/.el-transfer-panel__body {
  height: 55vh;
}
/deep/.el-transfer-panel__list {
  height: 60vh;
}
</style>
