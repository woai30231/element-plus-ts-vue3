import {reactive,computed} from 'vue';
interface FormField {
    value:string;
    rules:((value:string)=>string|undefined)[]
}

interface FormState {
    [key:string]:FormField
}

export function useForm(formState:FormState){
    const errors = reactive<{[key:string]:string | undefined}>({})
    const validateField = (fieldName:string)=>{
        const field = formState[fieldName];
        const errorMessages = field.rules.map(rule=>rule(field.value)).filter(Boolean);
        errors[fieldName] = errorMessages[0] || undefined;
    }

    const validateAll = ()=>{
        Object.keys(formState).forEach(fieldName=>validateField(fieldName));
    }

    const isFormValid = computed(()=>{
        validateAll();
        return Object.values(errors).every(error => !error);
    })

    return {formState,errors,validateField,validateAll,isFormValid}
}