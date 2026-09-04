import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstagioSolicitacao1783000000020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estagio_solicitacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          {
            name: "tipo",
            type: "enum",
            enum: ["INTERNO", "EXTERNO"],
            isNullable: false,
          },
          {
            name: "situacao",
            type: "enum",
            enum: ["PENDENTE", "EM_ANALISE", "DEFERIDA", "INDEFERIDA", "CANCELADA"],
            default: "'PENDENTE'",
            isNullable: false,
          },
          { name: "id_estagiario_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },

          // Campos específicos para estágio interno
          { name: "id_professor_orientador_fk", type: "uuid", isNullable: true },
          { name: "local_interno", type: "varchar", length: "255", isNullable: true },
          { name: "descricao_atividades", type: "text", isNullable: true },

          // Campos específicos para estágio externo
          { name: "id_empresa_fk", type: "uuid", isNullable: true },
          { name: "empresa_razao_social", type: "varchar", length: "255", isNullable: true },
          { name: "empresa_nome_fantasia", type: "varchar", length: "255", isNullable: true },
          { name: "empresa_cnpj", type: "varchar", length: "20", isNullable: true },
          { name: "empresa_telefone", type: "varchar", length: "20", isNullable: true },
          { name: "empresa_email", type: "varchar", length: "255", isNullable: true },
          { name: "supervisor_nome", type: "varchar", length: "255", isNullable: true },
          { name: "supervisor_email", type: "varchar", length: "255", isNullable: true },
          { name: "supervisor_telefone", type: "varchar", length: "20", isNullable: true },

          // Auditoria e Análise do CIEC
          { name: "id_analista_fk", type: "uuid", isNullable: true },
          { name: "parecer_analise", type: "text", isNullable: true },
          { name: "data_analise", type: "timestamptz", isNullable: true },
          { name: "id_estagio_gerado_fk", type: "uuid", isNullable: true },

          // Metadados padrão
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagio_solicitacao__depende__estagiario",
            columnNames: ["id_estagiario_fk"],
            referencedTableName: "estagiario",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "fk__estagio_solicitacao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedTableName: "campus",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "fk__estagio_solicitacao__depende__orientador",
            columnNames: ["id_professor_orientador_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
          {
            name: "fk__estagio_solicitacao__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedTableName: "empresa",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
          {
            name: "fk__estagio_solicitacao__depende__analista",
            columnNames: ["id_analista_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
          {
            name: "fk__estagio_solicitacao__depende__estagio_gerado",
            columnNames: ["id_estagio_gerado_fk"],
            referencedTableName: "estagio",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE INDEX idx__estagio_solicitacao__estagiario
      ON estagio_solicitacao (id_estagiario_fk, situacao)
      WHERE date_deleted IS NULL;
    `);

    await queryRunner.query(`
      CREATE INDEX idx__estagio_solicitacao__campus_situacao
      ON estagio_solicitacao (id_campus_fk, situacao)
      WHERE date_deleted IS NULL;
    `);

    await queryRunner.query(`CALL ensure_change_date_trigger('estagio_solicitacao')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estagio_solicitacao", true, true, true);
    await queryRunner.query(`DROP TYPE IF EXISTS "estagio_solicitacao_tipo_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "estagio_solicitacao_situacao_enum"`);
  }
}
