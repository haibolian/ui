let components = []
let files = import.meta.globEager('./components/**/*.vue')
debugger
// files.keys().forEach(key=>{
//   components.push(files(key).default)
// })

const install = (Vue)=>{
  components.forEach(component=>{
    Vue.component(component.name,component)
  })
}

// import './icon-color.js'

export default { install }
