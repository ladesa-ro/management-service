import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioColecao1783000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_colecao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_dono_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: true },
          { name: "nome", type: "text", isNullable: false },
          { name: "cor", type: "text", isNullable: true },
          {
            name: "visibilidade",
            type: "enum",
            enum: ["PRIVADA", "CAMPUS", "PUBLICA"],
            default: "'PRIVADA'",
          },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_colecao__depende__usuario",
            columnNames: ["id_dono_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk__calendario_colecao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedTableName: "campus",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
        checks: [
          {
            name: "chk__calendario_colecao__campus_obrigatorio_se_visibilidade_campus",
            expression: "(visibilidade != 'CAMPUS') OR (id_campus_fk IS NOT NULL)",
          },
        ],
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_colecao')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_colecao", true, true, true);
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_colecao_visibilidade_enum"`);
  }
}
