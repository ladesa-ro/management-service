import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.typeorm.entity";

@Entity("diario_preferencia_agrupamento_aulas")
export class DiarioPreferenciaAgrupamentoAulasEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "dia_semana", type: "integer", nullable: true })
  diaSemana!: number | null;

  @Column({ name: "aulas_seguidas", type: "integer", nullable: false })
  aulasSeguidas!: number;

  @Column({ name: "horario_inicio", type: "time", nullable: true })
  horarioInicio!: string | null;

  @Column({ name: "horario_termino", type: "time", nullable: true })
  horarioTermino!: string | null;

  @ManyToOne(() => DiarioPreferenciaAgrupamentoEntity, {})
  @JoinColumn({ name: "id_diario_preferencia_agrupamento_fk" })
  diarioPreferenciaAgrupamento!: Relation<DiarioPreferenciaAgrupamentoEntity>;
}
