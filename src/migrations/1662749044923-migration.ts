import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1662749044923 implements MigrationInterface {
    name = 'migration1662749044923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`CREATE TABLE "restaurantAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_72548848921cb4e190700ff27f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), "userId" uuid, CONSTRAINT "PK_cc72457f081f2979232261c92a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(60) NOT NULL, "orderNº" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "userId" uuid, "restaurantId" uuid, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_products_products" ("orderId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_f11b886b3334bcd3b88a5282248" PRIMARY KEY ("orderId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_382cb147efdbee36ef28dfd62d" ON "order_products_products" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87570869d1d8035610899940a8" ON "order_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "userAddress" ADD CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "restaurantAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products_products" ADD CONSTRAINT "FK_382cb147efdbee36ef28dfd62da" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_products" ADD CONSTRAINT "FK_87570869d1d8035610899940a80" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products_products" DROP CONSTRAINT "FK_87570869d1d8035610899940a80"`);
        await queryRunner.query(`ALTER TABLE "order_products_products" DROP CONSTRAINT "FK_382cb147efdbee36ef28dfd62da"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "userAddress" DROP CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87570869d1d8035610899940a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_382cb147efdbee36ef28dfd62d"`);
        await queryRunner.query(`DROP TABLE "order_products_products"`);
        await queryRunner.query(`DROP TABLE "Order"`);
        await queryRunner.query(`DROP TABLE "userAddress"`);
        await queryRunner.query(`DROP TABLE "restaurantAddress"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "addressInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
