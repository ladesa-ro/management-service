import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableGerarHorarioOfertaFormacao1742517300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario_oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_gerar_horario_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario_oferta_formacao__depende__gerar_horario",
            columnNames: ["id_gerar_horario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "gerar_horario",
          },
          {
            name: "fk__gerar_horario_oferta_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gerar_horario_oferta_formacao", true, true, true);
  }
}
