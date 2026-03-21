import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesAcademico1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // modalidade
    await queryRunner.createTable(
      new Table({
        name: "modalidade",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "slug", type: "text", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('modalidade')`);

    // nivel_formacao
    await queryRunner.createTable(
      new Table({
        name: "nivel_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "slug", type: "text", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('nivel_formacao')`);

    // oferta_formacao
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "apelido", type: "text", isNullable: false },
          { name: "duracao_periodo_em_meses", type: "integer", isNullable: true },
          { name: "id_modalidade_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao__depende__modalidade",
            columnNames: ["id_modalidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "modalidade",
          },
          {
            name: "fk__oferta_formacao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao')`);

    // oferta_formacao_nivel_formacao
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_nivel_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_nivel_formacao_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_nivel_formacao__depende__nivel_formacao",
            columnNames: ["id_nivel_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "nivel_formacao",
          },
          {
            name: "fk__oferta_formacao_nivel_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao_nivel_formacao')`);

    // oferta_formacao_periodo
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

    // oferta_formacao_periodo_etapa
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

    // curso
    await queryRunner.createTable(
      new Table({
        name: "curso",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "nome_abreviado", type: "text", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__curso__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
          {
            name: "fk__curso__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
          {
            name: "fk__curso__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('curso')`);

    // disciplina
    await queryRunner.createTable(
      new Table({
        name: "disciplina",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "nome_abreviado", type: "text", isNullable: false },
          { name: "carga_horaria", type: "int", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__disciplina__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('disciplina')`);

    // turma
    await queryRunner.createTable(
      new Table({
        name: "turma",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "periodo", type: "text", isNullable: false },
          { name: "id_ambiente_padrao_aula_fk", type: "uuid", isNullable: true },
          { name: "id_curso_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__turma__depende__ambiente",
            columnNames: ["id_ambiente_padrao_aula_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
            onDelete: "SET NULL",
          },
          {
            name: "fk__turma__depende__curso",
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
          },
          {
            name: "fk__turma__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('turma')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma", true, true, true);
    await queryRunner.dropTable("disciplina", true, true, true);
    await queryRunner.dropTable("curso", true, true, true);
    await queryRunner.dropTable("oferta_formacao_periodo_etapa", true, true, true);
    await queryRunner.dropTable("oferta_formacao_periodo", true, true, true);
    await queryRunner.dropTable("oferta_formacao_nivel_formacao", true, true, true);
    await queryRunner.dropTable("oferta_formacao", true, true, true);
    await queryRunner.dropTable("nivel_formacao", true, true, true);
    await queryRunner.dropTable("modalidade", true, true, true);
  }
}
