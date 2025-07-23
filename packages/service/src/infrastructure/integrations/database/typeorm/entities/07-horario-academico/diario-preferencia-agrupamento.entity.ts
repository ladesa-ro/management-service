import { IntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities/00-00-base";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiarioEntity } from "../06-ensino-discente";

@Entity("diario_preferencia_agrupamento")
export class DiarioPreferenciaAgrupamentoEntity implements LadesaTypings.DiarioPreferenciaAgrupamento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data_inicio", type: "timestamptz", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "timestamptz", nullable: true })
  dataFim!: Date | null;

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  @Column({ name: "aulas_seguidas", type: "int", nullable: false })
  aulasSeguidas!: number;

  //

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: LadesaTypings.IntervaloDeTempo;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: LadesaTypings.Diario;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
