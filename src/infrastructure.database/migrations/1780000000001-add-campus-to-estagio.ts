import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCampusToEstagio1780000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "estagio",
      new TableColumn({
        name: "id_campus_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "estagio",
      new TableForeignKey({
        name: "fk_estagio_campus",
        columnNames: ["id_campus_fk"],
        referencedTableName: "campus",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("estagio");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_campus_fk") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("estagio", foreignKey);
    }
    await queryRunner.dropColumn("estagio", "id_campus_fk");
  }
}
