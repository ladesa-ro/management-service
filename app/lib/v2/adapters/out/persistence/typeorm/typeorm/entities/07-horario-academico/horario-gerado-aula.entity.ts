import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/00-00-base";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { DiarioProfessorEntity } from "../06-ensino-discente";
import { HorarioGeradoEntity } from "./horario-gerado.entity";

@Entity("horario_gerado_aula")
export class HorarioGeradoAulaEntity implements IDomain.HorarioGeradoAula {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @ManyToOne(() => DiarioProfessorEntity)
  @JoinColumn({ name: "id_diario_professor_fk" })
  diarioProfessor!: IDomain.DiarioProfessor;

  @ManyToOne(() => HorarioGeradoEntity)
  @JoinColumn({ name: "id_horario_gerado_fk" })
  horarioGerado!: IDomain.HorarioGerado;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: IDomain.IntervaloDeTempo;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
