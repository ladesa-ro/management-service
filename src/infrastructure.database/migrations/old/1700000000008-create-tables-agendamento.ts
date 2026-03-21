import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesAgendamento1700000000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // calendario_agendamento
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

    // calendario_agendamento_diario
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

    // calendario_agendamento_oferta_formacao
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

    // calendario_agendamento_ambiente
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

    // calendario_agendamento_modalidade
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

    // calendario_agendamento_professor
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

    // calendario_agendamento_turma
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

    // calendario_agendamento_calendario_letivo
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
    await queryRunner.dropTable("calendario_agendamento", true, true, true);
  }
}
