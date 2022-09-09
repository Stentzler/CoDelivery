import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1662762999041 implements MigrationInterface {
    name = 'migrations1662762999041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurantAddress" RENAME COLUMN "address" TO "street"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" RENAME COLUMN "Name" TO "name"`);
        await queryRunner.query(`ALTER TABLE "userAddress" RENAME COLUMN "address" TO "street"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userAddress" RENAME COLUMN "street" TO "address"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" RENAME COLUMN "name" TO "Name"`);
        await queryRunner.query(`ALTER TABLE "restaurantAddress" RENAME COLUMN "street" TO "address"`);
    }

}
