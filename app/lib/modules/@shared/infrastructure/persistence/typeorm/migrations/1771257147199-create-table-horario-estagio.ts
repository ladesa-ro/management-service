import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "horario_estagio";

export class CreateTableHorarioEstagio1771248750919
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_estagio_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "dia_semana",
            type: "integer",
            isNullable: false,
          },
          {
            name: "hora_inicio",
            type: "time",
            isNullable: false,
          },
          {
            name: "hora_fim",
            type: "time",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_estagio_fk"],
            referencedTableName: "estagio",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        indices: [
          {
            columnNames: ["id_estagio_fk"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
