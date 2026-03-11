import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class DropObsoleteTables1773000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_gerado_aula", true, true, true);
    await queryRunner.dropTable("disponibilidade_dia", true, true, true);
    await queryRunner.dropTable("turma_disponibilidade", true, true, true);
    await queryRunner.dropTable("grade_horario_oferta_formacao_intervalo_de_tempo", true, true, true);
    await queryRunner.dropTable("aula", true, true, true);
    await queryRunner.dropTable("reserva", true, true, true);
    await queryRunner.dropTable("etapa", true, true, true);
    await queryRunner.dropTable("evento", true, true, true);
    await queryRunner.dropTable("horario_gerado", true, true, true);
    await queryRunner.dropTable("grade_horario_oferta_formacao", true, true, true);
    await queryRunner.dropTable("disponibilidade", true, true, true);
    await queryRunner.dropTable("indisponibilidade_professor", true, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "indisponibilidade_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__indisponibilidade_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "disponibilidade",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "timestamptz", isNullable: false },
          { name: "data_fim", type: "timestamptz", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "grade_horario_oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__grade_horario_oferta_formacao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
          {
            name: "fk__grade_horario_oferta_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "horario_gerado",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__horario_gerado__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "etapa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "numero", type: "int", isNullable: false },
          { name: "data_inicio", type: "timestamptz", isNullable: false },
          { name: "data_termino", type: "timestamptz", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__etapa__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "evento",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "data_inicio", type: "timestamptz", isNullable: false },
          { name: "data_termino", type: "timestamptz", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "id_ambiente_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__evento__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
          {
            name: "fk__evento__depende__ambiente",
            columnNames: ["id_ambiente_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "reserva",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "situacao", type: "text", isNullable: false },
          { name: "motivo", type: "text", isNullable: true },
          { name: "tipo", type: "text", isNullable: true },
          { name: "data_inicio", type: "timestamptz", isNullable: false },
          { name: "data_termino", type: "timestamptz", isNullable: true },
          { name: "id_ambiente_fk", type: "uuid", isNullable: false },
          { name: "id_usuario_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__reserva__depende__ambiente",
            columnNames: ["id_ambiente_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
          {
            name: "fk__reserva__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "aula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "formato", type: "text", isNullable: true },
          { name: "data", type: "date", isNullable: false },
          { name: "id_intervalo_de_tempo_fk", type: "uuid", isNullable: false },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "id_ambiente_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__aula__depende__intervalo_de_tempo",
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
          {
            name: "fk__aula__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
          {
            name: "fk__aula__depende__ambiente",
            columnNames: ["id_ambiente_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "grade_horario_oferta_formacao_intervalo_de_tempo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_grade_horario_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "id_intervalo_de_tempo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__grade_horario_oferta_formacao_intervalo_de_tempo__depende__grade_horario_oferta_formacao",
            columnNames: ["id_grade_horario_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "grade_horario_oferta_formacao",
          },
          {
            name: "fk__grade_horario_oferta_formacao_intervalo_de_tempo__depende__intervalo_de_tempo",
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "turma_disponibilidade",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_disponibilidade_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__turma_disponibilidade__depende__disponibilidade",
            columnNames: ["id_disponibilidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disponibilidade",
          },
          {
            name: "fk__turma_disponibilidade__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "disponibilidade_dia",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "dia_semana_iso", type: "int", isNullable: false },
          { name: "id_disponibilidade_fk", type: "uuid", isNullable: false },
          { name: "id_intervalo_de_tempo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__disponibilidade_dia__depende__disponibilidade",
            columnNames: ["id_disponibilidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disponibilidade",
          },
          {
            name: "fk__disponibilidade_dia__depende__intervalo_de_tempo",
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "horario_gerado_aula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_horario_gerado_fk", type: "uuid", isNullable: false },
          { name: "id_intervalo_de_tempo_fk", type: "uuid", isNullable: false },
          { name: "id_diario_professor_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__horario_gerado_aula__depende__horario_gerado",
            columnNames: ["id_horario_gerado_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_gerado",
          },
          {
            name: "fk__horario_gerado_aula__depende__intervalo_de_tempo",
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
          {
            name: "fk__horario_gerado_aula__depende__diario_professor",
            columnNames: ["id_diario_professor_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario_professor",
          },
        ],
      }),
    );
  }
}
