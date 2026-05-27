import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddFotoEmpresa1780000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "empresa",
      new TableColumn({
        name: "id_foto_empresa_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "empresa",
      new TableForeignKey({
        name: "fk_empresa_foto_empresa",
        columnNames: ["id_foto_empresa_fk"],
        referencedTableName: "imagem",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("empresa");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_foto_empresa_fk") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("empresa", foreignKey);
    }
    await queryRunner.dropColumn("empresa", "id_foto_empresa_fk");
  }
}
