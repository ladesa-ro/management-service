import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";
import { IntervaloDeTempoEntity } from "@/modules/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.entity";

@Entity("grade_horario_oferta_formacao_intervalo_de_tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: Relation<IntervaloDeTempoEntity>;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_grade_horario_oferta_formacao_fk" })
  gradeHorarioOfertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
