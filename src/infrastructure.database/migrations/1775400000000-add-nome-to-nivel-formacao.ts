import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNomeToNivelFormacao1775400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "nivel_formacao",
      new TableColumn({
        name: "nome",
        type: "text",
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      UPDATE nivel_formacao
      SET nome = slug
      WHERE nome IS NULL;
    `);

    await queryRunner.changeColumn(
      "nivel_formacao",
      "nome",
      new TableColumn({
        name: "nome",
        type: "text",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("nivel_formacao", "nome");
  }
}
