import { Observer } from "mobx-react-lite";
import { useRootStore } from "../store/RootStoreContext";
import { UserField } from '../Components/forUser/UserField';
import { useEffect, useState } from "react";
import { UserOrderWindow } from "../Components/modals/UserOrderWindow"

export const UserRoom = (props: any) => {
    const [openWindow, setOpenWindow] = useState(false);
    const { userStore, orderStore } = useRootStore()

    useEffect(() => {
        orderStore.getUserOrders()
    })
    return <Observer>{() => {
        const userDataArray = [
            {
                action: 'updateName',
                firstName: userStore.userData?.firstName,
                lastName: userStore.userData?.lastName
            },
            {
                action: 'updatePassword',
                oldPassword: '',
                newPassword: ''
            },
            {
                action: 'updateRole',
                roleId: userStore.userData?.roleId
            },
            {
                action: 'updateEmail',
                oldEmail: userStore.userData?.email,
                newEmail: userStore.userData?.email
            }
        ]
        return <div>{
            userDataArray.map((item, index) => <UserField key={index} initialValue={item} updateUser={userStore.updateUserData} />)
        }
            <button onClick={() => { setOpenWindow(true) }}>История заказов</button>
            <UserOrderWindow orders={orderStore.orders} setShow={setOpenWindow}
                show={openWindow} />
        </div>
    }}</Observer>
}