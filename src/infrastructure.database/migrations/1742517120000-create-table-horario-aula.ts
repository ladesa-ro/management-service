import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHorarioAula1742517120000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "horario_aula",
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_aula", true, true, true);
  }
}
