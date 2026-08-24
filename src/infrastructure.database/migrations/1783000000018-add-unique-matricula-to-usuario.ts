import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class AddUniqueMatriculaToUsuario1783000000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      "usuario",
      new TableUnique({
        name: "uq__usuario__matricula",
        columnNames: ["matricula"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint("usuario", "uq__usuario__matricula");
  }
}
