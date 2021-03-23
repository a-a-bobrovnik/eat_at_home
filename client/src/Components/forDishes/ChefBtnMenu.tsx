import { useState } from "react";
import { MainDishDto } from "../../api/types/mainDishDto";
import { UpdateDishModal } from "../modals/DishModal"

export const ChefBtnMenu = (props: any) => {
    const dish = props.dish
    const [showDishModal, setShowDishModal] = useState(false);

    const changeStatus = (status: boolean) => {
        props.updateDish({ action: "updateStatus", status }, props.token, props.dish.id)

    }

    const updateInfo = async (values:MainDishDto) =>{
        return await props.updateDish({ action: "updateMainInfo", data: values }, props.token, props.dish.id)
    }

    return <div>
        <button onClick={() => setShowDishModal(true)}>Редактировать</button>
        {props.dish.status ?
            <button onClick={() => changeStatus(false)}>Убрать с меню</button>
            : <button onClick={() => changeStatus(true)}>Добавить в меню</button>}
        <UpdateDishModal
            setShow={setShowDishModal}
            show={showDishModal}
            submitting={updateInfo}
            data={{ title: dish.title, description: dish.description, price: dish.price, photo: dish.photo }}
            title={'Редактировать блюдо'}
        />
    </div>
}