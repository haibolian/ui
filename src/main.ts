import { createApp } from 'vue'
import App from './App.vue'

import LUI from "../package/index"

const app = createApp(App).mount('#app')

app.use(LUI)

