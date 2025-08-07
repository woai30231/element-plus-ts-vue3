import {useI18n} from 'vue-i18n';
import {watch} from 'vue';

export default function(){
    const {locale} = useI18n();
    const lLang = localStorage.getItem('language');
    locale.value = lLang?JSON.parse(lLang):'zh-CN';
    
    watch(locale,()=>{
        console.log("语言切换了")
    })
    const switchLanguage = ()=>{
        
        //获取当前切换语言
        console.log("当前语言:"+locale.value);
        const isCH = locale.value == 'zh-CN';
        locale.value = isCH?'en-US':'zh-CN';
        localStorage.setItem('language',JSON.stringify(locale.value));
    }
    return {switchLanguage}
}