import {defineStore} from 'pinia';
interface CartItem{
    id:number;
    name:string;
    price:number;
    quantity:number;
}
export const useCartStore = defineStore('cart',{
    state:()=>({
        items:[] as CartItem[]
    }),
    getters:{
        total:(state)=>{
            return state.items.reduce((sum,item)=>sum + item.price * item.quantity,0)
        }
    },
    actions:{
        addToCart(product:Omit<CartItem,'quantity'>){
            const existing = this.items.find(item=>item.id === product.id);
            if(existing){
                existing.quantity++;
            }else{
                this.items.push({...product,quantity:1})
            }
        },
        removeFromCart(id:number){
            this.items = this.items.filter(item=> item.id !== id);
        },
        updateQuantity(id:number,quantity:number){
            const item = this.items.find(item => item.id === id);
            if(item) item.quantity = quantity;
        }
    }
})