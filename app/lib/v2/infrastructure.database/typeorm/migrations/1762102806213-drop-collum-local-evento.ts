import { MigrationInterface, QueryRunner } from "typeorm";

export class DropCollumLocalEvento1762102806213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("evento");
    const column = table?.findColumnByName("local");

    if (column) {
      await queryRunner.dropColumn("evento", "local");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
