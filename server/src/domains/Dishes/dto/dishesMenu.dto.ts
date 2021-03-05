export interface DishesMenuDto {
    id: number
    title: string
    price: number
    photoUrl: Array<string>
    chef: {
        id: number
        firstName: string
        lastName: string
    }
}
