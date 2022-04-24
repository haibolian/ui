<template>
  <li class="l-collapse-item">
    <div class="l-collapse-item_head" @click="clickHead">
      <span class="l-collapse-item_title">{{ title }}</span>
    </div>
    <transition name="slide">
      <div v-show="showBody" class="l-collapse-item_body">
        <slot></slot>
      </div>
    </transition>
  </li>
</template>
<script>
import { defineComponent, inject, ref, watch, watchEffect } from 'vue'
export default defineComponent({
  name:'LCollapseItem',
  componentName:'LCollapseItem',
  components:{},
  props:{
    title: String,
    name: {}
    
  },
  setup(props, ctx){
    const showBody = ref(false)
    const collapseProps = inject('collapseProps')
    watchEffect(()=>{
      if(collapseProps.accordion){
        showBody.value = collapseProps.modelValue === props.name
      } else{
        if(collapseProps.modelValue.includes(props.name)) showBody.value = true
      }
    })


    const toggle = inject('toggle')

    const clickHead = () => {
      showBody.value = !showBody.value
      toggle(props.name, showBody.value)
    }

    return {
      showBody,
      clickHead
    }
  }
})
</script>