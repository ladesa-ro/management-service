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
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

@Entity("estagio")
export class EstagioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_empresa_fk", type: "uuid", nullable: false })
  idEmpresaFk!: string;

  @ManyToOne(() => EmpresaTypeormEntity, {})
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @Column({ name: "id_estagiario_fk", type: "uuid", nullable: true })
  idEstagiarioFk!: string | null;

  @ManyToOne(() => EstagiarioTypeormEntity, { nullable: true })
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity> | null;

  @Column({ name: "carga_horaria", type: "integer", nullable: false })
  cargaHoraria!: number;

  @Column({ name: "data_inicio", type: "date", nullable: true })
  dataInicio!: Date | null;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  @Column({
    name: "status",
    type: "enum",
    enum: EstagioStatus,
    default: EstagioStatus.ABERTA,
    nullable: false,
  })
  status!: EstagioStatus;

  @OneToMany(
    () => HorarioEstagioTypeormEntity,
    (horarioEstagio) => horarioEstagio.estagio,
  )
  horariosEstagio!: Relation<HorarioEstagioTypeormEntity[]>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
