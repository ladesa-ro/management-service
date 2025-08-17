import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class InsertLocalEventos1755002637558 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("evento", 
            new TableColumn({
                name: "local",
                type: "varchar",
                length: "80",
                default: "'Instituto Federal de Educação, Ciência e Tecnologia de Rondônia - IFRO'",
                isNullable: true,
            }),
        );
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("evento", ["local"]);
  }
}
