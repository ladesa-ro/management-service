import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_ambiente")
export class CalendarioAgendamentoAmbienteEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_ambiente_fk", type: "uuid", nullable: false })
  idAmbienteFk!: string;

  @ManyToOne(() => AmbienteEntity, {})
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: Relation<AmbienteEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
