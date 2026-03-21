import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableResponsavelEmpresa1742517960000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "responsavel_empresa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_empresa_fk", type: "uuid", isNullable: false },
          { name: "nome_responsavel", type: "varchar(35)", isNullable: false },
          { name: "email", type: "text", isNullable: false },
          { name: "telefone", type: "varchar(15)", isNullable: false },
          { name: "cpf", type: "varchar(11)", isNullable: false },
          { name: "cargo", type: "text", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__responsavel_empresa__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "empresa",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('responsavel_empresa')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("responsavel_empresa", true, true, true);
  }
}
