export type UserData = {
    readonly id: number | null;

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    roleId: number | null;

    nickname: string | null;

    dishes: Array<any>;
}