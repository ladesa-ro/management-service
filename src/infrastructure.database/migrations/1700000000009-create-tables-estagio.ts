import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesEstagio1700000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // empresa
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

    // responsavel_empresa
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

    // estagiario
    await queryRunner.createTable(
      new Table({
        name: "estagiario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "id_curso_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "telefone", type: "varchar(15)", isNullable: false },
          { name: "data_nascimento", type: "date", isNullable: false },
          { name: "email_institucional", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagiario__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
          {
            name: "fk__estagiario__depende__curso",
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
          },
          {
            name: "fk__estagiario__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('estagiario')`);

    // estagio
    await queryRunner.createTable(
      new Table({
        name: "estagio",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_empresa_fk", type: "uuid", isNullable: false },
          { name: "id_estagiario_fk", type: "uuid", isNullable: true },
          { name: "carga_horaria", type: "integer", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: true },
          { name: "data_fim", type: "date", isNullable: true },
          {
            name: "status",
            type: "enum",
            enum: ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"],
            default: "'ABERTA'",
          },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagio__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "empresa",
            onDelete: "CASCADE",
          },
          {
            name: "fk__estagio__depende__estagiario",
            columnNames: ["id_estagiario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "estagiario",
            onDelete: "SET NULL",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('estagio')`);

    // horario_estagio
    await queryRunner.createTable(
      new Table({
        name: "horario_estagio",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_estagio_fk", type: "uuid", isNullable: false },
          { name: "dia_semana", type: "int", isNullable: false },
          { name: "hora_inicio", type: "time", isNullable: false },
          { name: "hora_fim", type: "time", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__horario_estagio__depende__estagio",
            columnNames: ["id_estagio_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "estagio",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('horario_estagio')`);
    await queryRunner.query(
      `CREATE INDEX "IDX_78889e4079ad24a287ae4f8ba8" ON "horario_estagio" ("id_estagio_fk")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_estagio", true, true, true);
    await queryRunner.dropTable("estagio", true, true, true);
    await queryRunner.dropTable("estagiario", true, true, true);
    await queryRunner.dropTable("responsavel_empresa", true, true, true);
    await queryRunner.dropTable("empresa", true, true, true);
  }
}
