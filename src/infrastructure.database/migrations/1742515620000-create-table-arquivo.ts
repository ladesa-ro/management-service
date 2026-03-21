import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableArquivo1742515620000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "arquivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "name", type: "text", isNullable: true },
          { name: "mime_type", type: "text", isNullable: true },
          { name: "size_bytes", type: "int", isNullable: true },
          { name: "storage_type", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("arquivo", true, true, true);
  }
}
