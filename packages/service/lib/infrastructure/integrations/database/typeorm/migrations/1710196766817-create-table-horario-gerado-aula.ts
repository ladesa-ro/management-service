import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "horario_gerado_aula";

export class CreateTableHorarioGeradoAula1710196766817 implements MigrationInterface {
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
            name: "data",
            type: "date",
            isNullable: false,
          },

          {
            name: "id_diario_professor_fk",
            type: "uuid",
            isNullable: true,
          },

          {
            name: "id_horario_gerado_fk",
            type: "uuid",
            isNullable: true,
          },

          {
            name: "id_intervalo_de_tempo_fk",
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
            name: `fk__${tableName}__depende__diario_professor`,
            columnNames: ["id_diario_professor_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario_professor",
          },

          {
            name: `fk__${tableName}__depende__horario_gerado`,
            columnNames: ["id_horario_gerado_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_gerado",
          },

          {
            name: `fk__${tableName}__depende__intervalo_de_tempo`,
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
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
