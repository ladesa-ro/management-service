import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableFolhaPontoToken1782000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "folha_ponto_token",
        columns: [
          {
            // UUID v4 gerado na aplicação — não usa DEFAULT gen_random_uuid()
            // pois o ID deve ser opaco e gerado com v4 para máxima entropia
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_folha_ponto_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "tipo",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "expires_at",
            type: "timestamptz",
            isNullable: false,
          },
          {
            // null = disponível para uso; NOT NULL = já utilizado
            name: "used_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "ip_address",
            type: "varchar",
            length: "45",
            isNullable: true,
          },
          {
            name: "user_agent",
            type: "text",
            isNullable: true,
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
            name: "fk__folha_ponto_token__depende__folha_ponto",
            columnNames: ["id_folha_ponto_fk"],
            referencedTableName: "folha_ponto",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        checks: [
          {
            name: "chk__folha_ponto_token__tipo_valido",
            expression: "tipo IN ('APROVACAO','REJEICAO','CANCELAMENTO')",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "folha_ponto_token",
      new TableIndex({
        name: "idx__folha_ponto_token__folha_ponto_id",
        columnNames: ["id_folha_ponto_fk"],
      }),
    );

    // Índice para busca de tokens disponíveis (não usados) com filtragem por expiração
    await queryRunner.createIndex(
      "folha_ponto_token",
      new TableIndex({
        name: "idx__folha_ponto_token__expires_disponivel",
        columnNames: ["expires_at"],
        where: "used_at IS NULL",
      }),
    );

    // Sem trigger de date_updated — tokens são imutáveis após created
    // (o campo used_at é atualizado diretamente, sem precisar de trigger)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("folha_ponto_token", true, true, true);
  }
}
