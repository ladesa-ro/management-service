import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesCalendario1700000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // calendario_letivo
    await queryRunner.createTable(
      new Table({
        name: "calendario_letivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "ano_letivo", type: "int", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_letivo__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
          {
            name: "fk__calendario_letivo__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo')`);

    // calendario_letivo_dia
    await queryRunner.createTable(
      new Table({
        name: "calendario_letivo_dia",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data", type: "date", isNullable: false },
          { name: "dia_letivo", type: "boolean", isNullable: false },
          { name: "feriado", type: "boolean", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_letivo_dia__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo_dia')`);

    // calendario_letivo_etapa
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

    // diario
    await queryRunner.createTable(
      new Table({
        name: "diario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "id_disciplina_fk", type: "uuid", isNullable: false },
          { name: "id_ambiente_padrao_fk", type: "uuid", isNullable: true },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__diario__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
          {
            name: "fk__diario__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
          {
            name: "fk__diario__depende__disciplina",
            columnNames: ["id_disciplina_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disciplina",
          },
          {
            name: "fk__diario__depende__ambiente",
            columnNames: ["id_ambiente_padrao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
            onDelete: "SET NULL",
          },
          {
            name: "fk__diario__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('diario')`);

    // diario_professor
    await queryRunner.createTable(
      new Table({
        name: "diario_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "situacao", type: "boolean", isNullable: false },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__diario_professor__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
          {
            name: "fk__diario_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('diario_professor')`);

    // diario_preferencia_agrupamento
    await queryRunner.createTable(
      new Table({
        name: "diario_preferencia_agrupamento",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "ativo", type: "boolean", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__diario_preferencia_agrupamento__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
        ],
      }),
    );

    // diario_preferencia_agrupamento_aulas
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diario_preferencia_agrupamento_aulas", true, true, true);
    await queryRunner.dropTable("diario_preferencia_agrupamento", true, true, true);
    await queryRunner.dropTable("diario_professor", true, true, true);
    await queryRunner.dropTable("diario", true, true, true);
    await queryRunner.dropTable("calendario_letivo_etapa", true, true, true);
    await queryRunner.dropTable("calendario_letivo_dia", true, true, true);
    await queryRunner.dropTable("calendario_letivo", true, true, true);
  }
}
