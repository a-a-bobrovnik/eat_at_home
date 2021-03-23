import { MainDishDto } from './../api/types/mainDishDto';
import { UserStore } from './UserStore';
import { DishType } from './../Pages/types/dish';
import { action, computed, makeObservable, observable } from 'mobx';
import { createDish, getAllDishes, updateDish } from '../api/domains';
import Cookies from 'universal-cookie';
import { UpdateDishDto } from '../api/types/updateDishDto';
const cookies = new Cookies();


export class DishStore {
    @observable dishes: Array<DishType> = []

    @observable dishIdFromCart: Array<any> = []

    @computed get cartData() {
        return this.dishes.filter((dish: DishType) => {
            if (dish.status && this.dishIdFromCart && this.dishIdFromCart.find((dishId: number) => dishId === dish.id)) {
                return dish
            }
        })
    }

    userStore

    constructor(userStore: UserStore) {
        makeObservable(this);
        this.userStore = userStore
    }

    @action getDeishes = async () => {
        this.dishIdFromCart = cookies.get('cart')
        const res = await getAllDishes()
        //this.dishes = res.data.filter((dish: DishType) => dish.status)
        for (const dish of res.data) {
            if (dish.status && this.dishIdFromCart && this.dishIdFromCart.find((dishId: number) => dishId === dish.id)) {
                dish.inCart = true
                this.dishes.push(dish)
            } else if (dish.status) {
                this.dishes.push(dish)
            }
        }
    }



    @action updateDish = async (dishData: UpdateDishDto, token: string, dishId: number) => {
        const res = await updateDish(dishData, token, dishId)
        if (!res.data.err) {
            const dishIndexChefData = this.userStore.userData.dishes.findIndex((dish: any) => dish.id === dishId)
            const dishIndexMainData = this.dishes.findIndex((dish: DishType) => dish.id === dishId)

            this.userStore.userData.dishes[dishIndexChefData] = { ...this.userStore.userData.dishes[dishIndexChefData], ...res.data.data }
            this.dishes[dishIndexMainData] = { ...this.dishes[dishIndexMainData], ...res.data.data }
        }
        return res.data.err
    }

    @action createNewDish = async (data: MainDishDto) => {
        const res = await createDish(data, this.userStore.jwtToken)
        if (!res.data.err) {
            this.userStore.userData.dishes.push(res.data.data)
            this.dishes.push(res.data.data)
        }

        return res.data.err
    }

}