import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioLetivoDia1742516700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_letivo_dia",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data", type: "date", isNullable: false },
          { name: "dia_letivo", type: "boolean", isNullable: false },
          { name: "feriado", type: "boolean", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_letivo_dia__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo_dia')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_letivo_dia", true, true, true);
  }
}
