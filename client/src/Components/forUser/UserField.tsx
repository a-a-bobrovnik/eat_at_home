import { useEffect, useState } from "react";
import { Button } from "../../styleElements/Button";
import { UserFieldForm } from "./UpdateUserField"

export const UserField = (props: any) => {
    const [openForm, setopenForm] = useState(false);
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    useEffect(() => {
        const keysArray: any = []
        const valueArray: any = []
        for (const key in props.initialValue) {
            if (key !== 'action' && key !== 'oldEmail') {
                keysArray.push(key)
                valueArray.push(props.initialValue[key])
            }
        }
        setKeys(keysArray)
        setValues(valueArray)
    }, [props.initialValue])
    return <div>
        {
            !openForm ? <div>
                {values.map((item: string, index: number) => <span key={index}>{item}</span>)}
                <Button updateBtn={true} onClick={() => setopenForm(true)}>редактировать</Button>
            </div> : <UserFieldForm initialValue={props.initialValue} keyOfData={keys} setopenForm={setopenForm} updateUser={props.updateUser} />
        }
    </div>
}

