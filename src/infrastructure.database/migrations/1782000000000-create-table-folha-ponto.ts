import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableFolhaPonto1782000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "folha_ponto",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_estagio_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "data",
            type: "date",
            isNullable: false,
          },
          {
            name: "hora_inicio",
            type: "time",
            isNullable: false,
          },
          {
            name: "hora_fim",
            type: "time",
            isNullable: false,
          },
          {
            name: "quantidade_horas",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: "observacoes",
            type: "text",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
            length: "20",
            isNullable: false,
            default: "'PENDING'",
          },
          {
            name: "data_solicitacao",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "data_aprovacao",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "data_rejeicao",
            type: "timestamptz",
            isNullable: true,
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
            name: "fk__folha_ponto__depende__estagio",
            columnNames: ["id_estagio_fk"],
            referencedTableName: "estagio",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
        ],
        checks: [
          {
            name: "chk__folha_ponto__hora_fim_maior_inicio",
            expression: "hora_fim > hora_inicio",
          },
          {
            name: "chk__folha_ponto__quantidade_horas_valida",
            expression: "quantidade_horas > 0 AND quantidade_horas <= 24",
          },
          {
            name: "chk__folha_ponto__status_valido",
            expression: "status IN ('PENDING','APPROVED','REJECTED','EXPIRED','CANCELLED')",
          },
        ],
      }),
    );

    // Garante unicidade: somente 1 folha ativa por estágio + data
    await queryRunner.createIndex(
      "folha_ponto",
      new TableIndex({
        name: "uq__folha_ponto__estagio_data",
        columnNames: ["id_estagio_fk", "data"],
        isUnique: true,
        where: "date_deleted IS NULL",
      }),
    );

    await queryRunner.createIndex(
      "folha_ponto",
      new TableIndex({
        name: "idx__folha_ponto__estagio_id",
        columnNames: ["id_estagio_fk"],
      }),
    );

    await queryRunner.createIndex(
      "folha_ponto",
      new TableIndex({
        name: "idx__folha_ponto__status_ativo",
        columnNames: ["status"],
        where: "date_deleted IS NULL",
      }),
    );

    await queryRunner.createIndex(
      "folha_ponto",
      new TableIndex({
        name: "idx__folha_ponto__data_solicitacao",
        columnNames: ["data_solicitacao"],
      }),
    );

    // Trigger de auditoria (padrão do projeto)
    await queryRunner.query(`CALL ensure_change_date_trigger('folha_ponto')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("folha_ponto", true, true, true);
  }
}
