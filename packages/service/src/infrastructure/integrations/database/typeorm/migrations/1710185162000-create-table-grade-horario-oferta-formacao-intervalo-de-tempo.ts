import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "grade_horario_oferta_formacao_intervalo_de_tempo";
const tableNameSmall = "g_h_o_f_i_d_t";

export class CreateTableGradeHorarioOfertaFormacaoIntervaloDeTempo1710185162000 implements MigrationInterface {
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
            name: "id_grade_horario_oferta_formacao_fk",
            type: "uuid",
            isNullable: false,
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
            name: `fk__${tableNameSmall}__grade_horario_oferta_formacao`,
            columnNames: ["id_grade_horario_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "grade_horario_oferta_formacao",
          },
          {
            name: `fk__${tableNameSmall}__intervalo_de_tempo`,
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_${tableNameSmall}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
