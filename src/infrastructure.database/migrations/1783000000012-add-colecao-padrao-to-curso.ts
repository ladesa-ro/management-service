import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColecaoPadraoToCurso1783000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "curso",
      new TableColumn({
        name: "id_colecao_padrao_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "curso",
      new TableForeignKey({
        name: "fk_curso_colecao_padrao",
        columnNames: ["id_colecao_padrao_fk"],
        referencedTableName: "calendario_colecao",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("curso");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_colecao_padrao_fk") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("curso", foreignKey);
    }
    await queryRunner.dropColumn("curso", "id_colecao_padrao_fk");
  }
}
