import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioIndisponibilidadeProfessor1783000000008
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_indisponibilidade_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          {
            name: "tipo",
            type: "enum",
            enum: ["BLOQUEIO", "PREFERENCIA"],
            isNullable: false,
          },
          { name: "dia_semana", type: "smallint", isNullable: true },
          { name: "data", type: "date", isNullable: true },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
          { name: "motivo", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_indisponibilidade_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedTableName: "perfil",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        checks: [
          {
            name: "chk__calendario_indisponibilidade_professor__regra_ou_excecao",
            expression:
              "(dia_semana IS NOT NULL AND data IS NULL) OR (dia_semana IS NULL AND data IS NOT NULL)",
          },
          {
            name: "chk__calendario_indisponibilidade_professor__fim_maior_inicio",
            expression: "fim > inicio",
          },
        ],
      }),
    );

    await queryRunner.query(
      `CALL ensure_change_date_trigger('calendario_indisponibilidade_professor')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_indisponibilidade_professor", true, true, true);
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_indisponibilidade_professor_tipo_enum"`);
  }
}
