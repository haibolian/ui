<template>
  <div
    :class="['l-select']"
    @click="toggleMenu"
    v-clickoutside='handleClose'
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    >
    <l-input
      ref="select_inner"
      :placeholder="placeholderText"
      class="l-select-inner"
      v-model="searchText"
      :readonly="readonly"
      :disabled="disabled"
      @input="handleInput"
      >
      <template v-slot:suffix>
        <i v-show="!showClear" :class="['l-icon', 'icon-arrow-down', 'l-icon-readonly',showOptions ? 'is-reverse' : '']"></i>
        <i v-show="showClear" class="l-icon icon-error" @click.stop="clear"></i>
      </template>
    </l-input>
    <transition name="slide-down">
      <div
        ref="select_dropdown" 
        :style="dropdownStyle"
        v-show="showOptions" 
        :class="{'l-select-dropdown':true,'l-select-direction-top':dropdownStyle.bottom}"
        >
        <div class="l-select-dropdown-wrap">
          <ul class="l-select-dropdown-options">
            <template v-if="showNoData">
              <slot name="empty">
                <p class="l-select-option l-select-empty" @click.stop>无匹配数据</p>
              </slot>
            </template>
            <slot></slot>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import clickoutside from '@/utils/clickoutside.js'
import { nextTick } from 'vue'
  export default {
    name:'LSelect',
    emits:['change', 'update:modelValue'],
    componentName:'LSelect',
    directives:{clickoutside},
    data() {
      return {
        showOptions:false,
        isHovering:false,
        options:{},
        searchText:'',
        showNoData:false,
        dropdownStyle:{
          bottom:'',
          transformOrigin:'center top'
        }
      };
    },
    props:{
      modelValue:[String,Boolean,Number,Array],
      disabled:Boolean,
      clearable:Boolean,
      filterable:Boolean,
      placeholder: {
        type: [String,Boolean,Number],
        default:'请选择'
      }
    },
    computed:{
      hasValue(){
        return Array.isArray(this.modelValue) ? this.modelValue.length : this.modelValue
      },
      showClear(){
        return !this.disabled && this.clearable && this.hasValue && this.isHovering
      },
      readonly(){
        return !this.filterable || !this.showOptions
      },
      placeholderText(){
        return this.options[this.modelValue] || this.placeholder
      },
    },
    methods:{
      clear(){
        this.$emit('update:modelValue','')
        this.searchText = ''
        this.showOptions = false
      },
      handleClose(){
        this.showOptions = false
        if(this.filterable){
          !this.showOptions ? this.searchText =this.options[this.modelValue] : this.searchText = ''
        }
      },
      toggleMenu(ev){
        if(!this.disabled) this.showOptions = !this.showOptions
        this.showNoData = false
        if(this.filterable){
          !this.showOptions ? this.searchText =this.options[this.modelValue] : this.searchText = ''
        }
        nextTick(()=>{
          this.showOptions && this.setMenuShowDirection(ev)
        })
      },
      setMenuShowDirection(ev){
        let height = ev.target.offsetHeight
        let bottom = document.documentElement.clientHeight - ev.target.getBoundingClientRect().bottom - this.$refs.select_dropdown.offsetHeight
        this.dropdownStyle.bottom = bottom < 0 ?  height + 8 + 'px' : ''
        // 设置动画
        this.dropdownStyle.transformOrigin = bottom < 0 ? 'center bottom' : 'center top'
      },
      handleInput(val){
        this.showNoData = this.filterable && this.$slots.default.every(op=>op.child.filterable)
      },
      setSearchText(val){
        this.searchText = val
      }
    },
    mounted(){
      this.searchText = this.options[this.modelValue] || this.modelValue
    }
  };
  
</script>