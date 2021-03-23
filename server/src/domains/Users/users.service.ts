import { UpdateUserDto } from './dto/updateUser.dto';
import { Role } from './../../dbEntityes/role.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { getRepository } from "typeorm";
import { User } from 'src/dbEntityes/user.entity';
import * as bcrypt from 'bcrypt';
import { HelperForService } from 'src/helperForService';
import { OpenUserJwtTokenDto } from './dto/openUserJwtTokenDto.dto';

@Injectable()
export class UserService extends HelperForService {

    async getUserData(id:number){
        const user = await getRepository(User).findOne({
            relations: ['dishes'],
            select: ['id', 'firstName', 'lastName', 'email', 'roleId', 'nickname'],
            where: [{ id: id }]
        })

        if(user){
            return{ err: null, data: user }
        }else{
            return{ err: null, data: user } 
        }
    }

    async addNewUser(RegisterUserDto: RegisterUserDto) {
        const oldUser = await getRepository(User).findOne({
            where: [{ nickname: RegisterUserDto.nickname }]
        })

        if (!oldUser && this.validateEmail(RegisterUserDto.email)) {
            const salt = await bcrypt.genSalt();
            const user = {
                firstName: RegisterUserDto.firstName,
                lastName: RegisterUserDto.lastName,
                email: RegisterUserDto.email,
                roleId: RegisterUserDto.roleId,
                nickname: RegisterUserDto.nickname,
                password: await bcrypt.hash(RegisterUserDto.password, salt),
            }
            await getRepository(User).insert(user)
            delete user.password
            return { err: null, data: user }
        } else {
            return { err: 'a user with this nickname is already exists', data: null }
        }
    }

    async findOne(nickname: string): Promise<User | undefined> {
        const allUsers = await getRepository(User).find({
            select: ['id', 'firstName', 'lastName', 'email', 'roleId', 'nickname', 'password'],
        })
        return allUsers.find(user => user.nickname === nickname);
    }

    async deleteUser(dto: OpenUserJwtTokenDto, data) {
        const user = await getRepository(User).findOne({
            select: ['id', 'password'],
            where: [{ id: dto.userId }]
        })
        if (user && await bcrypt.compare(data.password, user.password)) {
            getRepository(User).delete({ id: dto.userId })
            return { err: null, data: 'user deleted' }
        } else {
            return { err: 'wrong password', data: null }
        }
    }


    // ____________________Update_user_block

    updateUser(id: number, dto: UpdateUserDto) {
        switch (dto.action) {
            case "updateName":
                return this.updateName(id, dto.firstName, dto.lastName)

            case "updatePassword":
                return this.updatePassword(id, dto.newPassword, dto.oldPassword)

            case "updateRole":
                return this.updateRole(id, dto.roleId)

            case "updateEmail":
                return this.updateEmail(id, dto.newEmail, dto.oldEmail)

            default: return { err: 'action does not exist or is not supported', data: null }
        }
    }

    async updateName(id: number, firstName, lastName) {
        const user = await getRepository(User).findOne({
            select: ['id', 'firstName', 'lastName','roleId', 'email','nickname'],
            where: [{ id: id }]
        })

        getRepository(User).update(id, {
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
        })
        return {
            err: null, data: {
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName
            }
        }
    }

    async updateRole(id: number, roleId) {
        const user = await getRepository(User).findOne({
            select: ['id', 'roleId'],
            where: [{ id: id }]
        })
        getRepository(User).update(id, {
            roleId: roleId ? roleId : user.roleId
        })
        return {
            err: null, data: {
                roleId: roleId ? roleId : user.roleId
            }
        }
    }

    async updateEmail(id: number, newEmail, oldEmail) {
        const user = await getRepository(User).findOne({
            select: ['id', 'email'],
            where: [{ id: id }]
        })
        if (user.email === oldEmail && this.validateEmail(newEmail)) {
            getRepository(User).update(id, {
                email: newEmail ? newEmail : user.email
            })
            return { err: null, data: { email: newEmail ? newEmail : user.email } }
        } else {
            return { err: 'auth error', data: null }
        }
    }

    async updatePassword(id: number, newPassword, oldPassword) {
        const user = await getRepository(User).findOne({
            select: ['id', 'password'],
            where: [{ id: id }]
        })
        if (await bcrypt.compare(oldPassword, user.password)) {
            const salt = await bcrypt.genSalt();
            getRepository(User).update(id, {
                password: newPassword ? await bcrypt.hash(newPassword, salt) : user.password
            })
            delete user.password
            return { err: null, data: user }
        } else {
            return { err: 'password incorect', data: null }
        }
    }

}







