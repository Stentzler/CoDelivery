import { MigrationInterface, QueryRunner } from "typeorm";

export class CapstoneMigrations1662742534153 implements MigrationInterface {
    name = 'CapstoneMigrations1662742534153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userAddress" DROP CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5"`);
        await queryRunner.query(`ALTER TABLE "userAddress" ADD CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userAddress" DROP CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5"`);
        await queryRunner.query(`ALTER TABLE "userAddress" ADD CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
