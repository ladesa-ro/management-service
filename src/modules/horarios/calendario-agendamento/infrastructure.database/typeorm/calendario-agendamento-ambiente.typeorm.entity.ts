import { Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { CalendarioAgendamentoEntity } from "./calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_ambiente")
export class CalendarioAgendamentoAmbienteEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => AmbienteEntity, {})
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: Relation<AmbienteEntity>;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
