import {createI18n} from 'vue-i18n';
import zhCN from './zh-CN.ts' //中文语言包
import enUS from './en.ts' //英文语言包
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import en from 'element-plus/dist/locale/en.mjs'

const  i18n = createI18n({
    legacy:false,
    locale:'zh-CN',
    fallbackLocale:'en-US',
    messages:{
        'zh-CN':zhCN,
        'en-US':enUS
    }
})
export default i18n;