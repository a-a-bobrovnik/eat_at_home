import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik';

export const RegisterModal = (props: any) => {
    const [serverErr, setServerErr] = useState('');
    const handleClose = () => {
        props.setShow(false)
    }

    return <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Регистрация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: '', nickname: '', roleId: 1, email: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    const res = await props.registerNewUser(values)
                    if (res.data.err) {
                        setServerErr(res.data.err)
                    }else{
                        props.addUserData(res.data.data)
                        const authRes = await props.authentication({username:values.nickname, password:values.password})
                    }
                }}
                validate={values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
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
                        <label htmlFor="firstName">Имя</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                        />
                        {errors.firstName && touched.firstName && errors.firstName}
                        <label htmlFor="lastName">Фамилия</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                        />
                        {errors.lastName && touched.lastName && errors.lastName}
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}

                        <label htmlFor="roleId">Тип</label>
                        <select
                            name="roleId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.roleId}>
                            <option value="1">Повар</option>
                            <option value="2">Клиент</option>
                        </select>
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
                            Зарегистрироваться
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