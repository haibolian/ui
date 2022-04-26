<template>
  <LOverlay :disabled="!modal" :show="modelValue">
    <transition :name="`l-dialog-${transitionType}`">
      <div
        v-show="modelValue" 
        :class="{
          'l-dialog': true,
          'is-fullscreen': fullscreen
        }"
        :style="dialogStyle">
        <div v-if="title?.length" class="l-dialog-header">
          <span>{{ title }}</span>
        </div>

        <div class="l-dialog-body">
          <slot />
        </div>
    
        <div v-if="$slots.footer" class="l-dialog-footer">
          <slot name="footer" />
        </div>
        <div 
          v-if="showClose" 
          class="l-dialog-close"
          @click="handleClose">
          <i class="l-icon icon-close"></i>
        </div>
      </div>
    </transition>
  </LOverlay>
</template>
<script lang="ts">
export default {
  name: 'LDialog',
  componentName: 'LDialog',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import LOverlay from '../overlay/overlay.jsx';
// import useClickCoordinate from '@/hooks/useClickCoordinate';
import { ref, reactive, watch, computed } from "vue"

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: {
    type: [String, Number],
    default: '30%'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showBorder: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function
  },
  fullscreen: Boolean,
  transitionType: {
    type: String,
    default: 'fade'
  },
  modal: {
    type: Boolean,
    default: true
  },
  // top: {
  //   type: String,
  //   default: '15vh'
  // }

})

const dialogStyle = reactive({
  width: props.fullscreen ? '100vw' : props.width,
  height: props.fullscreen ? '100vh' : '',
  // top: props.top || '15vh'
})

// 想实现 ant-design-vue 中dialog的动画效果，坐标位置好像不同步，后面有时间再弄吧。先写主体功能。
// const clickCoordinate = useClickCoordinate() 


const handleClose = () => {
  const close = () => { emit('update:modelValue', false) }
  props.beforeClose ? props.beforeClose(close) : close()
}

</script>