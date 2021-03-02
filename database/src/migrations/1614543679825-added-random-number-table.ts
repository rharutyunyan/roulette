import {MigrationInterface, QueryRunner} from "typeorm";

export class addedRandomNumberTable1614543679825 implements MigrationInterface {
    name = 'addedRandomNumberTable1614543679825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "random_number" ("id" SERIAL NOT NULL, "random_number" integer NOT NULL, CONSTRAINT "PK_e06511e88b2fdd8624e9cafbf75" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "random_number"`);
    }

}
