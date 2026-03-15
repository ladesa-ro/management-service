import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesInfraestrutura1700000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // base_estado
    await queryRunner.createTable(
      new Table({
        name: "base_estado",
        columns: [
          { name: "id", type: "int", isPrimary: true },
          { name: "sigla", type: "text", isNullable: false },
          { name: "nome", type: "text", isNullable: false },
        ],
      }),
    );
    await queryRunner.query(
      `COMMENT ON TABLE "base_estado" IS 'ID e predefinido com base na numeracao IBGE dos Estados Brasileiros'`,
    );

    // base_cidade
    await queryRunner.createTable(
      new Table({
        name: "base_cidade",
        columns: [
          { name: "id", type: "int", isPrimary: true },
          { name: "nome", type: "text", isNullable: false },
          { name: "id_estado_fk", type: "int", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__base_cidade__depende__base_estado",
            columnNames: ["id_estado_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "base_estado",
          },
        ],
      }),
    );

    // endereco
    await queryRunner.createTable(
      new Table({
        name: "endereco",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "cep", type: "text", isNullable: false },
          { name: "logradouro", type: "text", isNullable: false },
          { name: "numero", type: "text", isNullable: false },
          { name: "bairro", type: "text", isNullable: false },
          { name: "complemento", type: "text", isNullable: true },
          { name: "ponto_referencia", type: "text", isNullable: true },
          { name: "id_cidade_fk", type: "int", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false },
          { name: "date_updated", type: "timestamptz", isNullable: false },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__endereco__depende__base_cidade",
            columnNames: ["id_cidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "base_cidade",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('endereco')`);

    // arquivo
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

    // imagem
    await queryRunner.createTable(
      new Table({
        name: "imagem",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "descricao", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('imagem')`);

    // imagem_arquivo
    await queryRunner.createTable(
      new Table({
        name: "imagem_arquivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "largura", type: "int", isNullable: false },
          { name: "altura", type: "int", isNullable: false },
          { name: "formato", type: "text", isNullable: false },
          { name: "mime_type", type: "text", isNullable: false },
          { name: "id_imagem_fk", type: "uuid", isNullable: false },
          { name: "id_arquivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__imagem_arquivo__depende__imagem",
            columnNames: ["id_imagem_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
          },
          {
            name: "fk__imagem_arquivo__depende__arquivo",
            columnNames: ["id_arquivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "arquivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('imagem_arquivo')`);

    // usuario
    await queryRunner.createTable(
      new Table({
        name: "usuario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: true },
          { name: "matricula", type: "text", isNullable: true },
          { name: "email", type: "text", isNullable: true },
          { name: "id_imagem_perfil_fk", type: "uuid", isNullable: true },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "is_super_user", type: "boolean", isNullable: false, default: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__usuario__depende__imagem_perfil",
            columnNames: ["id_imagem_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "fk__usuario__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('usuario')`);

    // campus
    await queryRunner.createTable(
      new Table({
        name: "campus",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome_fantasia", type: "text", isNullable: false },
          { name: "razao_social", type: "text", isNullable: false },
          { name: "apelido", type: "text", isNullable: false },
          { name: "cnpj", type: "text", isNullable: false },
          { name: "id_endereco_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__campus__depende__endereco",
            columnNames: ["id_endereco_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "endereco",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('campus')`);

    // bloco
    await queryRunner.createTable(
      new Table({
        name: "bloco",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "codigo", type: "text", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__bloco__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
          {
            name: "fk__bloco__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('bloco')`);

    // ambiente
    await queryRunner.createTable(
      new Table({
        name: "ambiente",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "descricao", type: "text", isNullable: true },
          { name: "codigo", type: "text", isNullable: false },
          { name: "capacidade", type: "int", isNullable: true },
          { name: "tipo", type: "text", isNullable: true },
          { name: "id_bloco_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__ambiente__depende__bloco",
            columnNames: ["id_bloco_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "bloco",
          },
          {
            name: "fk__ambiente__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('ambiente')`);

    // perfil
    await queryRunner.createTable(
      new Table({
        name: "perfil",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "cargo", type: "text", isNullable: false },
          { name: "apelido", type: "text", isNullable: true },
          { name: "id_usuario_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__perfil__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
          {
            name: "fk__perfil__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('perfil')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("perfil", true, true, true);
    await queryRunner.dropTable("ambiente", true, true, true);
    await queryRunner.dropTable("bloco", true, true, true);
    await queryRunner.dropTable("campus", true, true, true);
    await queryRunner.dropTable("usuario", true, true, true);
    await queryRunner.dropTable("imagem_arquivo", true, true, true);
    await queryRunner.dropTable("imagem", true, true, true);
    await queryRunner.dropTable("arquivo", true, true, true);
    await queryRunner.dropTable("endereco", true, true, true);
    await queryRunner.dropTable("base_cidade", true, true, true);
    await queryRunner.dropTable("base_estado", true, true, true);
  }
}
