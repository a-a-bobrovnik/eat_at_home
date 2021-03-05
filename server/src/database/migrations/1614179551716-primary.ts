import {MigrationInterface, QueryRunner} from "typeorm";

export class primary1614179551716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE roles(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            role_name VARCHAR(100) NOT NULL
        );

        CREATE TABLE users(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            email VARCHAR(100),
            role_id INT REFERENCES roles (id),
            nickname VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        
        CREATE TABLE dishes(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            chef_id INT NOT NULL REFERENCES users (id),
            title VARCHAR(100),
            price INT,
            description VARCHAR(100)
        );
        CREATE TABLE dishes_photo(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            dishes_id INT NOT NULL REFERENCES dishes (id),
            photo_url VARCHAR(100)
        );
        CREATE TABLE orders(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES users (id)
        );
        CREATE TABLE dishes_orders(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            orders_id INT NOT NULL REFERENCES orders (id),
            dishes_id INT NOT NULL REFERENCES dishes (id)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE dishes_orders;
        DROP TABLE orders;
        DROP TABLE dishes_photo;
        DROP TABLE dishes;
        DROP TABLE users;
        DROP TABLE roles;
        `)
    }

}
