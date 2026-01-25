import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { HorarioGeradoEntity } from "./horario-gerado.entity";
import { DiarioProfessorEntity } from "./diario-professor.entity";
import {
  IntervaloDeTempoEntity
} from "./intervalo-de-tempo.entity";

@Entity("horario_gerado_aula")
export class HorarioGeradoAulaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @ManyToOne(() => DiarioProfessorEntity)
  @JoinColumn({ name: "id_diario_professor_fk" })
  diarioProfessor!: Relation<DiarioProfessorEntity>;

  @ManyToOne(() => HorarioGeradoEntity)
  @JoinColumn({ name: "id_horario_gerado_fk" })
  horarioGerado!: Relation<HorarioGeradoEntity>;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: Relation<IntervaloDeTempoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
