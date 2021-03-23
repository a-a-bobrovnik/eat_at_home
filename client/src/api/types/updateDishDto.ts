import { MainDishDto } from './mainDishDto';

interface UpdateMainInfo {
    action: "updateMainInfo"
    data: MainDishDto
}

interface UpdateStatusDto {
    action: "updateStatus"
    status: boolean
}

export type UpdateDishDto = UpdateMainInfo | UpdateStatusDto 