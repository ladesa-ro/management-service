import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEmpresa1742517900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "empresa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "razao_social", type: "text", isNullable: false },
          { name: "telefone", type: "varchar(15)", isNullable: false },
          { name: "cnpj", type: "varchar(14)", isNullable: false },
          { name: "nome_fantasia", type: "text", isNullable: false },
          { name: "email", type: "text", isNullable: false },
          { name: "id_endereco_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__empresa__depende__endereco",
            columnNames: ["id_endereco_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "endereco",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('empresa')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("empresa", true, true, true);
  }
}
