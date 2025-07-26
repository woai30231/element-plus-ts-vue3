import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index';
import './style.css'
import App from './App.vue'
import {registerElementPlusIcons} from './common/registerIcons'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

var app = createApp(App)
app.use(ElementPlus)
app.use(router);
// for(const [key,component] of Object.entries(ElementPlusIconsVue)){
//     app.component(key,component as any)
// }
registerElementPlusIcons(app);
app.mount('#app');

