export interface UpdateTitleDto {
    action: "updateTitle"
    title: string
}

export interface UpdatePriceDto {
    action: "updatePrice"
    price: number
}

export interface UpdateDescriptionDto {
    action: "updateDescription"
    description: string
}

export interface UpdateStatusDto {
    action: "updateStatus"
    status: boolean
}