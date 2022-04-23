let components = []
let files = import.meta.globEager('./components/**/*.vue')
Object.keys(files).forEach(key=>{
  components.push(files[key].default)
})

const install = (Vue)=>{
  components.forEach(component=>{
    Vue.component(component.name,component)
  })
}

import './icons/index.js';

export default { install }
