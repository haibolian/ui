<template>
  <li :class="['l-collapse-item', disabled ? 'l-collapse-item_disabled' : '']">
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
import { defineComponent, inject, ref, watchEffect } from 'vue'
export default defineComponent({
  name:'LCollapseItem',
  componentName:'LCollapseItem',
  components:{},
  props:{
    title: String,
    name: {},
    disabled: Boolean
    
  },
  setup(props, ctx){
    const showBody = ref(false)
    const collapseProps = inject('collapseProps')
    let modelValueCopy = collapseProps.modelValue
    const isFixed = ref(false)
    
    watchEffect(()=>{
      if(modelValueCopy != collapseProps.modelValue){
        isFixed.value = false
      }
      if(isFixed.value) return
      showBody.value = collapseProps.accordion 
        ? collapseProps.modelValue === props.name
        : collapseProps.modelValue.includes(props.name)
      if(props.disabled) isFixed.value = true
    })


    const toggle = inject('toggle')

    const clickHead = () => {
      if(props.disabled) return
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
<style  scoped>
  .slide-enter-from, .slide-leave-active{
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  
  .slide-enter-active, .slide-leave-active{
    transition: all .5s ease;
  }
</style>