import { Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { MainDishDto } from "../api/types/mainDishDto";
import { DishCard } from "../Components/forDishes/DishCard";
import { UpdateDishModal } from "../Components/modals/DishModal";
import { useRootStore } from "../store/RootStoreContext";
import { DishType } from "./types/dish";

export const ChefRoom = (props: any) => {
    const { userStore, dishStore } = useRootStore()
    const [showDishModal, setShowDishModal] = useState(false);
    const createDish = async (value: MainDishDto) => {
        return await dishStore.createNewDish(value)
    }
    return <Observer>{() => <div>
        {userStore.userData?.dishes.map((dish: DishType, index) => <DishCard key={index} dish={dish} jwtToken={userStore.jwtToken} isItChef={true} updateDish={dishStore.updateDish} />)}
        <button onClick={() => setShowDishModal(true)}>Добавить новое блюдо</button>
        <UpdateDishModal
            setShow={setShowDishModal}
            show={showDishModal}
            submitting={createDish}
            data={{ title: '', description: '', price: '', photo: '' }}
            title={'Создать блюдо'}
        />
    </div>}</Observer>
}