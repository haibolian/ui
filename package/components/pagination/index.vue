<script>
import { defineComponent, ref, toRefs, computed, h, provide} from 'vue'
import _ from  'lingfun-utils'
import Total from './total.vue'
import Sizes from './sizes.vue'
import Prev from './prev.vue'
import Pager from './pager.vue'
import Next from './next.vue'
import Jumper from './jumper.vue'
export default defineComponent({
  name: 'LPagination',
  componentName: 'LPagination',
  emits:['size-change', 'page-change',  'prev-click', 'next-click', 'update:pageSize', 'update:currentPage',],
  components:{
    Total,
    Sizes,
    Prev,
    Pager,
    Next,
    Jumper
  },
  props:{
    total: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default(){
        return [10, 20, 30, 40]
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number
    },
    maxShowCount: {
      type: Number,
      default: 7,
      validator(val){
        return val >= 5 && val <= 21 && _.isOddNumber(val)
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }){
    
    // define internal-currentPage
    const { currentPage, total, pageSize, pageCount }  = props
    const internalCurrentPage = ref(currentPage) 
    const internalPageSize = ref(pageSize)

    const internalPageCount = computed(()=>{
      const result = total ? Math.ceil(total / internalPageSize.value) : (pageCount ?? 0)
      if(internalCurrentPage.value > result) changePage(result)
      return result
    })

    // provide - changePageSize
    const changePageSize = (val)=>{
      internalPageSize.value = val
      
      emit('size-change', val)
      emit('update:pageSize', val)
    }
    // provide - changeCurrentPage
    const changePage = (val)=>{
      internalCurrentPage.value = val
      emit('page-change', val)
      emit('update:currentPage', val)
    }

    const prev = ()=>{
      if( props.disabled || internalCurrentPage.value <= 1) return
      internalCurrentPage.value = internalCurrentPage.value - 1
      emit('prev-click', internalCurrentPage.value)
    }
    const next = ()=>{
      if(props.disabled || internalCurrentPage.value >= internalPageCount) return
      internalCurrentPage.value = internalCurrentPage.value + 1
      emit('next-click', internalCurrentPage.value)
    }

    // provide('changePageSize', changePageSize)
    provide('changePage', changePage)
    provide('hasTotal', props.hasOwnProperty('total'))
    provide('hasPageCount', props.hasOwnProperty('pageCount'))

    return {
      internalCurrentPage,
      internalPageCount,
      internalPageSize,
      prev,
      next,
      changePageSize
    }
  },

  render(){
    const components = this.layout.split(',').map(c => c.trim())
    const childrenNodes = []
    const rightWrapperChildrenNodes = []
    const TEMPLATE_MAP = {
      total: h(Total, {
        total:  this.total || 0
      }),
      sizes: h(Sizes,{
        disabled: this.disabled,
        pageSize: this.internalPageSize,
        pageSizes: this.pageSizes,
        onChangePageSize: this.changePageSize
      }),
      pager: h(Pager,{
        currentPage: this.internalCurrentPage,
        'onUpdate:currentPage': val => this.internalCurrentPage = val,
        size: this.internalPageSize,
        disabled: this.disabled,
        pageCount: this.internalPageCount,
        maxShowCount: this.maxShowCount,
      }),
      prev: h(Prev, {
        disabled: this.disabled || this.internalCurrentPage <= 1,
        currentPage: this.internalCurrentPage,
        onClick: this.prev
      }),
      next: h(Next, {
        disabled: this.disabled || this.internalCurrentPage >= this.internalPageCount,
        currentPage: this.internalCurrentPage,
        pageCount: this.internalPageCount,
        onClick: this.next
      }),
      jumper: h(Jumper, {
        disabled: this.disabled,
        currentPage: this.internalCurrentPage,
        pageCount: this.internalPageCount,
        'onUpdate:currentPage': val => this.internalCurrentPage = val,
      }),
      slot: this.$slots?.default?.() ?? null
    }

    let haveRightWrapper = false

    components.forEach(c => {
      if( c === '->') {
        haveRightWrapper = true
      }
      if(haveRightWrapper) {
        rightWrapperChildrenNodes.push(TEMPLATE_MAP[c])
      }else{
        childrenNodes.push(TEMPLATE_MAP[c])
      }
    });
    const rightWrapperNode = h('span', { class: 'l-pagination_rightWapper' }, rightWrapperChildrenNodes)
    const rootClass = {
      'l-pagination': true,
      'is-background': this.background,
      'is-disabled': this.disabled
    }
    return h('div', {class: rootClass} , [...childrenNodes, rightWrapperNode])
  }
})
</script>
