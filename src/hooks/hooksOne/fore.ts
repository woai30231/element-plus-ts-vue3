import {ref} from 'vue';

export function useCountdown(seconds:number){
    const count = ref(seconds);
    const isRunning = ref(false);
    function start (){
        isRunning .value = true;
        const  timer = setInterval(()=>{
            count.value--;
            if(count.value <= 0){
                clearInterval(timer);
                isRunning.value = false;
                count.value = seconds;
            }
        },1000)
    }

    return {count ,isRunning ,start};
}