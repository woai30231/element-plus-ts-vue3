import {ref} from 'vue';
export function useFormValidation<T>(initialData:T){
    const formData = ref<T>(initialData);
    const errors = ref<Partial<Record<keyof T,string>>>({})
    function validateForm(rules:Record<keyof T,(value:any)=>string | null>){
        let isValid = true;
        for (const field in rules){
            const validator = rules[field];
            const value = formData.value[field];
            const error = validator(value);
            if(error){
                errors.value[field] = error;
                isValid =false;
            }else{
                delete errors.value[field];
            }
        }
        return isValid;
    }

    return {
        formData,
        errors,
        validateForm
    }
}