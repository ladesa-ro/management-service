import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import type {
  EstagioSolicitacaoSituacao,
  EstagioSolicitacaoTipo,
} from "../../domain/estagio-solicitacao.fields";

@Entity("estagio_solicitacao")
export class EstagioSolicitacaoTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({
    name: "tipo",
    type: "enum",
    enum: ["INTERNO", "EXTERNO"],
    nullable: false,
  })
  tipo!: EstagioSolicitacaoTipo;

  @Column({
    name: "situacao",
    type: "enum",
    enum: ["PENDENTE", "EM_ANALISE", "DEFERIDA", "INDEFERIDA", "CANCELADA"],
    default: "PENDENTE",
    nullable: false,
  })
  situacao!: EstagioSolicitacaoSituacao;

  @ManyToOne(() => EstagiarioTypeormEntity)
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity>;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_professor_orientador_fk" })
  professorOrientador!: Relation<UsuarioEntity> | null;

  @Column({ name: "local_interno", type: "varchar", length: 255, nullable: true })
  localInterno!: string | null;

  @Column({ name: "descricao_atividades", type: "text", nullable: true })
  descricaoAtividades!: string | null;

  @ManyToOne(() => EmpresaTypeormEntity, { nullable: true })
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity> | null;

  @Column({ name: "empresa_razao_social", type: "varchar", length: 255, nullable: true })
  empresaRazaoSocial!: string | null;

  @Column({ name: "empresa_nome_fantasia", type: "varchar", length: 255, nullable: true })
  empresaNomeFantasia!: string | null;

  @Column({ name: "empresa_cnpj", type: "varchar", length: 20, nullable: true })
  empresaCnpj!: string | null;

  @Column({ name: "empresa_telefone", type: "varchar", length: 20, nullable: true })
  empresaTelefone!: string | null;

  @Column({ name: "empresa_email", type: "varchar", length: 255, nullable: true })
  empresaEmail!: string | null;

  @Column({ name: "supervisor_nome", type: "varchar", length: 255, nullable: true })
  supervisorNome!: string | null;

  @Column({ name: "supervisor_email", type: "varchar", length: 255, nullable: true })
  supervisorEmail!: string | null;

  @Column({ name: "supervisor_telefone", type: "varchar", length: 20, nullable: true })
  supervisorTelefone!: string | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_analista_fk" })
  analista!: Relation<UsuarioEntity> | null;

  @Column({ name: "parecer_analise", type: "text", nullable: true })
  parecerAnalise!: string | null;

  @Column({ name: "data_analise", type: "timestamptz", nullable: true })
  dataAnalise!: string | null;

  @ManyToOne(() => EstagioTypeormEntity, { nullable: true })
  @JoinColumn({ name: "id_estagio_gerado_fk" })
  estagioGerado!: Relation<EstagioTypeormEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
