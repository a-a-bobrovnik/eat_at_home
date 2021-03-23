import Modal from 'react-bootstrap/Modal'
import { MainDishDto } from '../../api/types/mainDishDto';
import { OrderData } from '../types/orderData';

export const UserOrderWindow = (props: any) => {
    const handleClose = () => {
        props.setShow(false)
    }


    return <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Мои заказы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.orders.map((item: OrderData, index: number) => <div key={index}><p>Заказ № "{item.id}"(
                {item.dishes.map((dish: MainDishDto, index: number) => <span key={`${index}-dish`}>{dish.title}</span>
            )})</p></div>)}

        </Modal.Body>
    </Modal>
}