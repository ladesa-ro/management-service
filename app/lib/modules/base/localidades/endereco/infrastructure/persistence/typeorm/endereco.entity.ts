import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { CidadeEntity } from "@/modules/base/localidades/cidade/infrastructure/persistence/typeorm/cidade.entity";

@Entity("endereco")
export class EnderecoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "cep", type: "text", nullable: false })
  cep!: string;

  @Column({ name: "logradouro", type: "text", nullable: false })
  logradouro!: string;

  @Column({ name: "numero", type: "int", nullable: false })
  numero!: number;

  @Column({ name: "bairro", type: "text", nullable: false })
  bairro!: string;

  @Column({ name: "complemento", type: "text", nullable: true })
  complemento!: string | null;

  @Column({ name: "ponto_referencia", type: "text", nullable: true })
  pontoReferencia!: string | null;

  @ManyToOne(() => CidadeEntity, {})
  @JoinColumn({ name: "id_cidade_fk" })
  cidade!: Relation<CidadeEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
