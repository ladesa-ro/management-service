import { Column, Entity, PrimaryColumn } from "typeorm";

export enum CalendarioAgendamentoTipo {
  INDISPONIBILIDADE = "INDISPONIBILIDADE",
  AULA = "AULA",
  EVENTO = "EVENTO",
  RESERVA = "RESERVA",
}

export enum CalendarioAgendamentoStatus {
  RASCUNHO = "RASCUNHO",
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

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
}
