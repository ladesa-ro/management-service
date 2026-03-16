import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "@/modules/acesso/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

@Entity("calendario_agendamento_professor")
export class CalendarioAgendamentoProfessorEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_perfil_fk", type: "uuid", nullable: false })
  idPerfilFk!: string;

  @ManyToOne(() => PerfilEntity, {})
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: false })
  idCalendarioAgendamentoFk!: string;

  @ManyToOne(() => CalendarioAgendamentoEntity, {})
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;
}
