import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDadosAnterioresToHorarioEdicaoMudanca1783000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "horario_edicao_mudanca",
      new TableColumn({
        name: "dados_anteriores",
        type: "jsonb",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("horario_edicao_mudanca", "dados_anteriores");
  }
}
