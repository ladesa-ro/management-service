import { Column, Entity, PrimaryColumn } from "typeorm";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../../domain/calendario-agendamento.types";

export { CalendarioAgendamentoStatus, CalendarioAgendamentoTipo };

@Entity("calendario_agendamento")
export class CalendarioAgendamentoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "tipo", type: "enum", enum: CalendarioAgendamentoTipo, nullable: false })
  tipo!: CalendarioAgendamentoTipo;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  @Column({ name: "dia_inteiro", type: "boolean", nullable: false })
  diaInteiro!: boolean;

  @Column({ name: "horario_inicio", type: "time", nullable: false })
  horarioInicio!: string;

  @Column({ name: "horario_fim", type: "time", nullable: false })
  horarioFim!: string;

  @Column({ name: "repeticao", type: "text", nullable: true })
  repeticao!: string | null;

  @Column({ name: "nome", type: "text", nullable: true })
  nome!: string | null;

  @Column({ name: "cor", type: "text", nullable: true })
  cor!: string | null;

  @Column({ name: "status", type: "enum", enum: CalendarioAgendamentoStatus, nullable: true })
  status!: CalendarioAgendamentoStatus | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false, default: () => "NOW()" })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false, default: () => "NOW()" })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
