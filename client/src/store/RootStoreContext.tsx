import { UserStore } from './UserStore';
import React from 'react';
import { DishStore } from './DishStore';
import { OrderStore } from './OrderStore';

type RootStoreContextValue = {
    userStore: UserStore
    dishStore: DishStore
    orderStore: OrderStore
}

const RootStoreContext = React.createContext<RootStoreContextValue>({} as RootStoreContextValue)

const userStore = new UserStore()
const dishStore = new DishStore(userStore)
const orderStore = new OrderStore(dishStore,userStore)

export const RootStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <RootStoreContext.Provider value={{ dishStore, userStore, orderStore }}>{children}</RootStoreContext.Provider>
}
export const useRootStore = () => React.useContext(RootStoreContext)
