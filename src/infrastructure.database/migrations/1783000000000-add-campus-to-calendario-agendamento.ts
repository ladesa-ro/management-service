import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCampusToCalendarioAgendamento1783000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "calendario_agendamento",
      new TableColumn({
        name: "id_campus_fk",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "calendario_agendamento",
      new TableForeignKey({
        name: "fk_calendario_agendamento_campus",
        columnNames: ["id_campus_fk"],
        referencedTableName: "campus",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );

    await queryRunner.query(`
      UPDATE calendario_agendamento ca
      SET id_campus_fk = derivado.id_campus_fk
      FROM (
        SELECT ca2.id AS id_agendamento, COALESCE(via_ambiente.id_campus_fk, via_turma.id_campus_fk) AS id_campus_fk
        FROM calendario_agendamento ca2
        LEFT JOIN LATERAL (
          SELECT b.id_campus_fk
          FROM calendario_agendamento_ambiente caa
          JOIN ambiente amb ON amb.id = caa.id_ambiente_fk
          JOIN bloco b ON b.id = amb.id_bloco_fk
          WHERE caa.id_calendario_agendamento_fk = ca2.id
          LIMIT 1
        ) AS via_ambiente ON true
        LEFT JOIN LATERAL (
          SELECT c.id_campus_fk
          FROM calendario_agendamento_turma cat
          JOIN turma t ON t.id = cat.id_turma_fk
          JOIN curso c ON c.id = t.id_curso_fk
          WHERE cat.id_calendario_agendamento_fk = ca2.id
          LIMIT 1
        ) AS via_turma ON true
      ) AS derivado
      WHERE ca.id = derivado.id_agendamento
        AND derivado.id_campus_fk IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("calendario_agendamento");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_campus_fk") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("calendario_agendamento", foreignKey);
    }
    await queryRunner.dropColumn("calendario_agendamento", "id_campus_fk");
  }
}
