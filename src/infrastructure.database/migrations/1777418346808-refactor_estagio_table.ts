import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

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

        await queryRunner.manager
            .createQueryBuilder()
            .update("estagio")
            .set({ status: "EM_FASE_INICIAL" })
            .where("status = :status", { status: "ABERTA" })
            .execute();

        await queryRunner.manager
            .createQueryBuilder()
            .update("estagio")
            .set({ status: "ENCERRADO" })
            .where("status = :status", { status: "CONCLUIDA" })
            .execute();

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
        await queryRunner.manager
            .createQueryBuilder()
            .update("estagio")
            .set({ status: "ABERTA" })
            .where("status IN (:...status)", {
                status: [
                    "EM_FASE_INICIAL",
                    "RESCINDIDO",
                    "COM_PENDENCIA",
                    "APTO_PARA_ENCERRAMENTO",
                ],
            })
            .execute();

        await queryRunner.manager
            .createQueryBuilder()
            .update("estagio")
            .set({ status: "CONCLUIDA" })
            .where("status = :status", { status: "ENCERRADO" })
            .execute();

        await queryRunner.changeColumn(
            "estagio",
            "status",
            new TableColumn({
                name: "status",
                type: "enum",
                enumName: "estagio_status_enum",
                enum: ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"],
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
