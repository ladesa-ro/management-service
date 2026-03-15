import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesHorario1700000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // horario_aula_configuracao
    await queryRunner.createTable(
      new Table({
        name: "horario_aula_configuracao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "ativo", type: "boolean", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__horario_aula_configuracao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );

    // horario_aula
    await queryRunner.createTable(
      new Table({
        name: "horario_aula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
          { name: "id_horario_aula_configuracao_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__horario_aula__depende__horario_aula_configuracao",
            columnNames: ["id_horario_aula_configuracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_aula_configuracao",
          },
        ],
      }),
    );

    // turma_horario_aula
    await queryRunner.createTable(
      new Table({
        name: "turma_horario_aula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_horario_aula_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__turma_horario_aula__depende__horario_aula",
            columnNames: ["id_horario_aula_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_aula",
          },
          {
            name: "fk__turma_horario_aula__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );

    // gerar_horario
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "status", type: "gerar_horario_status", isNullable: false },
          { name: "duracao", type: "gerar_horario_duracao", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_termino", type: "date", isNullable: true },
          { name: "requisicao_gerador", type: "jsonb", isNullable: true },
          { name: "resposta_gerador", type: "jsonb", isNullable: true },
          { name: "id_usuario_geracao_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario__depende__usuario",
            columnNames: ["id_usuario_geracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
        ],
      }),
    );

    // gerar_horario_oferta_formacao
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario_oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_gerar_horario_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario_oferta_formacao__depende__gerar_horario",
            columnNames: ["id_gerar_horario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "gerar_horario",
          },
          {
            name: "fk__gerar_horario_oferta_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );

    // gerar_horario_calendario_letivo
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario_calendario_letivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_gerar_horario_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario_calendario_letivo__depende__gerar_horario",
            columnNames: ["id_gerar_horario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "gerar_horario",
          },
          {
            name: "fk__gerar_horario_calendario_letivo__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gerar_horario_calendario_letivo", true, true, true);
    await queryRunner.dropTable("gerar_horario_oferta_formacao", true, true, true);
    await queryRunner.dropTable("gerar_horario", true, true, true);
    await queryRunner.dropTable("turma_horario_aula", true, true, true);
    await queryRunner.dropTable("horario_aula", true, true, true);
    await queryRunner.dropTable("horario_aula_configuracao", true, true, true);
  }
}
