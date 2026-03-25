import { Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { ModalidadeEntity } from "@/modules/ensino/modalidade/infrastructure.database/typeorm/modalidade.typeorm.entity";
import { CalendarioAgendamentoEntity } from "./calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_modalidade")
export class CalendarioAgendamentoModalidadeEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => ModalidadeEntity, {})
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: Relation<ModalidadeEntity>;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
