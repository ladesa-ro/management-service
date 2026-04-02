import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddImagemCapaToModalidadeAndNivelFormacao1775400001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Modalidade
    await queryRunner.addColumn(
      "modalidade",
      new TableColumn({
        name: "id_imagem_capa_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "modalidade",
      new TableForeignKey({
        name: "fk__modalidade__depende__imagem_capa",
        columnNames: ["id_imagem_capa_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "imagem",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );

    // NivelFormacao
    await queryRunner.addColumn(
      "nivel_formacao",
      new TableColumn({
        name: "id_imagem_capa_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "nivel_formacao",
      new TableForeignKey({
        name: "fk__nivel_formacao__depende__imagem_capa",
        columnNames: ["id_imagem_capa_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "imagem",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("nivel_formacao", "fk__nivel_formacao__depende__imagem_capa");
    await queryRunner.dropColumn("nivel_formacao", "id_imagem_capa_fk");

    await queryRunner.dropForeignKey("modalidade", "fk__modalidade__depende__imagem_capa");
    await queryRunner.dropColumn("modalidade", "id_imagem_capa_fk");
  }
}
