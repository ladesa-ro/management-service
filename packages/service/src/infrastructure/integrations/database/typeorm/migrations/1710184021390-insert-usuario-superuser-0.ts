import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUsuarioSuperuser0_1710184021390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "usuario"
        ("id", "nome", "matricula_siape", "email", "is_super_user")
      VALUES
        ('17ed5d7e-79d4-4cfd-811c-263247dc4511', 'Administrador', '0', 'admin@sisgha.com.br', TRUE);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "usuario" WHERE "id" = '17ed5d7e-79d4-4cfd-811c-263247dc4511';
    `);
  }
}
