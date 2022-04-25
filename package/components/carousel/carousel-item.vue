<template>
  <div :style="itemStyle" :class="{
    'l-carousel-item': true,
    'is-transition': needTransition
    }">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LCarouselItem',
  componentName: 'LCarouselItem',
}
</script>
<script setup lang="ts">
import { ref, reactive, inject, onMounted } from 'vue'

const props = defineProps({

})
const itemStyle = reactive({
  transform: ''
})
const needTransition = ref(false)
const setTransform = (offset: number, scale = 1) => {
  itemStyle.transform = `translateX(${offset + 'px'}) scale(${scale})`
}

const carouselContext = inject('carouselContext')

onMounted(()=>{
  carouselContext.addItem({
    props,
    setTransform
  })
  setTimeout(() => {
    needTransition.value = true
  });
})
</script>

