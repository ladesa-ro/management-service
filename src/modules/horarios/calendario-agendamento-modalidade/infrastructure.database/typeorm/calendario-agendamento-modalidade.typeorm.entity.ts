import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { ModalidadeEntity } from "@/modules/ensino/modalidade/infrastructure.database/typeorm/modalidade.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_modalidade")
export class CalendarioAgendamentoModalidadeEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_modalidade_fk", type: "uuid", nullable: false })
  idModalidadeFk!: string;

  @ManyToOne(() => ModalidadeEntity, {})
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: Relation<ModalidadeEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
