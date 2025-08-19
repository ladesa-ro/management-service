import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { IntervaloDeTempoEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities/00-00-base";
import { DiarioEntity } from "../06-ensino-discente";

@Entity("diario_preferencia_agrupamento")
export class DiarioPreferenciaAgrupamentoEntity implements IDomain.DiarioPreferenciaAgrupamento {
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
  intervaloDeTempo!: IDomain.IntervaloDeTempo;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: IDomain.Diario;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
