import { Observer } from "mobx-react-lite";
import { useRootStore } from "../store/RootStoreContext";
import { DishType } from './types/dish';
import style from './style/dishes.module.css'
import { DishCard } from '../Components/forDishes/DishCard';

export const Dishes = (props: any) => {
    const { dishStore, userStore, orderStore } = useRootStore()
    return <Observer>
        {() => <div className={style.pageWrap}>
            {dishStore.dishes.map((dish: DishType, index) => <DishCard key={index} dish={dish} addToCart={orderStore.addToCart} removeFromCart={orderStore.removeFromCart} jwtToken={userStore.jwtToken}/>)}
        </div>}
    </Observer>
}
