import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "calendario_letivo";

export class CreateTableCalendarioLetivo1710185161829 implements MigrationInterface {
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
            name: "nome",
            type: "text",
            isNullable: false,
          },

          {
            name: "ano_letivo",
            type: "int",
            isNullable: false,
          },

          //
          {
            name: "id_campus_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_oferta_formacao_fk",
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
            name: `fk__${tableName}__depende__campus`,
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
          {
            name: `fk__${tableName}__depende__oferta_formacao`,
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
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
