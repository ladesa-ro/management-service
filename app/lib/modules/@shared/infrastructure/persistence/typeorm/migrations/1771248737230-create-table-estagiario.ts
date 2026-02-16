import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "estagiario";

export class CreateTableEstagiario1771248737230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_perfil_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_curso_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_turma_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "telefone",
            type: "varchar",
            length: "15",
            isNullable: false,
          },
          {
            name: "data_nascimento",
            type: "date",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_perfil_fk"],
            referencedTableName: "perfil",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["id_curso_fk"],
            referencedTableName: "curso",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["id_turma_fk"],
            referencedTableName: "turma",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
