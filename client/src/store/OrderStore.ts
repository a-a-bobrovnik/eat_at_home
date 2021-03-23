import { DishStore } from './DishStore';
import { UserStore } from './UserStore';
import { addNewOrder, getOrders } from './../api/domains';
import { DishType } from './../Pages/types/dish';
import { action, makeObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class OrderStore {

    @observable orders = []

    dishStore

    userStore

    constructor(dishStore: DishStore, userStore: UserStore) {
        makeObservable(this);
        this.dishStore = dishStore
        this.userStore = userStore
    }

    @action getUserOrders = async () => {
        const res = await getOrders(this.userStore.jwtToken)
        if(!res.data.err){
            this.orders = res.data.data
        }
        console.log(res)
    }

    changeCartStatusInDish = (dishId: number, value: boolean) => {
        const dishIndex = this.dishStore.dishes.findIndex((dish: DishType) => dish.id === dishId)
        this.dishStore.dishes[dishIndex] = { ...this.dishStore.dishes[dishIndex], inCart: value }
    }

    @action addToCart = (dishId: number) => {
        const oldCookieOrderData = cookies.get('cart')

        if (oldCookieOrderData) {
            const cartData = new Set(oldCookieOrderData)
            cartData.add(dishId)
            cookies.set('cart', Array.from(cartData), { path: '/' });
            this.dishStore.dishIdFromCart = Array.from(cartData)
        } else {
            cookies.set('cart', [dishId], { path: '/' });
            this.dishStore.dishIdFromCart = [dishId]
        }
        this.changeCartStatusInDish(dishId, true)
    }
    @action removeFromCart = (dishId: number) => {
        const oldCookieOrderData = cookies.get('cart')
        if (oldCookieOrderData) {
            const cartData = new Set(oldCookieOrderData)
            cartData.delete(dishId)
            cookies.set('cart', Array.from(cartData), { path: '/' });
            this.dishStore.dishIdFromCart = Array.from(cartData)
            this.changeCartStatusInDish(dishId, false)
        }
    }

    clearDishCookie() {
        this.dishStore.dishes.forEach((dish: DishType) => {
            dish.inCart = false
        });
        cookies.remove('cart')
        this.dishStore.dishIdFromCart = []
    }

    @action createOrder = async () => {
        const cart = cookies.get('cart')
        const token = cookies.get('EAH_token')
        if (token && cart && cart.length > 0) {
            const res = await addNewOrder(cart, token)
            res.data.data && this.clearDishCookie()
            return res.data.err
        }
    }
}