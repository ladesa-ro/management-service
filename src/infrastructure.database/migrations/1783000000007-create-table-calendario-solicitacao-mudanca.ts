import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioSolicitacaoMudanca1783000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_solicitacao_mudanca",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_autor_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
          {
            name: "tipo_operacao",
            type: "enum",
            enum: ["MOVER", "REMOVER"],
            isNullable: false,
          },
          { name: "dados_propostos", type: "jsonb", isNullable: false },
          { name: "justificativa", type: "text", isNullable: false },
          {
            name: "status",
            type: "enum",
            enum: ["ABERTA", "APROVADA", "RECUSADA"],
            default: "'ABERTA'",
            isNullable: false,
          },
          { name: "motivo_recusa", type: "text", isNullable: true },
          { name: "id_sessao_edicao_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_solicitacao_mudanca__depende__usuario",
            columnNames: ["id_autor_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk__calendario_solicitacao_mudanca__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedTableName: "calendario_agendamento",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__calendario_solicitacao_mudanca__depende__horario_edicao_sessao",
            columnNames: ["id_sessao_edicao_fk"],
            referencedTableName: "horario_edicao_sessao",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_solicitacao_mudanca')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_solicitacao_mudanca", true, true, true);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "calendario_solicitacao_mudanca_tipo_operacao_enum"`,
    );
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_solicitacao_mudanca_status_enum"`);
  }
}
