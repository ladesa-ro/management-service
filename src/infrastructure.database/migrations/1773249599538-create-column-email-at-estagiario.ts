import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const tableName = "estagiario";
const columnName = "email_institucional";

export class CreateColumnEmailAtEstagiario1773249599538 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable(tableName);

        if (!table?.findColumnByName(columnName)) {
            await queryRunner.addColumn(
                tableName,
                new TableColumn({
                    name: columnName,
                    type: "text",
                    isNullable: true,
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);

        if (table?.findColumnByName(columnName)) {
            await queryRunner.dropColumn(tableName, columnName);
        }
    }

}
