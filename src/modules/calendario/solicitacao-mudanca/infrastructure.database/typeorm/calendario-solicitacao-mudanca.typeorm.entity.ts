import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CalendarioAgendamentoEntity } from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { HorarioEdicaoSessaoEntity } from "@/modules/calendario/horario-edicao/infrastructure.database/typeorm/horario-edicao-sessao.typeorm.entity";
import {
  CalendarioSolicitacaoMudancaStatus,
  CalendarioSolicitacaoMudancaTipoOperacao,
} from "@/modules/calendario/solicitacao-mudanca/domain/calendario-solicitacao-mudanca.types";

@Entity("calendario_solicitacao_mudanca")
export class CalendarioSolicitacaoMudancaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_autor_fk" })
  autor!: Relation<UsuarioEntity>;

  @ManyToOne(() => CalendarioAgendamentoEntity)
  @JoinColumn({ name: "id_calendario_agendamento_fk" })
  calendarioAgendamento!: Relation<CalendarioAgendamentoEntity>;

  @Column({
    name: "tipo_operacao",
    type: "enum",
    enum: CalendarioSolicitacaoMudancaTipoOperacao,
    nullable: false,
  })
  tipoOperacao!: CalendarioSolicitacaoMudancaTipoOperacao;

  @Column({ name: "dados_propostos", type: "jsonb", nullable: false })
  dadosPropostos!: Record<string, unknown>;

  @Column({ name: "justificativa", type: "text", nullable: false })
  justificativa!: string;

  @Column({
    name: "status",
    type: "enum",
    enum: CalendarioSolicitacaoMudancaStatus,
    default: CalendarioSolicitacaoMudancaStatus.ABERTA,
    nullable: false,
  })
  status!: CalendarioSolicitacaoMudancaStatus;

  @Column({ name: "motivo_recusa", type: "text", nullable: true })
  motivoRecusa!: string | null;

  @ManyToOne(() => HorarioEdicaoSessaoEntity, { nullable: true })
  @JoinColumn({ name: "id_sessao_edicao_fk" })
  sessaoEdicao!: Relation<HorarioEdicaoSessaoEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
