import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

@Entity("estagio")
export class EstagioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => CampusEntity, { nullable: true })
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity> | null;

  @ManyToOne(() => EmpresaTypeormEntity)
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @ManyToOne(() => EstagiarioTypeormEntity, { nullable: true })
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity> | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_usuario_orientador_fk" })
  usuarioOrientador!: Relation<UsuarioEntity> | null;

  @ManyToOne(() => CursoEntity, { nullable: true })
  @JoinColumn({ name: "id_curso_fk" })
  CursoReferencia!: Relation<CursoEntity> | null;

  @Column({ name: "carga_horaria", type: "integer", nullable: false })
  cargaHoraria!: number;

  @Column({ name: "data_inicio", type: "date", nullable: true })
  dataInicio!: string | null;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: string | null;

  @Column({
    name: "status",
    type: "enum",
    enum: EstagioStatus,
    default: EstagioStatus.EM_FASE_INICIAL,
    nullable: false,
  })
  status!: EstagioStatus;

  @Column({ name: "nome_supervisor", type: "varchar", length: 255, nullable: true })
  nomeSupervisor!: string | null;

  @Column({ name: "email_supervisor", type: "varchar", length: 255, nullable: true })
  emailSupervisor!: string | null;

  @Column({ name: "telefone_supervisor", type: "varchar", length: 20, nullable: true })
  telefoneSupervisor!: string | null;

  @Column({ name: "aditivo", type: "boolean", default: false, nullable: false })
  aditivo!: boolean;

  @Column({ name: "tipo_aditivo", type: "varchar", length: 255, nullable: true })
  tipoAditivo!: string | null;

  @OneToMany(
    () => HorarioEstagioTypeormEntity,
    (horarioEstagio) => horarioEstagio.estagio,
  )
  horariosEstagio!: Relation<HorarioEstagioTypeormEntity[]>;

  // Campos adicionais do CSV
  @Column({ name: "data_prevista_fim", type: "date", nullable: true })
  dataPrevistaFim!: string | null;

  @Column({ name: "nome_seguradora", type: "varchar", length: 255, nullable: true })
  nomeSeguradora!: string | null;

  @Column({ name: "numero_apolice_seguro", type: "varchar", length: 100, nullable: true })
  numeroApoliceSeguro!: string | null;

  @Column({ name: "visitas_realizadas", type: "integer", nullable: true })
  visitasRealizadas!: number | null;

  @Column({ name: "visitas_justificadas", type: "integer", nullable: true })
  visitasJustificadas!: number | null;

  @Column({ name: "visitas_a_vencer", type: "integer", nullable: true })
  visitasAVencer!: number | null;

  @Column({ name: "visitas_nao_realizadas", type: "integer", nullable: true })
  visitasNaoRealizadas!: number | null;

  @Column({ name: "resumo_pendencias", type: "varchar", length: 1000, nullable: true })
  resumoPendencias!: string | null;

  @Column({ name: "encerramento_por", type: "varchar", length: 255, nullable: true })
  encerramentoPor!: string | null;

  @Column({ name: "motivacao_desligamento", type: "varchar", length: 1000, nullable: true })
  motivacaoDesligamento!: string | null;

  @Column({ name: "motivo_rescisao", type: "varchar", length: 1000, nullable: true })
  motivoRescisao!: string | null;

  @Column({
    name: "media_notas_supervisor",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
  })
  mediaNotasSupervisor!: number | null;

  @Column({ name: "foi_ou_sera_contratado", type: "boolean", nullable: true })
  foiOuSeraContratado!: boolean | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
