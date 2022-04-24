<template>
  <div class="l-collapse">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="js">
import _ from "lingfun-utils"
import { defineComponent, ref, provide, readonly, computed, reactive, watch } from 'vue'
export default defineComponent({
  name:'LCollapse',
  componentName: 'LCollapse',
  emits:['update:modelValue', 'change'],
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Array, String],
      default: () => []
    }
  },
  setup(props, { emit, slots }){
    // init
    const data = ref(props.modelValue)
    const initData =() => {
      if(props.accordion){
        _.getType(data.value) === 'string' ? null : data.value = ''
      }else{
        _.getType(data.value) === 'array' ? null : data.value = []
      }
    }
    initData()

    // 给 v-model 赋值的情况
    watch(()=>props.modelValue,(newV, oldV)=>{
      if(newV === oldV) return
      initData()
    })

    if(props.modelValue !== data.value) emit('update:modelValue', data.value)
    const collapseProps = reactive({
      modelValue: computed(() => props.modelValue),
      accordion: computed(() => props.accordion)
    })

    // 给插槽提供 props，变更时的回调方法
    provide('collapseProps', readonly(collapseProps))
    provide('toggle', (name, isOpen) => {
      if(props.accordion){
        data.value = isOpen ? name : ''
      }else{
        if(isOpen) {
          !data.value.includes(name) && data.value.push(name)
        } else{
          if(data.value.includes(name)){
            const index = data.value.findIndex(d => d === name)
            data.value.splice(index,1)
          } 
        }
      }
      emit('change', data.value)
      emit("update:modelValue", data.value)
    })

    return {
      data,
    }
  }
})
</script>
