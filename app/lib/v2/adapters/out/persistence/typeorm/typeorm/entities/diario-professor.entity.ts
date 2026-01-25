import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { DiarioEntity } from "./diario.entity";
import { PerfilEntity } from "./perfil.entity";

@Entity("diario_professor")
export class DiarioProfessorEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "situacao", type: "bool", nullable: false })
  situacao!: boolean;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
