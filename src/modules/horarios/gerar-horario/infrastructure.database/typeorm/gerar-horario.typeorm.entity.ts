import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";

export enum GerarHorarioStatus {
  SOLICITADO = "SOLICITADO",
  PENDENTE = "PENDENTE",
  SUCESSO = "SUCESSO",
  ERRO = "ERRO",
}

export enum GerarHorarioDuracao {
  TEMPORARIO = "TEMPORARIO",
  PERMANENTE = "PERMANENTE",
}

@Entity("gerar_horario")
export class GerarHorarioEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "status", type: "enum", enum: GerarHorarioStatus, nullable: false })
  status!: GerarHorarioStatus;

  @Column({ name: "duracao", type: "enum", enum: GerarHorarioDuracao, nullable: false })
  duracao!: GerarHorarioDuracao;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_termino", type: "date", nullable: true })
  dataTermino!: Date | null;

  @Column({ name: "requisicao_gerador", type: "jsonb", nullable: true })
  requisicaoGerador!: Record<string, unknown> | null;

  @Column({ name: "resposta_gerador", type: "jsonb", nullable: true })
  respostaGerador!: Record<string, unknown> | null;

  @Column({ name: "id_usuario_geracao_fk", type: "uuid", nullable: true })
  idUsuarioGeracaoFk!: string | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_usuario_geracao_fk" })
  usuarioGeracao!: Relation<UsuarioEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;
}
