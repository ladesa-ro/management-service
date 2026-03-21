import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHorarioEstagio1742518140000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "horario_estagio",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_estagio_fk", type: "uuid", isNullable: false },
          { name: "dia_semana", type: "int", isNullable: false },
          { name: "hora_inicio", type: "time", isNullable: false },
          { name: "hora_fim", type: "time", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__horario_estagio__depende__estagio",
            columnNames: ["id_estagio_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "estagio",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('horario_estagio')`);
    await queryRunner.query(
      `CREATE INDEX "IDX_78889e4079ad24a287ae4f8ba8" ON "horario_estagio" ("id_estagio_fk")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_estagio", true, true, true);
  }
}
