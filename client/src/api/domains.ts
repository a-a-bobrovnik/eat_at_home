import { MainDishDto } from './types/mainDishDto';
import { CreateOrderDto } from './types/createOrder';
import { UpdateUserDto } from './types/updateUser';
import { AuthData } from './types/authData';
import axios from 'axios'
import { UserRegistration } from './types/userRegistration'
import { UpdateDishDto } from './types/updateDishDto';

const baseURl = 'http://localhost:3000'

// User Domains

export const userRegistration = (registerData: UserRegistration) => {
    return axios.post(`${baseURl}/users/registration`, registerData)
}

export const getUserData = (token: string) => {
    return axios.get(`${baseURl}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const removeToken = (token: string) => {
    axios.defaults.withCredentials = true
    return axios.delete(`${baseURl}/auth/logout`)
}

export const userAuth = (authData: AuthData) => {
    axios.defaults.withCredentials = true
    return axios.post(`${baseURl}/auth/login`, authData)
}

export const updateUser = (newUserData: UpdateUserDto, token: string) => {
    return axios.put(`${baseURl}/users`, newUserData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// Dishes Domains
export const getAllDishes = () => {
    return axios.get(`${baseURl}/dishes`)
}

export const updateDish = (dishData: UpdateDishDto, token: string, dishId: number) => {
    return axios.put(`${baseURl}/dishes/${dishId}`, dishData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createDish = (dishData: MainDishDto, token: string) => {
    return axios.post(`${baseURl}/dishes`, dishData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Order Domains

export const addNewOrder = (orderData: CreateOrderDto, token: string) => {
    return axios.post(`${baseURl}/orders`, orderData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getOrders = (token: string) => {
    return axios.get(`${baseURl}/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



