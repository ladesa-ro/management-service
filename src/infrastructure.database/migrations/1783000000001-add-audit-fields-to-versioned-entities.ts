import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const TABELAS = ["calendario_agendamento", "grade_horaria", "turma_disponibilidade_configuracao"];

export class AddAuditFieldsToVersionedEntities1783000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const tabela of TABELAS) {
      await queryRunner.addColumn(
        tabela,
        new TableColumn({
          name: "id_autor_fk",
          type: "uuid",
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        tabela,
        new TableForeignKey({
          name: `fk_${tabela}_autor`,
          columnNames: ["id_autor_fk"],
          referencedTableName: "usuario",
          referencedColumnNames: ["id"],
          onDelete: "SET NULL",
        }),
      );

      await queryRunner.addColumn(
        tabela,
        new TableColumn({
          name: "motivo",
          type: "text",
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const tabela of TABELAS) {
      const table = await queryRunner.getTable(tabela);
      const foreignKey = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("id_autor_fk") !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey(tabela, foreignKey);
      }
      await queryRunner.dropColumn(tabela, "id_autor_fk");
      await queryRunner.dropColumn(tabela, "motivo");
    }
  }
}
