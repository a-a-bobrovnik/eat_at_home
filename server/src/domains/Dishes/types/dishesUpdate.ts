export interface UpdateMainInfo {
    action: "updateMainInfo"
    data:{
        title: string
        description: string
        price: number
        photo: string
    }
}

export interface UpdateStatusDto {
    action: "updateStatus"
    status: boolean
}