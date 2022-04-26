import { ref } from 'vue';

const getButtonCoordinate = (e)=>{
  const button = e.path.find(el => el.tagName === 'BUTTON')
  let x = null
  let y = null
  if(button) {
    const { top, left, width, height } = button.getBoundingClientRect()
    x = left + (width / 2)
    y = top + (height / 2)
  }
  return { x, y }
}

const x = ref(null)
const y = ref(null)

// 如果是元素的
export default function(isButton = true){
  const handler = function(e){
    if(isButton){
      const buttonCenterCoordinate = getButtonCoordinate(e)
      x.value = buttonCenterCoordinate.x
      y.value = buttonCenterCoordinate.y
    }else{
      x.value = e.x
      y.value = e.y
    }
  }
  document.addEventListener('click', handler)
  return { x, y }
}