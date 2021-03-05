import { DishPhoto } from './../../dbEntityes/dishPhoto.entity';
import { CreateDishDto } from './dto/createDish.dto';
import { User } from 'src/dbEntityes/user.entity';
import { Dish } from 'src/dbEntityes/dish.entity';
import { Injectable } from '@nestjs/common';
import { getRepository } from "typeorm";
import { DishesMenuDto } from './dto/dishesMenu.dto';
import { UpdateDishDto } from './dto/updateDishDto.dto';


@Injectable()
export class DishesService {

    getDishesRepository() {
        return getRepository(Dish);
    }

    getUserRepository() {
        return getRepository(User);
    }

    validateDish(dishId, userId) {
        return this.getDishesRepository().findOne({
            where: [{ id: dishId, chefId: userId }]
        })
    }

    async getDishes(): Promise<DishesMenuDto[]> {
        const dishes = await this.getDishesRepository().find({
            relations: ['chef', 'photoUrl'],
            select: ['id', 'price', 'title', 'chef'],
            where: [{ status: true }]
        });

        return dishes.map(dish => ({
            id: dish.id,
            price: dish.price,
            photoUrl: dish.photoUrl.map(photo=>photo.photoUrl),
            title: dish.title,
            chef: {
                id: dish.chef.id,
                firstName: dish.chef.firstName,
                lastName: dish.chef.lastName
            }
        }))
    }

    async addNewDishes(dto: CreateDishDto, userId: number) {
        const chef = this.getUserRepository().findOne({
            where: [{ id: userId, roleId: 1 }]
        })
        if (chef) {
            const dishData = {
                chefId: userId,
                title: dto.title,
                price: dto.price,
                description: dto.description,
                status: true
            }
            const resDishData = await this.getDishesRepository().insert(dishData)
            const dishId = resDishData.identifiers[0].id
            dto.photos.forEach(item => {
                getRepository(DishPhoto).insert({
                    dishesId: dishId,
                    photoUrl: item
                })
            })
            dishData['id'] = dishId
            dishData['photos'] = dto.photos
            return { err: null, data: dishData }
        }else{
            return { err: 'you do not have permission to add dishes', data: null }
        }

    }

    updateDish(dishId, userId, dto: UpdateDishDto) {
        switch (dto.action) {
            case "updateTitle":
                return this.updateMainInfo(dishId, userId, dto.title, 'title')
            case "updateDescription":
                return this.updateMainInfo(dishId, userId, dto.description, 'description')
            case "updatePrice":
                return this.updateMainInfo(dishId, userId, dto.price, 'price')
            case "updateStatus":
                return this.updateMainInfo(dishId, userId, dto.status, 'status')
            default: return { err: 'action does not exist or is not supported', data: null }
        }
    }

    async updateMainInfo(dishId, userId, value, key) {
        const dish = await this.validateDish(dishId, userId)
        if (dish) {
            this.getDishesRepository().update(dishId, {
                [key]: value ? value : dish[key]
            })
            return {
                err: null, data: {
                    [key]: value || value === false ? value : dish[key]
                }
            }
        } else {
            return {
                err: 'you cannot update this dish', data: null
            }
        }
    }
}