import { CampusEntity } from "@/infrastructure/integrations/database/typeorm/entities/02-ambientes";
import { OfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("grade_horario_oferta_formacao_intervalo_de_tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoEntity implements LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: LadesaTypings.IntervaloDeTempo;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_grade_horario_oferta_formacao_fk" })
  gradeHorarioOfertaFormacao!: LadesaTypings.GradeHorarioOfertaFormacao;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
