import { MigrationInterface, QueryRunner } from "typeorm";

export class CapstoneMigrations1662757262051 implements MigrationInterface {
    name = 'CapstoneMigrations1662757262051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP CONSTRAINT "FK_32bf472f098a8b24739d42abd00"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP CONSTRAINT "FK_d9fda67810ccfed027c4817a658"`);
        await queryRunner.query(`ALTER TABLE "userAddress" RENAME COLUMN "address" TO "street"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP CONSTRAINT "REL_32bf472f098a8b24739d42abd0"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP COLUMN "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP CONSTRAINT "REL_d9fda67810ccfed027c4817a65"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD CONSTRAINT "REL_d9fda67810ccfed027c4817a65" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD "restaurantId" uuid`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD CONSTRAINT "REL_32bf472f098a8b24739d42abd0" UNIQUE ("restaurantId")`);
        await queryRunner.query(`ALTER TABLE "userAddress" RENAME COLUMN "street" TO "address"`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD CONSTRAINT "FK_d9fda67810ccfed027c4817a658" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paymentInfo" ADD CONSTRAINT "FK_32bf472f098a8b24739d42abd00" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
