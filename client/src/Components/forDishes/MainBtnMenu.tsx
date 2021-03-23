export const MainBtnMenu = (props: any) => {
    return <div>
        {props.dish.inCart ? <button onClick={() => props.removeFromCart(props.dish.id)}>удалить</button> :
            <button onClick={() => props.addToCart(props.dish.id)}>добавить</button>
        }
    </div>
}