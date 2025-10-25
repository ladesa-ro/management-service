import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "indisponibilidade_professor";

export class CreateTableIndisponibilidadeProfessor1754870894487 implements MigrationInterface {
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
          // ======================================================================

          {
            name: "dia_da_semana",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "hora_inicio",
            type: "time",
            precision: 0,
            isNullable: false,
          },
          {
            name: "hora_fim",
            type: "time",
            precision: 0,
            isNullable: false,
          },
          // ======================================================================
          {
            name: "motivo",
            type: "varchar",
            length: "90",
            isNullable: false,
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_updated",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_deleted",
            type: "timestamptz",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__perfil`,
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'CHK_dia_da_semana'
        ) THEN
        ALTER TABLE "indisponibilidade_professor"
        ADD CONSTRAINT "CHK_dia_da_semana"
        CHECK ("dia_da_semana" BETWEEN 0 AND 6);
      END IF;
    END
    $$;
`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
