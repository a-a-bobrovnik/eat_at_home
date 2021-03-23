export type DishType = {
    readonly chef: object;

    readonly id: number;
  
    readonly photoUrl: Array<string>;
  
    readonly price: number;
  
    readonly title: string;

    readonly description: string;

    readonly status: boolean;

    inCart?:boolean;
}