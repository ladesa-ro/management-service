import { type MigrationInterface, type QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddIdentificadorExternoToTurmaDisponibilidade1775500003000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "turma_disponibilidade_configuracao",
      new TableColumn({
        name: "identificador_externo",
        type: "uuid",
        isNullable: false,
        default: "gen_random_uuid()",
      }),
    );

    // Backfill: identificador_externo = id (cada fragmento e independente)
    await queryRunner.query(`
      UPDATE turma_disponibilidade_configuracao SET identificador_externo = id
    `);

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao__identificador_externo",
        columnNames: ["identificador_externo"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      "turma_disponibilidade_configuracao",
      "idx__turma_disponibilidade_configuracao__identificador_externo",
    );
    await queryRunner.dropColumn("turma_disponibilidade_configuracao", "identificador_externo");
  }
}
