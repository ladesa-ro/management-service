import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { PerfilEntity } from "../03-autorizacao/perfil.entity";
import { DiarioEntity } from "./diario.entity";

@Entity("diario_professor")
export class DiarioProfessorEntity implements IDomain.DiarioProfessor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "situacao", type: "bool", nullable: false })
  situacao!: boolean;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: IDomain.Diario;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: IDomain.Perfil;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
