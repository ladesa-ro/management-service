import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

/**
 * Adiciona campos extras do CSV na tabela `estagio`.
 * Todos os campos são nullable para não quebrar registros existentes.
 */
export class AddCsvFieldsToEstagio1780000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("estagio", [
      new TableColumn({
        name: "data_prevista_fim",
        type: "date",
        isNullable: true,
      }),
      new TableColumn({
        name: "nome_seguradora",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
      new TableColumn({
        name: "numero_apolice_seguro",
        type: "varchar",
        length: "100",
        isNullable: true,
      }),
      new TableColumn({
        name: "visitas_realizadas",
        type: "integer",
        isNullable: true,
      }),
      new TableColumn({
        name: "visitas_justificadas",
        type: "integer",
        isNullable: true,
      }),
      new TableColumn({
        name: "visitas_a_vencer",
        type: "integer",
        isNullable: true,
      }),
      new TableColumn({
        name: "visitas_nao_realizadas",
        type: "integer",
        isNullable: true,
      }),
      new TableColumn({
        name: "resumo_pendencias",
        type: "varchar",
        length: "1000",
        isNullable: true,
      }),
      new TableColumn({
        name: "encerramento_por",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
      new TableColumn({
        name: "motivacao_desligamento",
        type: "varchar",
        length: "1000",
        isNullable: true,
      }),
      new TableColumn({
        name: "motivo_rescisao",
        type: "varchar",
        length: "1000",
        isNullable: true,
      }),
      new TableColumn({
        name: "media_notas_supervisor",
        type: "decimal",
        precision: 5,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "foi_ou_sera_contratado",
        type: "boolean",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("estagio", [
      "data_prevista_fim",
      "nome_seguradora",
      "numero_apolice_seguro",
      "visitas_realizadas",
      "visitas_justificadas",
      "visitas_a_vencer",
      "visitas_nao_realizadas",
      "resumo_pendencias",
      "encerramento_por",
      "motivacao_desligamento",
      "motivo_rescisao",
      "media_notas_supervisor",
      "foi_ou_sera_contratado",
    ]);
  }
}
