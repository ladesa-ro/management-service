import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_turma")
export class CalendarioAgendamentoTurmaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_turma_fk", type: "uuid", nullable: false })
  idTurmaFk!: string;

  @ManyToOne(() => TurmaEntity, {})
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
