import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableTurmaMatricula1783000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "turma_matricula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__turma_matricula__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedTableName: "turma",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__turma_matricula__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedTableName: "perfil",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );

    // Garante unicidade: apenas 1 matricula ATIVA por (turma, perfil). Uma
    // matricula desvinculada (soft-deleted) nao bloqueia uma nova matricula
    // do mesmo perfil na mesma turma (ex: reingresso).
    await queryRunner.createIndex(
      "turma_matricula",
      new TableIndex({
        name: "uq__turma_matricula__turma_perfil_ativo",
        columnNames: ["id_turma_fk", "id_perfil_fk"],
        isUnique: true,
        where: "date_deleted IS NULL",
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('turma_matricula')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma_matricula", true, true, true);
  }
}
