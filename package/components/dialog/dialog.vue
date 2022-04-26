<template>
  <LOverlay :show="modelValue">
    <div v-show="modelValue" class="l-dialog" :style="dialogStyle">
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
import { ref, reactive, getCurrentInstance, useAttrs } from "vue"

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
  }
})

const attrs = useAttrs()
const dialogStyle = reactive({
  width: props.width
})

const handleClose = () => {
  const close = () => { emit('update:modelValue', false) }
  props.beforeClose ? props.beforeClose(close) : close()
}

</script>