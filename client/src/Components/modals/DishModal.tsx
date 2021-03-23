import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik';

export const UpdateDishModal = (props: any) => {
    const [serverErr, setServerErr] = useState('');
    const handleClose = () => {
        props.setShow(false)
    }

    return <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={props.data}
                onSubmit={async (values, { setSubmitting }) => {
                    const err = await props.submitting(values)
                    console.log('2',err)
                    if (err) {
                        setServerErr(err)
                    } else {
                        setServerErr('')
                        handleClose()
                    }
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
                        <label htmlFor="firstName">Назание</label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <label htmlFor="photo">Фото</label>
                        <input
                            type="text"
                            name="photo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.photo}
                        />
                        <label htmlFor="description">Рецепт</label>
                        <input
                            type="text"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        <label htmlFor="price">Цена</label>
                        <input
                            type="text"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                        />
                        <button type="submit" disabled={isSubmitting}>Сохранить</button>
                    </form>
                )}
            </Formik>

        </Modal.Body>
        <Modal.Footer>
            <div>{serverErr}</div>
        </Modal.Footer>
    </Modal>
}