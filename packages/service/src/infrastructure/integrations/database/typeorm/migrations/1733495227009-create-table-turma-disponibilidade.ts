import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "turma_disponibilidade";

export class CreateTableDisponibilidadeDia1733495227009 implements MigrationInterface {
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
            name: "id_disponibilidade_fk",
            type: "uuid",
            isNullable: false,
          },
          //
          {
            name: "id_turma_fk",
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
          //
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__turma`,
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
          {
            name: `fk__${tableName}__depende__disponibilidade`,
            columnNames: ["id_disponibilidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disponibilidade",
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
