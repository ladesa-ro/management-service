import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class DropTableHorarioAulaConfiguracao1775300003000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_aula_configuracao_item", true, true, true);
    await queryRunner.dropTable("horario_aula_configuracao", true, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "horario_aula_configuracao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "ativo", type: "boolean", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__horario_aula_configuracao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "horario_aula_configuracao_item",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
          { name: "id_horario_aula_configuracao_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__horario_aula__depende__horario_aula_configuracao",
            columnNames: ["id_horario_aula_configuracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_aula_configuracao",
          },
        ],
      }),
    );
  }
}
