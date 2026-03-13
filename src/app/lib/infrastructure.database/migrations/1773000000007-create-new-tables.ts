import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNewTables1773000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. gerar_horario
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

    // 2. horario_aula_configuracao
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

    // 3. horario_aula
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

    // 4. calendario_agendamento
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "tipo", type: "calendario_agendamento_tipo", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "dia_inteiro", type: "boolean", isNullable: false },
          { name: "horario_inicio", type: "time", isNullable: false },
          { name: "horario_fim", type: "time", isNullable: false },
          { name: "repeticao", type: "text", isNullable: true },
          { name: "nome", type: "text", isNullable: true },
          { name: "cor", type: "text", isNullable: true },
          { name: "status", type: "calendario_agendamento_status", isNullable: true },
        ],
      }),
    );

    // 5. oferta_formacao_periodo
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_periodo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "numero_periodo", type: "integer", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_periodo__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );

    // 6. oferta_formacao_periodo_etapa
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_periodo_etapa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_oferta_formacao_periodo_fk", type: "uuid", isNullable: false },
          { name: "nome", type: "text", isNullable: false },
          { name: "cor", type: "text", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_periodo_etapa__depende__oferta_formacao_periodo",
            columnNames: ["id_oferta_formacao_periodo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao_periodo",
          },
        ],
      }),
    );

    // 7. calendario_letivo_etapa
    await queryRunner.createTable(
      new Table({
        name: "calendario_letivo_etapa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_termino", type: "date", isNullable: false },
          { name: "id_oferta_formacao_periodo_etapa_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_letivo_etapa__depende__oferta_formacao_periodo_etapa",
            columnNames: ["id_oferta_formacao_periodo_etapa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao_periodo_etapa",
          },
          {
            name: "fk__calendario_letivo_etapa__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo_etapa')`);

    // 8. diario_preferencia_agrupamento_aulas
    await queryRunner.createTable(
      new Table({
        name: "diario_preferencia_agrupamento_aulas",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "dia_semana", type: "integer", isNullable: true },
          { name: "aulas_seguidas", type: "integer", isNullable: false },
          { name: "horario_inicio", type: "time", isNullable: true },
          { name: "horario_termino", type: "time", isNullable: true },
          { name: "id_diario_preferencia_agrupamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__diario_preferencia_agrupamento_aulas__depende__diario_preferencia_agrupamento",
            columnNames: ["id_diario_preferencia_agrupamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario_preferencia_agrupamento",
          },
        ],
      }),
    );

    // 9. turma_horario_aula
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

    // 10. gerar_horario_oferta_formacao
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

    // 11. calendario_agendamento_* junction tables
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_diario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_diario__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
          {
            name: "fk__calendario_agendamento_diario__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_oferta_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
          {
            name: "fk__calendario_agendamento_oferta_formacao__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_ambiente",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_ambiente_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_ambiente__depende__ambiente",
            columnNames: ["id_ambiente_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
          {
            name: "fk__calendario_agendamento_ambiente__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_modalidade",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_modalidade_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_modalidade__depende__modalidade",
            columnNames: ["id_modalidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "modalidade",
          },
          {
            name: "fk__calendario_agendamento_modalidade__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
          {
            name: "fk__calendario_agendamento_professor__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_turma",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_turma__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
          {
            name: "fk__calendario_agendamento_turma__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_calendario_letivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__cacl__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
          {
            name: "fk__cacl__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_agendamento_calendario_letivo", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_turma", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_professor", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_modalidade", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_ambiente", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_oferta_formacao", true, true, true);
    await queryRunner.dropTable("calendario_agendamento_diario", true, true, true);
    await queryRunner.dropTable("gerar_horario_oferta_formacao", true, true, true);
    await queryRunner.dropTable("turma_horario_aula", true, true, true);
    await queryRunner.dropTable("diario_preferencia_agrupamento_aulas", true, true, true);
    await queryRunner.dropTable("calendario_letivo_etapa", true, true, true);
    await queryRunner.dropTable("oferta_formacao_periodo_etapa", true, true, true);
    await queryRunner.dropTable("oferta_formacao_periodo", true, true, true);
    await queryRunner.dropTable("calendario_agendamento", true, true, true);
    await queryRunner.dropTable("horario_aula", true, true, true);
    await queryRunner.dropTable("horario_aula_configuracao", true, true, true);
    await queryRunner.dropTable("gerar_horario", true, true, true);
  }
}
