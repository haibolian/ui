<template>
  <div class="l-collapse">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="js">
import _ from "lingfun-utils"
import { defineComponent, ref, provide, readonly, computed, reactive } from 'vue'
export default defineComponent({
  name:'LCollapse',
  componentName: 'LCollapse',
  emits:['update:modelValue'],
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [Array, String],
      default: () => []
    }
  },
  setup(props, { emit, slots }){
    const data = ref(props.modelValue)
    if(props.accordion){
      _.getType(data.value) === 'string' ? null : data.value = ''
    }else{
      _.getType(data.value) === 'array' ? null : data.value = []
    }

    if(props.modelValue !== data.value) emit('update:modelValue', data.value)
    const collapseProps = reactive({
      modelValue: computed(() => props.modelValue),
      accordion: computed(() => props.accordion)
    })

    provide('collapseProps', readonly(collapseProps))

    provide('toggle', (name, isOpen) => {
      if(props.accordion){
        data.value = isOpen ? name : ''
      }else{
        if(isOpen) return !data.value.includes(name) && data.value.push(name)
        if(data.value.includes(name)){
          const index = data.value.findIndex(d => d === name)
          data.value.splice(index,1)
        } 
      }
      emit("update:modelValue", data.value)
    })

    return {
      data,
    }
  }
})
</script>
