import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618761628392 implements MigrationInterface {
    name = 'init1618761628392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vessel" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "phone" character varying NOT NULL, "companyId" integer, CONSTRAINT "UQ_3ba7a40dd2600910939d616746e" UNIQUE ("phone"), CONSTRAINT "PK_87cc5d99bd07c65028ddcc9c785" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "contract_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "status" "contract_status_enum" NOT NULL DEFAULT 'PENDING', "agencyId" integer, "vesselId" integer, "clientId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('SU', 'AGENT', 'CLIENT', 'GUEST')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying, "role" "user_role_enum" NOT NULL DEFAULT 'GUEST', CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agency" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "contractsId" integer, CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_clients_user" ("baseId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d1a6a96bd30dcb765eacb4e7265" PRIMARY KEY ("baseId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0cbc57a253050ba4247f76c115" ON "base_clients_user" ("baseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a46d74dc1e07bee711afba5f09" ON "base_clients_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "vessel" ADD CONSTRAINT "FK_7aff52fecd7f3eeab0b08607d76" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_ead651fbbffc79c0d361ba9eb43" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_55f94aa59dc146b1a88d727aa19" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_549fe94002a48f41e53ae210830" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agency" ADD CONSTRAINT "FK_fe0937db80aa7b4aad6311a7ff5" FOREIGN KEY ("contractsId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "base_clients_user" ADD CONSTRAINT "FK_0cbc57a253050ba4247f76c1159" FOREIGN KEY ("baseId") REFERENCES "base"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "base_clients_user" ADD CONSTRAINT "FK_a46d74dc1e07bee711afba5f091" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_clients_user" DROP CONSTRAINT "FK_a46d74dc1e07bee711afba5f091"`);
        await queryRunner.query(`ALTER TABLE "base_clients_user" DROP CONSTRAINT "FK_0cbc57a253050ba4247f76c1159"`);
        await queryRunner.query(`ALTER TABLE "agency" DROP CONSTRAINT "FK_fe0937db80aa7b4aad6311a7ff5"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_549fe94002a48f41e53ae210830"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_55f94aa59dc146b1a88d727aa19"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_ead651fbbffc79c0d361ba9eb43"`);
        await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_7aff52fecd7f3eeab0b08607d76"`);
        await queryRunner.query(`DROP INDEX "IDX_a46d74dc1e07bee711afba5f09"`);
        await queryRunner.query(`DROP INDEX "IDX_0cbc57a253050ba4247f76c115"`);
        await queryRunner.query(`DROP TABLE "base_clients_user"`);
        await queryRunner.query(`DROP TABLE "agency"`);
        await queryRunner.query(`DROP TABLE "base"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TYPE "contract_status_enum"`);
        await queryRunner.query(`DROP TABLE "vessel"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
