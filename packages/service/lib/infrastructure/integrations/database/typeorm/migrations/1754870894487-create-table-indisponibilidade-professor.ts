import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "indisponibilidade_professor";
export class CreateTableIndisponibilidadeProfessor1754870894487 implements MigrationInterface {
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
            name: "id_professor_perfil_fk",
            type: "uuid",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "indisponibilidade_inicio",
            type: "timestamptz",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "indisponibilidade_termino",
            type: "timestamptz",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "motivo",
            type: "varchar(90)", 
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_updated",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },

          {
            name: "date_deleted",
            type: "timestamptz",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__professor`,
            columnNames: ["id_professor_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
