import { CampusEntity } from "@/integrations/database/typeorm/entities/02-ambientes";
import { OfertaFormacaoEntity } from "@/integrations/database/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import * as IDomainContracts from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("grade_horario_oferta_formacao_intervalo_de_tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoEntity implements IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: IDomainContracts.IntervaloDeTempo;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_grade_horario_oferta_formacao_fk" })
  gradeHorarioOfertaFormacao!: IDomainContracts.GradeHorarioOfertaFormacao;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
