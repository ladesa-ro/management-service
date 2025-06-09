import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "../01-autenticacao/usuario.entity";
import { CampusEntity } from "../02-ambientes/campus.entity";

@Entity("perfil")
export class PerfilEntity implements LadesaTypings.Perfil {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "ativo", type: "boolean" })
  ativo!: boolean;

  @Column({ name: "cargo", type: "text" })
  cargo!: string;

  //

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

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
