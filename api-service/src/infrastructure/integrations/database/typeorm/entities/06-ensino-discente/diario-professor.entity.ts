import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PerfilEntity } from "../03-autorizacao/perfil.entity";
import { DiarioEntity } from "./diario.entity";

@Entity("diario_professor")
export class DiarioProfessorEntity implements LadesaTypings.DiarioProfessor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "situacao", type: "bool", nullable: false })
  situacao!: boolean;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: LadesaTypings.Diario;

  @ManyToOne(() => require("../03-autorizacao/perfil.entity").PerfilEntity, (perfil: any) => perfil.diarioProfessores)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: any;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}