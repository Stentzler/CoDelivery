import { MigrationInterface, QueryRunner } from "typeorm";

export class CapstoneMigrations1662758539695 implements MigrationInterface {
    name = 'CapstoneMigrations1662758539695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paymentInfo" RENAME COLUMN "Name" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paymentInfo" RENAME COLUMN "name" TO "Name"`);
    }

}
