<script setup lang="ts">
import { ref } from "vue"
const show = ref(['3'])
const togg = () => {
  show.value = ['2']
}
// test-github
</script>

<template>
  <div class="root">
    <l-button @click="togg">asdasd</l-button>
    <LCollapse v-model="show">
      <LCollapseItem title="title1" name="1">
        A
      </LCollapseItem>
      <LCollapseItem title="title2" name="2">
        B
      </LCollapseItem>
      <LCollapseItem disabled title="title3" name="3">
        C
      </LCollapseItem>
    </LCollapse>
  </div>
</template>

<style>
.root {
  
  padding: 100px 50px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
