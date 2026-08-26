import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTablesEmpresaAvaliacaoAndScore2026082600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Tabela empresa_avaliacao
    await queryRunner.createTable(
      new Table({
        name: "empresa_avaliacao",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_estagiario_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "rating",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "comentario",
            type: "varchar",
            length: "2000",
            isNullable: true,
          },
          {
            name: "relevance_score",
            type: "decimal",
            precision: 10,
            scale: 4,
            isNullable: false,
            default: 0,
          },
          {
            name: "likes_count",
            type: "integer",
            isNullable: false,
            default: 0,
          },
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
            name: "fk__empresa_avaliacao__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedTableName: "empresa",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__empresa_avaliacao__depende__estagiario",
            columnNames: ["id_estagiario_fk"],
            referencedTableName: "estagiario",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
        ],
        checks: [
          {
            name: "chk__empresa_avaliacao__rating_valido",
            expression: "rating >= 1 AND rating <= 5",
          },
        ],
      }),
    );

    // Unicidade de avaliação ativa por estagiário por empresa
    await queryRunner.createIndex(
      "empresa_avaliacao",
      new TableIndex({
        name: "uq__empresa_avaliacao__empresa_estagiario",
        columnNames: ["id_empresa_fk", "id_estagiario_fk"],
        isUnique: true,
        where: "date_deleted IS NULL",
      }),
    );

    // Índice para busca e ordenação por relevância/data
    await queryRunner.createIndex(
      "empresa_avaliacao",
      new TableIndex({
        name: "idx__empresa_avaliacao__empresa_relevancia",
        columnNames: ["id_empresa_fk", "relevance_score", "date_created"],
      }),
    );

    await queryRunner.createIndex(
      "empresa_avaliacao",
      new TableIndex({
        name: "idx__empresa_avaliacao__empresa_data",
        columnNames: ["id_empresa_fk", "date_created"],
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('empresa_avaliacao')`);

    // 2. Tabela empresa_avaliacao_curtida
    await queryRunner.createTable(
      new Table({
        name: "empresa_avaliacao_curtida",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_avaliacao_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_usuario_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "date_created",
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
            name: "fk__empresa_avaliacao_curtida__depende__avaliacao",
            columnNames: ["id_empresa_avaliacao_fk"],
            referencedTableName: "empresa_avaliacao",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__empresa_avaliacao_curtida__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );

    // Unicidade de curtida ativa por usuário por avaliação
    await queryRunner.createIndex(
      "empresa_avaliacao_curtida",
      new TableIndex({
        name: "uq__empresa_avaliacao_curtida__avaliacao_usuario",
        columnNames: ["id_empresa_avaliacao_fk", "id_usuario_fk"],
        isUnique: true,
        where: "date_deleted IS NULL",
      }),
    );

    await queryRunner.createIndex(
      "empresa_avaliacao_curtida",
      new TableIndex({
        name: "idx__empresa_avaliacao_curtida__avaliacao",
        columnNames: ["id_empresa_avaliacao_fk"],
      }),
    );

    // 3. Tabela empresa_avaliacao_historico (auditoria de alterações)
    await queryRunner.createTable(
      new Table({
        name: "empresa_avaliacao_historico",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_avaliacao_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_usuario_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "rating_anterior",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "rating_novo",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "comentario_anterior",
            type: "varchar",
            length: "2000",
            isNullable: true,
          },
          {
            name: "comentario_novo",
            type: "varchar",
            length: "2000",
            isNullable: true,
          },
          {
            name: "acao",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            name: "fk__empresa_avaliacao_historico__depende__avaliacao",
            columnNames: ["id_empresa_avaliacao_fk"],
            referencedTableName: "empresa_avaliacao",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__empresa_avaliacao_historico__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "empresa_avaliacao_historico",
      new TableIndex({
        name: "idx__empresa_avaliacao_historico__avaliacao",
        columnNames: ["id_empresa_avaliacao_fk", "date_created"],
      }),
    );

    // 4. Tabela empresa_score
    await queryRunner.createTable(
      new Table({
        name: "empresa_score",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "score",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: "average_rating",
            type: "decimal",
            precision: 3,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: "total_reviews",
            type: "integer",
            isNullable: false,
            default: 0,
          },
          {
            name: "distribution",
            type: "jsonb",
            isNullable: false,
            default: `'{"1":0,"2":0,"3":0,"4":0,"5":0}'::jsonb`,
          },
          {
            name: "score_version",
            type: "integer",
            isNullable: false,
            default: 1,
          },
          {
            name: "indicators_json",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "calculated_at",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
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
            name: "fk__empresa_score__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedTableName: "empresa",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "empresa_score",
      new TableIndex({
        name: "uq__empresa_score__empresa",
        columnNames: ["id_empresa_fk"],
        isUnique: true,
        where: "date_deleted IS NULL",
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('empresa_score')`);

    // 5. Tabela empresa_score_historico
    await queryRunner.createTable(
      new Table({
        name: "empresa_score_historico",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "score",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: "average_rating",
            type: "decimal",
            precision: 3,
            scale: 2,
            isNullable: false,
          },
          {
            name: "total_reviews",
            type: "integer",
            isNullable: false,
          },
          {
            name: "score_version",
            type: "integer",
            isNullable: false,
          },
          {
            name: "indicators_json",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "calculated_at",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            name: "fk__empresa_score_historico__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedTableName: "empresa",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "empresa_score_historico",
      new TableIndex({
        name: "idx__empresa_score_historico__empresa_data",
        columnNames: ["id_empresa_fk", "calculated_at"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("empresa_score_historico", true, true, true);
    await queryRunner.dropTable("empresa_score", true, true, true);
    await queryRunner.dropTable("empresa_avaliacao_historico", true, true, true);
    await queryRunner.dropTable("empresa_avaliacao_curtida", true, true, true);
    await queryRunner.dropTable("empresa_avaliacao", true, true, true);
  }
}
