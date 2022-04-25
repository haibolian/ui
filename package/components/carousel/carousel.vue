<template>
  <div :style="carouselStyle" class="l-carousel">
    <div class="l-carousel__wrapper">
      <button @click="clickPrev" class="l-carousel__arrow-left">
        <i class="l-icon icon-arrow-left-bold"></i>
      </button>
      <button @click="clickNext" class="l-carousel__arrow-right">
        <i class="l-icon icon-arrow-right-bold"></i>
      </button>
      <div class="l-carousel__card">
        <slot />
      </div>
      <ul class="l-carousel__button-group">
        <!-- 这个 index 是从 1 开始的 -->
        <li 
          v-for="(num, index) in itemsLength" 
          :class="{
            'l-carousel__button': true,
            'is-current': index === currentIndex
          }"
          @click="clickBar(index)">
          <i class="l-carousel__bar"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LCarousel',
  componentName: 'LCarousel',
}
</script>
<script setup lang="ts">
import { formatUnit } from '@/utils/style';
import { ref, computed, useSlots, provide, getCurrentInstance, onMounted, nextTick} from 'vue'

const props = defineProps({
  height: [String, Number]
})
const emits = defineEmits([])
const height = computed(() => formatUnit(props.height))
const carouselStyle = {
  height: height.value
}

// 获取走马灯面板宽度
const { proxy } = getCurrentInstance()
const carouselWidth = computed(()=>{
  return proxy.$el?.clientWidth || 0
})

const currentIndex = ref(0)
const items = ref([])
const itemsLength = computed(() => items.value.length)
const addItem = (carouseItemContext: object) => {
  items.value.push(carouseItemContext)
}

const setOffsetForItems = (targetIndex) => {
  items.value.forEach((item, index) => {
    const dif = index - targetIndex
    item.setTransform(dif * carouselWidth.value ,1)
  })
  
  currentIndex.value = targetIndex
}

const getValidTargetIndex = (targetIndex) => {
  if(targetIndex < 0) return itemsLength.value - 1
  if(targetIndex > itemsLength.value - 1) return 0
  return targetIndex
}

const getItemByIndex = index => items.value[index]
const clickPrev = () => {
  const targetIndex = getValidTargetIndex(currentIndex.value - 1)
  setOffsetForItems(targetIndex)
}
const clickNext = () => {
  const targetIndex = getValidTargetIndex(currentIndex.value + 1)
  // if(currentIndex.value === itemsLength.value - 1) {

  // }else{
    setOffsetForItems(targetIndex)
  // }
}

const clickBar = (index) => {
  setOffsetForItems(index)
}


onMounted(() => {
  setOffsetForItems(0)
})

provide('carouselContext', {
  addItem
})




</script>
