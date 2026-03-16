import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { HorarioEdicaoSessaoEntity } from "./horario-edicao-sessao.typeorm.entity";

export enum HorarioEdicaoMudancaTipoOperacao {
  CRIAR = "CRIAR",
  MOVER = "MOVER",
  REMOVER = "REMOVER",
}

@Entity("horario_edicao_mudanca")
export class HorarioEdicaoMudancaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_sessao_fk", type: "uuid", nullable: false })
  idSessaoFk!: string;

  @ManyToOne(() => HorarioEdicaoSessaoEntity, { nullable: false })
  @JoinColumn({ name: "id_sessao_fk" })
  sessao!: Relation<HorarioEdicaoSessaoEntity>;

  @Column({ name: "id_calendario_agendamento_fk", type: "uuid", nullable: true })
  idCalendarioAgendamentoFk!: string | null;

  @ManyToOne(() => CalendarioAgendamentoEntity, { nullable: true })
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity> | null;

  @Column({ name: "tipo_operacao", type: "varchar", length: 20, nullable: false })
  tipoOperacao!: HorarioEdicaoMudancaTipoOperacao;

  @Column({ name: "dados", type: "jsonb", nullable: false })
  dados!: Record<string, unknown>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;
}
