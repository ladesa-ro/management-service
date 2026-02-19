import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure/persistence/typeorm/diario.entity";
import { IntervaloDeTempoEntity } from "@/modules/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.entity";

@Entity("diario_preferencia_agrupamento")
export class DiarioPreferenciaAgrupamentoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data_inicio", type: "timestamptz", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "timestamptz", nullable: true })
  dataFim!: Date | null;

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  @Column({ name: "aulas_seguidas", type: "int", nullable: false })
  aulasSeguidas!: number;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: Relation<IntervaloDeTempoEntity>;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
