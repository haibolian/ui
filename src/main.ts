import { createApp } from 'vue'
import App from './App.vue'

import LUI from "../package/index"
import '../package/style/index.scss'

const app = createApp(App)
app.use(LUI)

app.mount('#app')
