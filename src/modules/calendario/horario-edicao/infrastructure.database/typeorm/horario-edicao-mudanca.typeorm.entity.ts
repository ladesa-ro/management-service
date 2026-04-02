import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CalendarioAgendamentoEntity } from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
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

  @ManyToOne(() => HorarioEdicaoSessaoEntity, { nullable: false })
  @JoinColumn({ name: "id_sessao_fk" })
  sessao!: Relation<HorarioEdicaoSessaoEntity>;

  @ManyToOne(() => CalendarioAgendamentoEntity, { nullable: true })
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity> | null;

  @Column({ name: "tipo_operacao", type: "varchar", length: 20, nullable: false })
  tipoOperacao!: HorarioEdicaoMudancaTipoOperacao;

  @Column({ name: "dados", type: "jsonb", nullable: false })
  dados!: Record<string, unknown>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;
}
