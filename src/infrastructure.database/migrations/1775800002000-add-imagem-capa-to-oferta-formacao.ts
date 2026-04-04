import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddImagemCapaToOfertaFormacao1775800002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "oferta_formacao",
      new TableColumn({
        name: "id_imagem_capa_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "oferta_formacao",
      new TableForeignKey({
        name: "fk__oferta_formacao__depende__imagem_capa",
        columnNames: ["id_imagem_capa_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "imagem",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "oferta_formacao",
      "fk__oferta_formacao__depende__imagem_capa",
    );
    await queryRunner.dropColumn("oferta_formacao", "id_imagem_capa_fk");
  }
}
