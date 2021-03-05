export interface UpdateNameDto {
    action: "updateName"
    firstName: string
    lastName: string
}

export interface UpdatePasswordDto {
    action: "updatePassword"
    oldPassword: string
    newPassword: string
}

export interface UpdateRoleDto {
    action: "updateRole"
    roleId: number
}

export interface UpdateEmailDto {
    action: "updateEmail"
    oldEmail: string
    newEmail: string
}

