<template>
  <div>
    <el-drawer 
    title=""
    class="drawers" 
    v-model="drawer" 
    :direction="direction" 
    :before-close="handleClose" 
    >
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {ref } from 'vue'
const props = ({
  getList:{
    type:Function,
    required:true
  },
  quertionData:{
    type:Object
  }
})
const direction = ref('rtl')
const drawer = ref(true)
const emit = defineEmits(['updata:value','blur','closeDrawer'])
const handleClose = ()=>{
  emit('closeDrawer',false)
}
</script>

<style scoped>

</style> 