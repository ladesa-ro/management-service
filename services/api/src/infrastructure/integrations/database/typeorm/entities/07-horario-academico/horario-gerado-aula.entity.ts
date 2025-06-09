import { IntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities/00-00-base";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiarioProfessorEntity } from "../06-ensino-discente";
import { HorarioGeradoEntity } from "./horario-gerado.entity";

@Entity("horario_gerado_aula")
export class HorarioGeradoAulaEntity implements LadesaTypings.HorarioGeradoAula {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  //

  @ManyToOne(() => DiarioProfessorEntity)
  @JoinColumn({ name: "id_diario_professor_fk" })
  diarioProfessor!: LadesaTypings.DiarioProfessor;

  @ManyToOne(() => HorarioGeradoEntity)
  @JoinColumn({ name: "id_horario_gerado_fk" })
  horarioGerado!: LadesaTypings.HorarioGerado;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: LadesaTypings.IntervaloDeTempo;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
