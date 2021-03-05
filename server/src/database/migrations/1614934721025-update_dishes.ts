import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDishes1614934721025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.dishes
        ADD COLUMN status_active boolean;`)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.dishes
        DROP COLUMN status_active
        `)
    }

}
