import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCursoReferenceAtEstagio1779233405558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "estagio",
      new TableColumn({
        name: "id_curso_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "estagio",
      new TableForeignKey({
        name: "fk_estagio_curso",
        columnNames: ["id_curso_fk"],
        referencedTableName: "curso",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("estagio");
    const foreignKey = table?.foreignKeys.find((fk) => fk.name === "fk_estagio_curso");
    if (foreignKey) {
      await queryRunner.dropForeignKey("estagio", foreignKey);
    }

    await queryRunner.dropColumn("estagio", "id_curso_fk");
  }
}
