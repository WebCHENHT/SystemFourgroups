<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>试题</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
let route = useRoute()
let red = route.query.databaseid
console.log(66, red)
</script>

<style scoped></style>
