import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHorarioAulaConfiguracao1742517060000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_aula_configuracao", true, true, true);
  }
}
