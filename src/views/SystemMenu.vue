<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="width: 75px; height: 100vh">
        <div class="wai_box">
          <div class="block">
            <img
              @click="data.show = !data.show"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt=""
            />
          </div>
          <div
            v-for="(item, index) in data.LeftArrDatas"
            :key="index"
            :class="'/SystemMenu' + item.url === SytemUrl ? 'Sytemicont' : 'Sytemicon'"
            @click="SystemLists(item)"
          >
            <div :class="`iconfont ${item.ico}`"></div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>

  <div class="dialog" v-show="data.show">
    <div class="diabox"></div>
    <div class="photobox">
      <div class="photo">
        <img
          class="photoImg"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
      </div>
    </div>
    <div class="name">超级管理员</div>
    <div class="name">部门</div>
    <!-- <div class="name">班级</div> -->
    <div class="butBox">
      <el-button class="but" @click="SignOut">退出登录</el-button>
    </div>
    <div class="accountBox">
      <div>
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />账号
      </div>
      <div>{{ data.userInfo.username }}</div>
    </div>
    <div class="accountBox">
      <div>
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />密码
      </div>
      <div class="title" @click="setPass">设置</div>
    </div>
    <div class="accountBox">
      <div>
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />微信
      </div>
      <div class="title">未绑定</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
let store = useCounterStore()

let route = useRoute()
let router = useRouter()
let resget = router.getRoutes()
const data = reactive({
  LeftArrDatas: [] as any,
  userInfo: {} as any,
  show: false
})
//把pinan里面的侧边栏数据取出来
data.LeftArrDatas = store.LeftArrDatas

let SytemUrl = ref(route.meta.url)

//跳转页面
const SystemLists = (data: any) => {
  SytemUrl.value = '/SystemMenu' + data.url
  router.push({
    path: '/SystemMenu' + data.url
  })
}
//去出本地用户数据
const SignOut = () => {
  router.replace('/')
  location.reload()
  store.menus = []
  store.LeftArrDatas = []
  store.model = {}
  store.token = ''
  store.type = ''
  store.url = ''
  ElMessage({
    message: '退出登录成功',
    type: 'success'
  })
}
//跳转到设置密码页面
const setPass = () => {
  router.push('setupPass')
  data.show = false
}
</script>

<style scoped lang="less">
.el-container {
  height: 100vh;
  .el-aside {
    width: 100%;
    min-height: 100vh;
    background-color: #ebebeb;
  }
}
.Sytemicon {
  margin: 0 auto 5px;
  width: 67%;
  padding: 8px 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  .iconfont {
    font-size: 25px;
  }
}
.block {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}

.Sytemicont {
  margin: 0 auto 5px;
  width: 67%;
  padding: 8px 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background-color: #d1d3d5;
  color: #3889ff;
  border-radius: 10px;
  .iconfont {
    font-size: 25px;
    color: #3889ff;
  }
}

.dialog {
  width: 290px;
  height: 360px;
  background-color: #fff;
  z-index: 999;
  width: 290px;
  position: fixed;
  left: 60px;
  top: 40px;
  border-radius: 5px;
  box-shadow: 0 0 12px #666;
  font-size: 14px;
  text-align: center;
  .diabox {
    width: 100%;
    height: 70px;
    background-color: #dfe1e6;
  }
  .photobox {
    display: flex;
    justify-content: center;
  }
  .photobox .photo {
    width: 50px;
    height: 50px;
    border: 2px solid #fff;
    margin-top: -25px;
    border-radius: 50%;
    .photoImg {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    margin-bottom: 15px;
  }
  .butBox {
    padding: 0 10px 20px;
    border-bottom: 1px solid #dadce0;
    margin-bottom: 20px;
    .but {
      font-size: 12px;
      width: 100%;
    }
  }
  .accountBox {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: bottom;
      margin-right: 5px;
    }
    .title {
      color: #59a0ff;
      cursor: pointer;
    }
  }
}
// /deep/.el-main {
//   padding: 10px;
// }
</style>
