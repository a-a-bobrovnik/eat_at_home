import React from 'react';
import style from '../style/header.module.css'
import logo from '../../assets/img/logo.png'
import { useState } from 'react';
import { RegisterModal } from '../modals/RegisterModal';
import { useRootStore } from '../../store/RootStoreContext';
import { AuthModal } from '../modals/AuthModal';
import { Observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

export const Header = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { userStore, dishStore } = useRootStore()

    React.useEffect(() => {
            userStore.addUserData()
            dishStore.getDeishes()   
    })


    return <Observer>{
        () => <div className={style.headerWrap}>
            <div className={style.logo}>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <Link to="/dishes">Меню блюд</Link>
            {userStore.userData?.roleId===1?<Link to="/chefRoom">Моя кухня</Link>:''}
            {userStore.userData ? <div>
                <div><Link to="/userRoom">{userStore.userData.nickname}</Link></div>
                <button onClick={() => userStore.logout()}>выйти</button>
                <Link to="/cart">Корзина</Link>
            </div> : <div className={style.btnsWrap}>
                <button onClick={() => setShowRegisterModal(true)}>регистрация</button>
                <button onClick={() => setShowAuthModal(true)}>войти</button>
            </div>}

            <RegisterModal
                setShow={setShowRegisterModal}
                show={showRegisterModal}
                registerNewUser={userStore.registerNewUser}
                addUserData={userStore.addUserData}
                authentication={userStore.authentication}
            />
            <AuthModal
                setShowAuthModal={setShowAuthModal}
                show={showAuthModal}
                authentication={userStore.authentication}
            />

        </div>
    }

    </Observer>
}