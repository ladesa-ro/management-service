import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const CARGO = "cargo";
const PERFIL = "perfil";
const USUARIO = "usuario";

export class MoveColumnCargoFromUsuarioToPerfil1774514898469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn(PERFIL, CARGO))) {
      await queryRunner.addColumn(
        PERFIL,
        new TableColumn({
          name: CARGO,
          type: "text",
          isNullable: true,
        }),
      );
    }

    const perfis = await queryRunner.manager
      .createQueryBuilder()
      .select("p.id", "perfilId")
      .addSelect("u.cargo", "cargo")
      .from(PERFIL, "p")
      .innerJoin(USUARIO, "u", "u.id = p.id_usuario_fk")
      .where("u.cargo IS NOT NULL")
      .andWhere("TRIM(u.cargo) <> ''")
      .getRawMany<{ perfilId: string; cargo: string }>();

    for (const p of perfis) {
      await queryRunner.manager
        .createQueryBuilder()
        .update(PERFIL)
        .set({ cargo: p.cargo })
        .where("id = :id", { id: p.perfilId })
        .andWhere("(cargo IS NULL OR TRIM(cargo) = '')")
        .execute();
    }

    const semCargo = await queryRunner.manager
      .createQueryBuilder()
      .from(PERFIL, "p")
      .where("p.cargo IS NULL")
      .orWhere("TRIM(p.cargo) = ''")
      .getCount();

    if (semCargo > 0) {
      throw new Error("Existem perfis sem cargo.");
    }

    const table = await queryRunner.getTable(PERFIL);
    const cargoColumn = table?.findColumnByName(CARGO);

    if (cargoColumn?.isNullable) {
      await queryRunner.changeColumn(
        PERFIL,
        CARGO,
        new TableColumn({
          ...cargoColumn,
          isNullable: false,
        }),
      );
    }

    if (await queryRunner.hasColumn(USUARIO, CARGO)) {
      await queryRunner.dropColumn(USUARIO, CARGO);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn(USUARIO, CARGO))) {
      await queryRunner.addColumn(
        USUARIO,
        new TableColumn({
          name: CARGO,
          type: "text",
          isNullable: true,
        }),
      );
    }

    // Ordenação para escolha determinística do cargo por usuário
    const perfis = await queryRunner.manager
      .createQueryBuilder()
      .select("p.id_usuario_fk", "usuarioId")
      .addSelect("p.cargo", "cargo")
      .from(PERFIL, "p")
      .where("p.cargo IS NOT NULL")
      .andWhere("TRIM(p.cargo) <> ''")
      .orderBy("p.id_usuario_fk", "ASC")
      .addOrderBy("p.date_updated", "DESC")
      .addOrderBy("p.id", "ASC")
      .getRawMany<{ usuarioId: string; cargo: string }>();

    const porUsuario = new Map<string, string>();
    for (const p of perfis) {
      if (!porUsuario.has(p.usuarioId)) porUsuario.set(p.usuarioId, p.cargo);
    }

    for (const [usuarioId, cargo] of porUsuario) {
      await queryRunner.manager
        .createQueryBuilder()
        .update(USUARIO)
        .set({ cargo })
        .where("id = :id", { id: usuarioId })
        .andWhere("(cargo IS NULL OR TRIM(cargo) = '')")
        .execute();
    }

    if (await queryRunner.hasColumn(PERFIL, CARGO)) {
      await queryRunner.dropColumn(PERFIL, CARGO);
    }
  }
}
