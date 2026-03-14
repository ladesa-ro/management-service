import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterExistingTables1773000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // arquivo: drop date_updated, date_deleted, remove default from date_created, drop trigger
    await queryRunner.query(`DROP TRIGGER IF EXISTS change_date_updated_table_arquivo ON arquivo`);
    await queryRunner.dropColumn("arquivo", "date_updated");
    await queryRunner.dropColumn("arquivo", "date_deleted");
    await queryRunner.query(`ALTER TABLE arquivo ALTER COLUMN date_created DROP DEFAULT`);

    // oferta_formacao: drop slug, add apelido, duracao_periodo_em_meses, id_campus_fk + FK
    await queryRunner.dropColumn("oferta_formacao", "slug");
    await queryRunner.addColumn(
      "oferta_formacao",
      new TableColumn({
        name: "apelido",
        type: "text",
        isNullable: false,
        default: "''",
      }),
    );
    await queryRunner.addColumn(
      "oferta_formacao",
      new TableColumn({
        name: "duracao_periodo_em_meses",
        type: "integer",
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      "oferta_formacao",
      new TableColumn({
        name: "id_campus_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "oferta_formacao",
      new TableForeignKey({
        name: "fk__oferta_formacao__campus",
        columnNames: ["id_campus_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "campus",
      }),
    );

    // perfil: add apelido (nullable)
    await queryRunner.addColumn(
      "perfil",
      new TableColumn({
        name: "apelido",
        type: "text",
        isNullable: true,
      }),
    );

    // base_cidade: set id_estado_fk NOT NULL
    await queryRunner.query(`ALTER TABLE base_cidade ALTER COLUMN id_estado_fk SET NOT NULL`);

    // endereco: alter numero to text, drop defaults from date_created/date_updated
    await queryRunner.query(
      `ALTER TABLE endereco ALTER COLUMN numero TYPE text USING numero::text`,
    );
    await queryRunner.query(`ALTER TABLE endereco ALTER COLUMN date_created DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE endereco ALTER COLUMN date_updated DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // endereco: restore defaults and type
    await queryRunner.query(`ALTER TABLE endereco ALTER COLUMN date_updated SET DEFAULT NOW()`);
    await queryRunner.query(`ALTER TABLE endereco ALTER COLUMN date_created SET DEFAULT NOW()`);
    await queryRunner.query(
      `ALTER TABLE endereco ALTER COLUMN numero TYPE integer USING numero::integer`,
    );

    // base_cidade: drop NOT NULL constraint
    await queryRunner.query(`ALTER TABLE base_cidade ALTER COLUMN id_estado_fk DROP NOT NULL`);

    // perfil: drop apelido
    await queryRunner.dropColumn("perfil", "apelido");

    // oferta_formacao: drop FK, drop columns, restore slug
    await queryRunner.dropForeignKey("oferta_formacao", "fk__oferta_formacao__campus");
    await queryRunner.dropColumn("oferta_formacao", "id_campus_fk");
    await queryRunner.dropColumn("oferta_formacao", "duracao_periodo_em_meses");
    await queryRunner.dropColumn("oferta_formacao", "apelido");
    await queryRunner.addColumn(
      "oferta_formacao",
      new TableColumn({
        name: "slug",
        type: "text",
        isNullable: true,
      }),
    );

    // arquivo: restore date_created default, add date_updated, date_deleted, recreate trigger
    await queryRunner.query(`ALTER TABLE arquivo ALTER COLUMN date_created SET DEFAULT NOW()`);
    await queryRunner.addColumn(
      "arquivo",
      new TableColumn({
        name: "date_updated",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
    );
    await queryRunner.addColumn(
      "arquivo",
      new TableColumn({
        name: "date_deleted",
        type: "timestamptz",
        isNullable: true,
      }),
    );
    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_arquivo
        BEFORE UPDATE ON arquivo
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }
}
