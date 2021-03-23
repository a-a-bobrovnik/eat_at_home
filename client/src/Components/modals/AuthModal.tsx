import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik';

export const AuthModal = (props: any) => {
    const [serverErr, setServerErr] = useState('');
    const handleClose = () => {
        props.setShowAuthModal(false)
    }
    return <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{ password: '', nickname: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    const authErr = await props.authentication({ username: values.nickname, password: values.password })
                    setServerErr(authErr)
                    !authErr && handleClose()
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nickname">Логин</label>
                        <input
                            type="text"
                            name="nickname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nickname}
                        />
                        {errors.nickname && touched.nickname && errors.nickname}
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            Войти
           </button>
                    </form>
                )}
            </Formik>

        </Modal.Body>
        <Modal.Footer>
            <div>{serverErr}</div>
        </Modal.Footer>
    </Modal>
}