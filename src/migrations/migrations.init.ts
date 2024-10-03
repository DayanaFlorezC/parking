import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrtionsInnit implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users1111 (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   // await queryRunner.query(`DROP TABLE users1111`);
  }
}
