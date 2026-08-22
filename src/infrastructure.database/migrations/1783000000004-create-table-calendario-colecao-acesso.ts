import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableCalendarioColecaoAcesso1783000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_colecao_acesso",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_colecao_fk", type: "uuid", isNullable: false },
          {
            name: "escopo",
            type: "enum",
            enum: ["USUARIO", "CAMPUS", "PUBLICO"],
            isNullable: false,
          },
          { name: "id_usuario_fk", type: "uuid", isNullable: true },
          { name: "id_campus_fk", type: "uuid", isNullable: true },
          {
            name: "papel",
            type: "enum",
            enum: ["OCUPACAO", "LEITOR", "EDITOR"],
            isNullable: false,
          },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_colecao_acesso__depende__calendario_colecao",
            columnNames: ["id_colecao_fk"],
            referencedTableName: "calendario_colecao",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__calendario_colecao_acesso__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedTableName: "usuario",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk__calendario_colecao_acesso__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedTableName: "campus",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        checks: [
          {
            name: "chk__calendario_colecao_acesso__escopo_alvo_consistente",
            expression: `(escopo = 'USUARIO' AND id_usuario_fk IS NOT NULL AND id_campus_fk IS NULL) OR (escopo = 'CAMPUS' AND id_campus_fk IS NOT NULL AND id_usuario_fk IS NULL) OR (escopo = 'PUBLICO' AND id_usuario_fk IS NULL AND id_campus_fk IS NULL)`,
          },
        ],
      }),
    );

    // Garante unicidade: apenas 1 concessão ATIVA por (colecao, usuario) quando escopo=USUARIO.
    // Uma concessão revogada (soft-deleted) não bloqueia uma nova concessão ao mesmo alvo.
    await queryRunner.createIndex(
      "calendario_colecao_acesso",
      new TableIndex({
        name: "uq__calendario_colecao_acesso__colecao_usuario_ativo",
        columnNames: ["id_colecao_fk", "id_usuario_fk"],
        isUnique: true,
        where: "escopo = 'USUARIO' AND date_deleted IS NULL",
      }),
    );

    // Garante unicidade: apenas 1 concessão ATIVA por (colecao, campus) quando escopo=CAMPUS.
    await queryRunner.createIndex(
      "calendario_colecao_acesso",
      new TableIndex({
        name: "uq__calendario_colecao_acesso__colecao_campus_ativo",
        columnNames: ["id_colecao_fk", "id_campus_fk"],
        isUnique: true,
        where: "escopo = 'CAMPUS' AND date_deleted IS NULL",
      }),
    );

    // Garante unicidade: apenas 1 concessão ATIVA por colecao quando escopo=PUBLICO.
    await queryRunner.createIndex(
      "calendario_colecao_acesso",
      new TableIndex({
        name: "uq__calendario_colecao_acesso__colecao_publico_ativo",
        columnNames: ["id_colecao_fk"],
        isUnique: true,
        where: "escopo = 'PUBLICO' AND date_deleted IS NULL",
      }),
    );

    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_colecao_acesso')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_colecao_acesso", true, true, true);
  }
}
