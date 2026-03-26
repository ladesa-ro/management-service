import { Column, Entity, OneToMany, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "./perfil.typeorm.entity";

@Entity("cargo")
export class CargoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", unique: true })
  nome!: string;

  @OneToMany(
    () => PerfilEntity,
    (perfil) => perfil.cargo,
  )
  perfis!: Relation<PerfilEntity[]>;
}
