import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_diario")
export class CalendarioAgendamentoDiarioEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_diario_fk", type: "uuid", nullable: false })
  idDiarioFk!: string;

  @ManyToOne(() => DiarioEntity, {})
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
