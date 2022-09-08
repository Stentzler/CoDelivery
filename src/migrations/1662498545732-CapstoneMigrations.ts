import { MigrationInterface, QueryRunner } from "typeorm";

export class CapstoneMigrations1662498545732 implements MigrationInterface {
    name = 'CapstoneMigrations1662498545732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(12,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_8f2bbb7ead10e637c55e0c86b19" UNIQUE ("name"), CONSTRAINT "PK_1012430e55dad863919f1221a72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantAddress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_72548848921cb4e190700ff27f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurantCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_592d6e825deb2b7555df74ae5dc" UNIQUE ("name"), CONSTRAINT "PK_f2fae4b1da538f2dc5777efb7c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "description" character varying(256) NOT NULL, "isRestaurant" boolean NOT NULL DEFAULT true, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "cnpj" character varying(60) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "restaurantAddressId" uuid, "categoryId" uuid, CONSTRAINT "UQ_9315499c5bf5ead89fbb877a0b5" UNIQUE ("name"), CONSTRAINT "UQ_d055cac5f0f06d57b0a3b1fe574" UNIQUE ("email"), CONSTRAINT "UQ_90c4dae30ae32bbf9c92c2907b7" UNIQUE ("cnpj"), CONSTRAINT "REL_81f2aec773c743823ef2b189f9" UNIQUE ("restaurantAddressId"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "description" character varying(256) NOT NULL, "price" numeric(12,2) NOT NULL, "img_url" character varying(256) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, "restaurantId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addressInfo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(60) NOT NULL, "number" character varying(10) NOT NULL, "zipCode" character varying(20) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_3b676ed29dcfe47839dae288a78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paymentInfo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying(60) NOT NULL, "cardNo" character varying(20) NOT NULL, "cvvNo" character varying(10) NOT NULL, "expireDate" character varying(20) NOT NULL, "cpf" character varying(20) NOT NULL, CONSTRAINT "PK_aa67d95006c6ffaa5cb3b3fcfbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(60) NOT NULL, "userName" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "isRestaurant" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressInfoId" uuid, "paymentInfoId" uuid, "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_cfef3da85122ffaa461b873c05" UNIQUE ("addressInfoId"), CONSTRAINT "REL_8cd3b57fedc2bc5eccd61ee240" UNIQUE ("paymentInfoId"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_81f2aec773c743823ef2b189f94" FOREIGN KEY ("restaurantAddressId") REFERENCES "restaurantAddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1" FOREIGN KEY ("categoryId") REFERENCES "restaurantCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "productCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cfef3da85122ffaa461b873c05d" FOREIGN KEY ("addressInfoId") REFERENCES "addressInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409" FOREIGN KEY ("paymentInfoId") REFERENCES "paymentInfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cfef3da85122ffaa461b873c05d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_81f2aec773c743823ef2b189f94"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "paymentInfo"`);
        await queryRunner.query(`DROP TABLE "addressInfo"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TABLE "restaurantCategory"`);
        await queryRunner.query(`DROP TABLE "restaurantAddress"`);
        await queryRunner.query(`DROP TABLE "productCategory"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
