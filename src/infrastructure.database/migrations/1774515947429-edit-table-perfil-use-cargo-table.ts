import { randomUUID } from "node:crypto";
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const PERFIL = "perfil";
const CARGO = "cargo";
const CARGO_TXT_COL = "cargo";
const PERFIL_CARGO_FK_COL = "id_cargo_fk";
const FK_PERFIL_CARGO = "fk_perfil_id_cargo";

export class EditTablePerfilUseCargoTable1774515947429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn(PERFIL, PERFIL_CARGO_FK_COL))) {
      await queryRunner.addColumn(
        PERFIL,
        new TableColumn({
          name: PERFIL_CARGO_FK_COL,
          type: "uuid",
          isNullable: true,
        }),
      );
    }

    const perfisComCargo = await queryRunner.manager
      .createQueryBuilder()
      .select("p.id", "perfilId")
      .addSelect("TRIM(p.cargo)", "cargoNome")
      .from(PERFIL, "p")
      .where("p.cargo IS NOT NULL")
      .andWhere("TRIM(p.cargo) <> ''")
      .getRawMany<{ perfilId: string; cargoNome: string }>();

    const cargoIdByNome = new Map<string, string>();

    for (const item of perfisComCargo) {
      const nome = item.cargoNome;
      if (cargoIdByNome.has(nome)) continue;

      const existente = await queryRunner.manager
        .createQueryBuilder()
        .select("c.id", "id")
        .from(CARGO, "c")
        .where("c.nome = :nome", { nome })
        .getRawOne<{ id: string }>();

      if (existente?.id) {
        cargoIdByNome.set(nome, existente.id);
        continue;
      }

      const id = randomUUID();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(CARGO)
        .values({ id, nome })
        .execute();

      cargoIdByNome.set(nome, id);
    }

    for (const item of perfisComCargo) {
      const cargoId = cargoIdByNome.get(item.cargoNome);
      if (!cargoId) continue;

      await queryRunner.manager
        .createQueryBuilder()
        .update(PERFIL)
        .set({ [PERFIL_CARGO_FK_COL]: cargoId } as any)
        .where("id = :id", { id: item.perfilId })
        .execute();
    }

    const perfilTable = await queryRunner.getTable(PERFIL);
    const fkExists = perfilTable?.foreignKeys.some((fk) => fk.name === FK_PERFIL_CARGO);

    if (!fkExists) {
      await queryRunner.createForeignKey(
        PERFIL,
        new TableForeignKey({
          name: FK_PERFIL_CARGO,
          columnNames: [PERFIL_CARGO_FK_COL],
          referencedTableName: CARGO,
          referencedColumnNames: ["id"],
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        }),
      );
    }

    if (await queryRunner.hasColumn(PERFIL, CARGO_TXT_COL)) {
      await queryRunner.dropColumn(PERFIL, CARGO_TXT_COL);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn(PERFIL, CARGO_TXT_COL))) {
      await queryRunner.addColumn(
        PERFIL,
        new TableColumn({
          name: CARGO_TXT_COL,
          type: "text",
          isNullable: true,
        }),
      );
    }

    const perfis = await queryRunner.manager
      .createQueryBuilder()
      .select("p.id", "perfilId")
      .addSelect("c.nome", "cargoNome")
      .from(PERFIL, "p")
      .innerJoin(CARGO, "c", `c.id = p.${PERFIL_CARGO_FK_COL}`)
      .where(`p.${PERFIL_CARGO_FK_COL} IS NOT NULL`)
      .getRawMany<{ perfilId: string; cargoNome: string }>();

    for (const item of perfis) {
      await queryRunner.manager
        .createQueryBuilder()
        .update(PERFIL)
        .set({ [CARGO_TXT_COL]: item.cargoNome } as any)
        .where("id = :id", { id: item.perfilId })
        .execute();
    }

    const perfilTable = await queryRunner.getTable(PERFIL);
    const fk = perfilTable?.foreignKeys.find((f) => f.name === FK_PERFIL_CARGO);

    if (fk) {
      await queryRunner.dropForeignKey(PERFIL, fk);
    }

    if (await queryRunner.hasColumn(PERFIL, PERFIL_CARGO_FK_COL)) {
      await queryRunner.dropColumn(PERFIL, PERFIL_CARGO_FK_COL);
    }
  }
}
