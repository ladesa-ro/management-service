import { type MigrationInterface, type QueryRunner, TableColumn } from "typeorm";

export class AddCargaMaximaSemanalToPerfil1783000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "perfil",
      new TableColumn({
        name: "carga_maxima_semanal",
        type: "integer",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("perfil", "carga_maxima_semanal");
  }
}
