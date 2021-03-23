import { UpdateUserDto } from './../../../server/src/domains/Users/dto/updateUser.dto';
import { AuthData } from './../api/types/authData';
import { userRegistration, userAuth, getUserData, removeToken, updateUser, updateDish, createDish } from './../api/domains';
import { action, observable, makeObservable } from 'mobx';
import { UserData } from './types/userData';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class UserStore {
    @observable userData: UserData = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        roleId: null,
        nickname: null,
        dishes: []

    }

    @observable jwtToken: string = ''

    constructor() {
        makeObservable(this);
    }

    @action registerNewUser = async (data: any) => {
        return await userRegistration(data)
    }
    @action addUserData = async (data?: UserData) => {
        this.jwtToken = cookies.get('EAH_token')
        if (this.jwtToken) {
            const resData = await getUserData(this.jwtToken)
            this.userData = resData.data.data
            return
        }
    }
    @action authentication = async (data: AuthData) => {
        try {
            const res = await userAuth(data)
            this.addUserData(res.data)
            return ''
        } catch (e) {
            return 'Ошибка авторизации'
        }

    }
    @action logout = () => {
        removeToken(this.jwtToken)
        this.jwtToken = ''
    }

    @action updateUserData = async (newData: UpdateUserDto) => {
        const res = await updateUser(newData, this.jwtToken)
        if (!res.data.err) {
            this.userData = { ...this.userData, ...res.data.data }
        }
        return res.data.err

    }

}