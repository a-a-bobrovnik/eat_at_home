import { UpdateEmailDto, UpdateNameDto, UpdateRoleDto, UpdatePasswordDto } from './../types/userUpdate.types';

export type UpdateUserDto = UpdateNameDto | UpdatePasswordDto | UpdateEmailDto | UpdateRoleDto
