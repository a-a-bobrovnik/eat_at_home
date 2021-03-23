import { Formik } from 'formik';
import { useState } from 'react';
import { Button } from '../../styleElements/Button';

export const UserFieldForm = (props: any) => {
    const [serverErr, setServerErr] = useState('');

    return <Formik
        initialValues={props.initialValue}
        onSubmit={async (values, { setSubmitting }) => {
            const err = await props.updateUser(values)
            if (err) {
                setServerErr(err)
            } else {
                setServerErr('')
                props.setopenForm(false)
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
                { props.keyOfData.map((item: any, index: number) => {
                    return <div key={index}>
                        <label htmlFor={item}>{item}</label>
                        <input
                            type="text"
                            name={item}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[item]}
                        />
                    </div>
                })}
                {serverErr}
                <Button type="submit" disabled={isSubmitting}>сохранить</Button>
            </form>
        )}
    </Formik>
}