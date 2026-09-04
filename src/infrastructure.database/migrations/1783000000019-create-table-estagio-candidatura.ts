import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstagioCandidatura1783000000019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estagio_candidatura",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_estagio_fk", type: "uuid", isNullable: false },
          { name: "id_estagiario_fk", type: "uuid", isNullable: false },
          {
            name: "situacao",
            type: "enum",
            enum: ["PENDING", "OFFERED", "ACCEPTED", "REJECTED", "CANCELLED", "EXPIRED"],
            default: "'PENDING'",
            isNullable: false,
          },
          { name: "data_inscricao", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "data_oferta", type: "timestamptz", isNullable: true },
          { name: "expira_em", type: "timestamptz", isNullable: true },
          { name: "data_resposta", type: "timestamptz", isNullable: true },
          { name: "data_cancelamento", type: "timestamptz", isNullable: true },
          { name: "id_autor_convocacao_fk", type: "uuid", isNullable: true },
          { name: "motivo_cancelamento", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagio_candidatura__depende__estagio",
            columnNames: ["id_estagio_fk"],
            referencedTableName: "estagio",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "fk__estagio_candidatura__depende__estagiario",
            columnNames: ["id_estagiario_fk"],
            referencedTableName: "estagiario",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "fk__estagio_candidatura__depende__autor_convocacao",
            columnNames: ["id_autor_convocacao_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );

    // Impede candidaturas ativas duplicadas do mesmo aluno na mesma vaga
    await queryRunner.query(`
      CREATE UNIQUE INDEX uq__estagio_candidatura__ativa
      ON estagio_candidatura (id_estagio_fk, id_estagiario_fk)
      WHERE situacao IN ('PENDING', 'OFFERED') AND date_deleted IS NULL;
    `);

    // Índice para ordenação e cálculo rápido de posição na fila de espera
    await queryRunner.query(`
      CREATE INDEX idx__estagio_candidatura__fila
      ON estagio_candidatura (id_estagio_fk, data_inscricao ASC)
      WHERE situacao = 'PENDING' AND date_deleted IS NULL;
    `);

    // Índice para busca de candidaturas por estagiário
    await queryRunner.query(`
      CREATE INDEX idx__estagio_candidatura__estagiario
      ON estagio_candidatura (id_estagiario_fk, situacao)
      WHERE date_deleted IS NULL;
    `);

    await queryRunner.query(`CALL ensure_change_date_trigger('estagio_candidatura')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estagio_candidatura", true, true, true);
    await queryRunner.query(`DROP TYPE IF EXISTS "estagio_candidatura_situacao_enum"`);
  }
}
