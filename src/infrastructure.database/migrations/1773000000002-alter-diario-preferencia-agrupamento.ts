import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const tableName = "diario_preferencia_agrupamento";

export class AlterDiarioPreferenciaAgrupamento1773000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(tableName, `fk__${tableName}__depende__intervalo_de_tempo`);
    await queryRunner.dropColumn(tableName, "id_intervalo_de_tempo_fk");
    await queryRunner.dropColumn(tableName, "dia_semana_iso");
    await queryRunner.dropColumn(tableName, "aulas_seguidas");
    await queryRunner.dropColumn(tableName, "date_created");
    await queryRunner.dropColumn(tableName, "date_updated");
    await queryRunner.dropColumn(tableName, "date_deleted");

    await queryRunner.query(
      `DROP TRIGGER IF EXISTS change_date_updated_table_${tableName} ON ${tableName}`,
    );

    await queryRunner.query(
      `ALTER TABLE ${tableName} ALTER COLUMN data_inicio TYPE date USING data_inicio::date`,
    );
    await queryRunner.query(
      `ALTER TABLE ${tableName} ALTER COLUMN data_fim TYPE date USING data_fim::date`,
    );

    await queryRunner.addColumn(
      tableName,
      new TableColumn({
        name: "ativo",
        type: "boolean",
        isNullable: false,
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(tableName, "ativo");

    await queryRunner.query(
      `ALTER TABLE ${tableName} ALTER COLUMN data_fim TYPE timestamptz USING data_fim::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE ${tableName} ALTER COLUMN data_inicio TYPE timestamptz USING data_inicio::timestamptz`,
    );

    await queryRunner.addColumns(tableName, [
      new TableColumn({ name: "date_deleted", type: "timestamptz", isNullable: true }),
      new TableColumn({
        name: "date_updated",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
      new TableColumn({
        name: "date_created",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
      new TableColumn({ name: "aulas_seguidas", type: "int", isNullable: false }),
      new TableColumn({ name: "dia_semana_iso", type: "int", isNullable: false }),
      new TableColumn({ name: "id_intervalo_de_tempo_fk", type: "uuid", isNullable: true }),
    ]);

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        name: `fk__${tableName}__depende__intervalo_de_tempo`,
        columnNames: ["id_intervalo_de_tempo_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "intervalo_de_tempo",
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }
}
