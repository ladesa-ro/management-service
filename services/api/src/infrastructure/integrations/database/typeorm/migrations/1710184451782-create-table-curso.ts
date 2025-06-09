import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "curso";

export class CreateTableCurso1710184451782 implements MigrationInterface {
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
            name: "nome_abreviado",
            type: "text",
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
          {
            name: "id_imagem_capa_fk",
            type: "uuid",
            isNullable: true,
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
          {
            name: `fk__${tableName}__possui__imagem_capa`,
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
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
