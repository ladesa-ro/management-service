import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CalendarioLetivoEntity } from "@/modules/horarios/calendario-letivo/infrastructure.database/typeorm/calendario-letivo.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_calendario_letivo")
export class CalendarioAgendamentoCalendarioLetivoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_calendario_letivo_fk", type: "uuid", nullable: false })
  idCalendarioLetivoFk!: string;

  @ManyToOne(() => CalendarioLetivoEntity, {})
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
