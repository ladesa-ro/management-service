import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableIdempotencyRecord1783000000013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "idempotency_record",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "chave",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "comando",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "resultado",
            type: "jsonb",
            isNullable: false,
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "idempotency_record",
      new TableIndex({
        name: "uq__idempotency_record__chave_comando",
        columnNames: ["chave", "comando"],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("idempotency_record", true, true, true);
  }
}
