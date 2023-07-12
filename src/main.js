import App from './App.vue'
import {registerPlugins} from '@/plugins'
import {createApp} from 'vue'
import ToastPlugin from 'vue-toast-notification'
import 'echarts'
import '@/assets/css/global.scss'
import '@/assets/css/font.scss'

const app = createApp(App)
registerPlugins(app)
app.use(ToastPlugin)
app.mount('#app')
