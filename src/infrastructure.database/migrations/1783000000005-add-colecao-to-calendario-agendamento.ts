import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColecaoToCalendarioAgendamento1783000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "calendario_agendamento",
      new TableColumn({
        name: "id_colecao_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "calendario_agendamento",
      new TableForeignKey({
        name: "fk_calendario_agendamento_colecao",
        columnNames: ["id_colecao_fk"],
        referencedTableName: "calendario_colecao",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("calendario_agendamento");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_colecao_fk") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("calendario_agendamento", foreignKey);
    }
    await queryRunner.dropColumn("calendario_agendamento", "id_colecao_fk");
  }
}
