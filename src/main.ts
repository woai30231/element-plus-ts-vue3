import { createApp} from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index';
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'
import i18n from '@/lang/index.ts';
// import zhCn  from 'element-plus/dist/locale/zh-cn.mjs';
import {registerElementPlusIcons} from './common/registerIcons'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'



var app = createApp(App)
app.use(ElementPlus)
app.use(router);
app.use(createPinia());
app.use(i18n);
registerElementPlusIcons(app);



// for(const [key,component] of Object.entries(ElementPlusIconsVue)){
//     app.component(key,component as any)
// }


app.mount('#app');



