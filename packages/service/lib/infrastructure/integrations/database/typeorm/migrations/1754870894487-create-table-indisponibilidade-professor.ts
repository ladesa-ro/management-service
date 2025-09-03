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
            name: "id_perfil_fk",
            type: "uuid",
            isNullable: false,
          },
          // ======================================================================
          {
            name: "segunda",
            type: "time",
            isNullable: true,
          },
          {
            name: "terca",
            type: "time",
            isNullable: true,
          },
          {
            name: "quarta",
            type: "time",
            isNullable: true,
          },
          {
            name: "quinta",
            type: "time",
            isNullable: true,
          },
          {
            name: "sexta",
            type: "time",
            isNullable: true,
          },
          {
            name: "sabado",
            type: "time",
            isNullable: true,
          },
          {
            name: "domingo",
            type: "time",
            isNullable: true,
          },
          // ======================================================================
          {
            name: "motivo",
            type: "varchar",
            length: "90",
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
            name: `fk__${tableName}__depende__perfil`,
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS change_date_updated_table_${tableName} ON ${tableName};
      CREATE TRIGGER change_date_updated_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
