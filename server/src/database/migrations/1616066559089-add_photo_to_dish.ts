import {MigrationInterface, QueryRunner} from "typeorm";

export class addPhotoToDish1616066559089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.dishes
        ADD COLUMN photo VARCHAR(100);`)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.dishes
        DROP COLUMN photo
        `)
    }

}
