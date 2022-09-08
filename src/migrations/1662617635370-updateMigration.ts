import { MigrationInterface, QueryRunner } from "typeorm";

export class updateMigration1662617635370 implements MigrationInterface {
    name = 'updateMigration1662617635370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "img_url" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "img_url"`);
    }

}
