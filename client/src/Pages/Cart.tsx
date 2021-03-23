import { Observer } from "mobx-react-lite";
import { DishCard } from "../Components/forDishes/DishCard";
import { useRootStore } from "../store/RootStoreContext";
import { Button } from "../styleElements/Button";

export const Cart = (props: any) => {
    const { dishStore, userStore, orderStore } = useRootStore()

    return <Observer>{() => <div>{
        dishStore.cartData.length > 0 ? <div>{dishStore.cartData.map((dish, index) =>
            <DishCard
                key={index}
                dish={dish}
                addToCart={orderStore.addToCart}
                removeFromCart={orderStore.removeFromCart}
                jwtToken={userStore.jwtToken} />

        )}<Button onClick={() => orderStore.createOrder()}>Сделать заказ</Button></div> : 'Корзина пустая'
    }

    </div>}

    </Observer>
}