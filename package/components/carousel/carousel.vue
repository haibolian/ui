<template>
  <div :style="carouselStyle" class="l-carousel">
    <div class="l-carousel__wrapper">
      <button @click="clickLeft" class="l-carousel__arrow-left">
        <i class="l-icon icon-arrow-left-bold"></i>
      </button>
      <button @click="clickRight" class="l-carousel__arrow-right">
        <i class="l-icon icon-arrow-right-bold"></i>
      </button>
      <slot></slot>
      <ul class="l-carousel__button-group">
        <li 
          v-for="index in carouselItemsLength" 
          class="l-carousel__button"
          @click="clickBar(index - 1)">
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
import { ref, computed, useSlots, provide, getCurrentInstance, onMounted} from 'vue'

const props = defineProps({
  height: [String, Number]
})
const emits = defineEmits([])
const height = computed(() => formatUnit(props.height))
const carouselStyle = {
  height: height.value
}

const getCarouselItems = () => {
  const slots = useSlots().default?.()?.[0].children.filter(item => item.type?.name === 'LCarouselItem')
  return slots.map(item => item.type)
}
const carouselItems = getCarouselItems()
const carouselItemsLength = carouselItems.length

// 获取走马灯面板宽度
const { proxy } = getCurrentInstance()
const carouselWidth = computed(()=>{
  return proxy.$el?.clientWidth || 0
})

const currentIndex = ref(1)
const items = ref([])
const addItem = (carouseItemContext: object) => {
  items.value.push(carouseItemContext)
}

const setOffsetForItems = (targetIndex) => {
  items.value.forEach((item, index) => {
    if(targetIndex === index) item.setTransform(0, 1);
    const dif = index - targetIndex
    item.setTransform(dif * carouselWidth.value ,1)
  })
  currentIndex.value = targetIndex
}

const clickLeft = () => {
  setOffsetForItems(currentIndex.value - 1)
}
const clickRight = () => {
  setOffsetForItems(currentIndex.value + 1)
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
