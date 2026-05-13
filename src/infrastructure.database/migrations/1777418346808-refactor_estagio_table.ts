import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class RefactorEstagioTable1777418346808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("estagio", [
      new TableColumn({
        name: "nome_supervisor",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
      new TableColumn({
        name: "email_supervisor",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
      new TableColumn({
        name: "telefone_supervisor",
        type: "varchar",
        length: "20",
        isNullable: true,
      }),
      new TableColumn({
        name: "aditivo",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: "tipo_aditivo",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
      new TableColumn({
        name: "id_usuario_orientador_fk",
        type: "uuid",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "estagio",
      new TableForeignKey({
        name: "fk_estagio_usuario_orientador",
        columnNames: ["id_usuario_orientador_fk"],
        referencedTableName: "usuario",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );

    await queryRunner.query(`
            ALTER TYPE estagio_status_enum ADD VALUE IF NOT EXISTS 'RESCINDIDO';
            ALTER TYPE estagio_status_enum ADD VALUE IF NOT EXISTS 'COM_PENDENCIA';
            ALTER TYPE estagio_status_enum ADD VALUE IF NOT EXISTS 'APTO_PARA_ENCERRAMENTO';
            ALTER TYPE estagio_status_enum RENAME VALUE 'ABERTA' TO 'EM_FASE_INICIAL';
            ALTER TYPE estagio_status_enum RENAME VALUE 'CONCLUIDA' TO 'ENCERRADO';
        `);

    await queryRunner.changeColumn(
      "estagio",
      "status",
      new TableColumn({
        name: "status",
        type: "enum",
        enumName: "estagio_status_enum",
        enum: [
          "EM_FASE_INICIAL",
          "EM_ANDAMENTO",
          "RESCINDIDO",
          "COM_PENDENCIA",
          "ENCERRADO",
          "APTO_PARA_ENCERRAMENTO",
        ],
        isNullable: false,
        default: "'EM_FASE_INICIAL'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE estagio_status_enum RENAME VALUE 'EM_FASE_INICIAL' TO 'ABERTA';
            ALTER TYPE estagio_status_enum RENAME VALUE 'ENCERRADO' TO 'CONCLUIDA';
        `);

    await queryRunner.changeColumn(
      "estagio",
      "status",
      new TableColumn({
        name: "status",
        type: "enum",
        enumName: "estagio_status_enum",
        enum: [
          "ABERTA",
          "EM_ANDAMENTO",
          "CONCLUIDA",
          "RESCINDIDO",
          "COM_PENDENCIA",
          "APTO_PARA_ENCERRAMENTO",
        ],
        isNullable: false,
        default: "'ABERTA'",
      }),
    );

    const table = await queryRunner.getTable("estagio");
    const orientadorForeignKey = table?.foreignKeys.find(
      (foreignKey) => foreignKey.name === "fk_estagio_usuario_orientador",
    );

    if (orientadorForeignKey) {
      await queryRunner.dropForeignKey("estagio", orientadorForeignKey);
    }

    await queryRunner.dropColumns("estagio", [
      "id_usuario_orientador_fk",
      "nome_supervisor",
      "email_supervisor",
      "telefone_supervisor",
      "aditivo",
      "tipo_aditivo",
    ]);
  }
}
