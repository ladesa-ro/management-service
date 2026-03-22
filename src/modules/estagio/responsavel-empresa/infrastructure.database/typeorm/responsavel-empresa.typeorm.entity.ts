import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";

@Entity("responsavel_empresa")
export class ResponsavelEmpresaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EmpresaTypeormEntity, {})
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @Column({ name: "nome_responsavel", type: "varchar", length: 35, nullable: false })
  nomeResponsavel!: string;

  @Column({ name: "email", type: "text", nullable: false })
  email!: string;

  @Column({ name: "telefone", type: "varchar", length: 15, nullable: false })
  telefone!: string;

  @Column({ name: "cpf", type: "varchar", length: 11, nullable: false })
  cpf!: string;

  @Column({ name: "cargo", type: "text", nullable: false })
  cargo!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
