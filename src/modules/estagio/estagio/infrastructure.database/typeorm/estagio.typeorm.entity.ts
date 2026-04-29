import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

@Entity("estagio")
export class EstagioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EmpresaTypeormEntity)
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @ManyToOne(() => EstagiarioTypeormEntity, { nullable: true })
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity> | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_usuario_orientador_fk" })
  usuarioOrientador!: Relation<UsuarioEntity> | null;

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

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
