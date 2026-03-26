import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { CargoEntity } from "./cargo.typeorm.entity";

@Entity("perfil")
export class PerfilEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "ativo", type: "boolean" })
  ativo!: boolean;

  @ManyToOne(
    () => CargoEntity,
    (cargo) => cargo.perfis,
    { nullable: true },
  )
  @JoinColumn({ name: "id_cargo_fk" })
  cargo!: Relation<CargoEntity>;

  @ManyToOne(
    () => CampusEntity,
    (campus) => campus.vinculos,
  )
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(
    () => UsuarioEntity,
    (usuario) => usuario.vinculos,
  )
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
