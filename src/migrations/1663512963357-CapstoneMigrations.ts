import { MigrationInterface, QueryRunner } from "typeorm";

export class CapstoneMigrations1663512963357 implements MigrationInterface {
    name = 'CapstoneMigrations1663512963357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" RENAME COLUMN "orderNº" TO "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'Order sent to the restaurant'`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "restaurantId" uuid`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "restaurantId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'Preparando'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Order" RENAME COLUMN "restaurantId" TO "orderNº"`);
    }

}
