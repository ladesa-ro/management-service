import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class CreateColumIdAmbienteFk1762102985075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "evento",
      new TableColumn({
        name: "id_ambiente_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "evento",
      new TableForeignKey({
        name: "fk__evento__pertence__ambiente",
        columnNames: ["id_ambiente_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "ambiente",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("evento", "fk__evento__pertence__ambiente");
    await queryRunner.dropColumn("evento", "id_ambiente_fk");
  }
}
