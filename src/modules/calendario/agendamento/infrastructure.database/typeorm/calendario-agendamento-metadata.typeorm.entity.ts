import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("calendario_agendamento_metadata")
export class CalendarioAgendamentoMetadataEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "identificador_externo_calendario_agendamento", type: "uuid", nullable: false })
  identificadorExternoCalendarioAgendamento!: string;

  @Column({ name: "nome", type: "text", nullable: true })
  nome!: string | null;

  @Column({ name: "cor", type: "text", nullable: true })
  cor!: string | null;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;
}
