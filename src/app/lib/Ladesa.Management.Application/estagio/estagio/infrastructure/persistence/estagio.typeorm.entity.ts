import { Empresa, EmpresaTypeormEntity } from "@/Ladesa.Management.Application/estagio/empresa";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

/**
 * Entidade TypeORM para Estagio
 */

@Entity("estagio")
export class estagioTypeormEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "id_empresa_fk", type: "uuid", nullable: false })
    idEmpresaFk!: string;

    @Column({ name: "id_estagiario_fk", type: "uuid", nullable: true})
    idEstagiarioFk!: string;

    @Column({name: "carga_horaria", type: "integer", nullable: false})
    cargaHoraria!: string;

    @Column({ name:"data_inicio", type: "date", nullable: false})
    dataInicio!: string;

    @Column({name:"data_fim", type: "date", nullable: false})
    dataFim!: string;

    @Column({name:"status", type: "enum", nullable: false, default:"ABERTA", enum: ["ABERTA","EM_ANDAMENTO","CONCLUIDA"]})
    status!: string;

    @ManyToOne(() => EmpresaTypeormEntity, {})
    @JoinColumn({ name: "id_empresa_fk" })
    empresa!: Relation<EmpresaTypeormEntity>;

    // @OneToOne(() => EstagiarioTypeormEntity, {})
    // @JoinColumn({ name: "id_estagiario_fk"})
    // estagiario!: Relation<EstagiarioTypeormEntity>

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;

}
