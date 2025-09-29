import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";
import {
  CampusDatabaseEntity
} from "../../../../../../features/campus/infrastructure/persistence/typeorm/entities/campus.database-entity";
import { UsuarioEntity } from "../01-autenticacao/usuario.entity";

@Entity("perfil")
export class PerfilEntity implements IDomain.Perfil {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({name: "ativo", type: "boolean"})
  ativo!: boolean;

  @Column({name: "cargo", type: "text"})
  cargo!: string;

  @ManyToOne(
    () => CampusDatabaseEntity,
    (campus) => campus.vinculos,
  )
  @JoinColumn({name: "id_campus_fk"})
  campus!: Relation<CampusDatabaseEntity>;

  @ManyToOne(
    () => UsuarioEntity,
    (usuario) => usuario.vinculos,
  )
  @JoinColumn({name: "id_usuario_fk"})
  usuario!: Relation<UsuarioEntity>;

  @Column({name: "date_created", type: "timestamptz", nullable: false})
  dateCreated!: Date;

  @Column({name: "date_updated", type: "timestamptz", nullable: false})
  dateUpdated!: Date;

  @Column({name: "date_deleted", type: "timestamptz", nullable: true})
  dateDeleted!: null | Date;
}
