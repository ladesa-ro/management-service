import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRecurrenceExceptionToCalendarioAgendamento1783000000002
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Sem FK real de propósito: referencia o identificador_externo da série raiz,
    // que é estável entre versões, não o id de uma linha específica (mesma lógica
    // de previous_version_id, que também é uuid solto). Ver docs/analise-calendario.md,
    // Recorte 2.
    await queryRunner.addColumn(
      "calendario_agendamento",
      new TableColumn({
        name: "identificador_externo_serie_origem",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "calendario_agendamento",
      new TableColumn({
        name: "data_ocorrencia_referenciada",
        type: "date",
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      CREATE INDEX idx__calendario_agendamento__serie_origem
      ON calendario_agendamento (identificador_externo_serie_origem, data_ocorrencia_referenciada)
      WHERE identificador_externo_serie_origem IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx__calendario_agendamento__serie_origem`);
    await queryRunner.dropColumn("calendario_agendamento", "data_ocorrencia_referenciada");
    await queryRunner.dropColumn("calendario_agendamento", "identificador_externo_serie_origem");
  }
}
