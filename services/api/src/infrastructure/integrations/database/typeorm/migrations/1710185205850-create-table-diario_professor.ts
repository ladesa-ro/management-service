import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "diario_professor";

export class CreateTableDiarioProfessor1710185205850 implements MigrationInterface {
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

          //

          {
            name: "situacao",
            type: "bool",
            isNullable: false,
          },

          {
            name: "id_diario_fk",
            type: "uuid",
            isNullable: false,
          },
          //
          {
            name: "id_perfil_fk",
            type: "uuid",
            isNullable: false,
          },
          //
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
            name: `fk__${tableName}__relaciona__diario`,
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
          {
            name: `fk__${tableName}__relaciona__perfil`,
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
        ],
      }),
    );

    await queryRunner.query(`
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
