import { Observer } from "mobx-react-lite";
import { ChefBtnMenu } from "./ChefBtnMenu";
import { MainBtnMenu } from "./MainBtnMenu";

export const DishCard = (props: any) => {
    return <Observer>{() => <div>
        <p>{props.dish.title}</p>
        <img src={props.dish.photo} alt="dish" />
        <p>{props.dish.description}</p>
        {props.jwtToken && !props.isItChef ?
            <MainBtnMenu dish={props.dish} addToCart={props.addToCart} removeFromCart={props.removeFromCart}/> :
            props.jwtToken && props.isItChef ?
                <ChefBtnMenu updateDish={props.updateDish} token={props.jwtToken} dish={props.dish} /> :
                ''}
    </div>

    }</Observer>
}