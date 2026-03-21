import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableGerarHorarioCalendarioLetivo1742517360000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario_calendario_letivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_gerar_horario_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario_calendario_letivo__depende__gerar_horario",
            columnNames: ["id_gerar_horario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "gerar_horario",
          },
          {
            name: "fk__gerar_horario_calendario_letivo__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gerar_horario_calendario_letivo", true, true, true);
  }
}
