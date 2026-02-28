import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { EnderecoEntity } from "@/modules/localidades/endereco/infrastructure/persistence/typeorm/endereco.entity";

/**
 * Entidade TypeORM para Empresa
 */
@Entity("empresa")
export class EmpresaTypeormEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "razao_social", type: "text", nullable: false })
  razaoSocial!: string;

  @Column({ name: "nome_fantasia", type: "text", nullable: false })
  nomeFantasia!: string;

  @Column({ name: "cnpj", type: "varchar", length: 14, nullable: false })
  cnpj!: string;

  @Column({ name: "telefone", type: "varchar", length: 15, nullable: false })
  telefone!: string;

  @Column({ name: "email", type: "text", nullable: false })
  email!: string;

  @Column({ name: "id_endereco_fk", type: "uuid", nullable: false })
  idEnderecoFk!: string;

  @ManyToOne(() => EnderecoEntity, {})
  @JoinColumn({ name: "id_endereco_fk" })
  endereco!: Relation<EnderecoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
