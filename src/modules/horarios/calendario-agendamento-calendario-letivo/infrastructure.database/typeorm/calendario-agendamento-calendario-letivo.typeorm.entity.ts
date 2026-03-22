import { Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioLetivoEntity } from "@/modules/horarios/calendario-letivo/infrastructure.database/typeorm/calendario-letivo.typeorm.entity";

@Entity("calendario_agendamento_calendario_letivo")
export class CalendarioAgendamentoCalendarioLetivoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => CalendarioLetivoEntity, {})
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
