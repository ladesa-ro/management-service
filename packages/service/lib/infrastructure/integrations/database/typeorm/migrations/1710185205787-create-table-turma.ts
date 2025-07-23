import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "turma";

export class CreateTableTurma1710185205787 implements MigrationInterface {
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
            name: "periodo",
            type: "text",
            isNullable: false,
          },

          //

          {
            name: "id_ambiente_padrao_aula_fk",
            type: "uuid",
            isNullable: true,
          },

          {
            name: "id_curso_fk",
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
            name: `fk__${tableName}__depende__ambiente`,
            columnNames: ["id_ambiente_padrao_aula_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
          {
            name: `fk__${tableName}__depende__curso`,
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
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
