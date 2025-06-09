import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "reserva";

export class CreateTableReserva1710183953950 implements MigrationInterface {
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
            type: "text",
            isNullable: false,
          },

          {
            name: "motivo",
            type: "text",
            isNullable: true,
          },

          {
            name: "tipo",
            type: "text",
            isNullable: true,
          },

          {
            name: "rrule",
            type: "text",
            isNullable: false,
          },

          //

          {
            name: "id_ambiente_fk",
            type: "uuid",
            isNullable: false,
          },

          {
            name: "id_usuario_fk",
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
            name: `fk__${tableName}__depende__ambiente`,
            columnNames: ["id_ambiente_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
          {
            name: `fk__${tableName}__depende__usuario`,
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
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
