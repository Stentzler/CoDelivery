import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1662997454821 implements MigrationInterface {
    name = 'createTables1662997454821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_8f2bbb7ead10e637c55e0c86b19" UNIQUE ("name"), CONSTRAINT "PK_1012430e55dad863919f1221a72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_592d6e825deb2b7555df74ae5dc" UNIQUE ("name"), CONSTRAINT "PK_f2fae4b1da538f2dc5777efb7c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_72548848921cb4e190700ff27f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paymentInfo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "cardNo" character varying(20) NOT NULL, "cvvNo" character varying(10) NOT NULL, "expireDate" character varying(20) NOT NULL, "cpf" character varying(20) NOT NULL, CONSTRAINT "PK_aa67d95006c6ffaa5cb3b3fcfbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), "userId" uuid, CONSTRAINT "PK_cc72457f081f2979232261c92a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(60) NOT NULL, "userName" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "isRestaurant" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentInfoId" uuid, "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8cd3b57fedc2bc5eccd61ee240" UNIQUE ("paymentInfoId"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(60) NOT NULL, "orderNº" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "userId" uuid, "restaurantId" uuid, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "description" character varying(256) NOT NULL, "isRestaurant" boolean NOT NULL DEFAULT true, "email" character varying(60) NOT NULL, "img_url" character varying(256) NOT NULL, "password" character varying(120) NOT NULL, "cnpj" character varying(60) NOT NULL, "phoneNumber" character varying(60) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "categoryId" uuid, CONSTRAINT "UQ_9315499c5bf5ead89fbb877a0b5" UNIQUE ("name"), CONSTRAINT "UQ_d055cac5f0f06d57b0a3b1fe574" UNIQUE ("email"), CONSTRAINT "UQ_90c4dae30ae32bbf9c92c2907b7" UNIQUE ("cnpj"), CONSTRAINT "REL_bb5b4776c9456a30666f9233b0" UNIQUE ("addressId"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "description" character varying(256) NOT NULL, "price" numeric(12,2) NOT NULL, "img_url" character varying(256) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, "restaurantId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" numeric(12,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_products_products" ("orderId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_f11b886b3334bcd3b88a5282248" PRIMARY KEY ("orderId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_382cb147efdbee36ef28dfd62d" ON "order_products_products" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87570869d1d8035610899940a8" ON "order_products_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "cart_products_products" ("cartId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_9f96b1bce6e6963a289e3803835" PRIMARY KEY ("cartId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5f8b003429a633008da82eb11" ON "cart_products_products" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7da6114c85ab86bbb6c634cad4" ON "cart_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "userAddress" ADD CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409" FOREIGN KEY ("paymentInfoId") REFERENCES "paymentInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "restaurantAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1" FOREIGN KEY ("categoryId") REFERENCES "restaurantCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "productCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products_products" ADD CONSTRAINT "FK_382cb147efdbee36ef28dfd62da" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_products" ADD CONSTRAINT "FK_87570869d1d8035610899940a80" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_c5f8b003429a633008da82eb111" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d"`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_c5f8b003429a633008da82eb111"`);
        await queryRunner.query(`ALTER TABLE "order_products_products" DROP CONSTRAINT "FK_87570869d1d8035610899940a80"`);
        await queryRunner.query(`ALTER TABLE "order_products_products" DROP CONSTRAINT "FK_382cb147efdbee36ef28dfd62da"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_68a4b282c3ccf9411b7309b5c81"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409"`);
        await queryRunner.query(`ALTER TABLE "userAddress" DROP CONSTRAINT "FK_8b251cbfcbf880bcdec80cf36c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da6114c85ab86bbb6c634cad4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5f8b003429a633008da82eb11"`);
        await queryRunner.query(`DROP TABLE "cart_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87570869d1d8035610899940a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_382cb147efdbee36ef28dfd62d"`);
        await queryRunner.query(`DROP TABLE "order_products_products"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TABLE "Order"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userAddress"`);
        await queryRunner.query(`DROP TABLE "paymentInfo"`);
        await queryRunner.query(`DROP TABLE "restaurantAddress"`);
        await queryRunner.query(`DROP TABLE "restaurantCategory"`);
        await queryRunner.query(`DROP TABLE "productCategory"`);
    }

}
