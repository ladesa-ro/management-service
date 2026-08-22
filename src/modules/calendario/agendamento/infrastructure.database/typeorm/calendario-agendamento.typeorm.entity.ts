import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { CalendarioColecaoEntity } from "@/modules/calendario/colecao/infrastructure.database/typeorm/calendario-colecao.typeorm.entity";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../../domain/calendario-agendamento.types";

export { CalendarioAgendamentoStatus, CalendarioAgendamentoTipo };

@Entity("calendario_agendamento")
export class CalendarioAgendamentoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "identificador_externo", type: "uuid", nullable: false })
  identificadorExterno!: string;

  @Column({ name: "tipo", type: "enum", enum: CalendarioAgendamentoTipo, nullable: false })
  tipo!: CalendarioAgendamentoTipo;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: string;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: string | null;

  @Column({ name: "dia_inteiro", type: "boolean", nullable: false })
  diaInteiro!: boolean;

  @Column({ name: "horario_inicio", type: "time", nullable: false })
  horarioInicio!: string;

  @Column({ name: "horario_fim", type: "time", nullable: false })
  horarioFim!: string;

  @Column({ name: "repeticao", type: "text", nullable: true })
  repeticao!: string | null;

  @ManyToOne(() => CampusEntity, { nullable: true })
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity> | null;

  @ManyToOne(() => CalendarioColecaoEntity, { nullable: true })
  @JoinColumn({ name: "id_colecao_fk" })
  colecao!: Relation<CalendarioColecaoEntity> | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_autor_fk" })
  autor!: Relation<UsuarioEntity> | null;

  @Column({ name: "motivo", type: "text", nullable: true })
  motivo!: string | null;

  @Column({ name: "identificador_externo_serie_origem", type: "uuid", nullable: true })
  identificadorExternoSerieOrigem!: string | null;

  @Column({ name: "data_ocorrencia_referenciada", type: "date", nullable: true })
  dataOcorrenciaReferenciada!: string | null;

  // nome e cor permanecem na entity para leitura/backcompat, mas a fonte de verdade eh a tabela metadata
  @Column({ name: "nome", type: "text", nullable: true })
  nome!: string | null;

  @Column({ name: "cor", type: "text", nullable: true })
  cor!: string | null;

  @Column({ name: "status", type: "enum", enum: CalendarioAgendamentoStatus, nullable: true })
  status!: CalendarioAgendamentoStatus | null;

  @Column({ name: "version", type: "integer", nullable: false })
  version!: number;

  @Column({ name: "previous_version_id", type: "uuid", nullable: true })
  previousVersionId!: string | null;

  @Column({ name: "valid_from", type: "timestamptz", nullable: false })
  validFrom!: string;

  @Column({ name: "valid_to", type: "timestamptz", nullable: true })
  validTo!: string | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false, default: () => "NOW()" })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false, default: () => "NOW()" })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
