import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm/endereco.entity";
import { ModalidadeEntity } from "@/modules/modalidade/infrastructure/persistence/typeorm/modalidade.entity";
import { PerfilEntity } from "@/modules/perfil/infrastructure/persistence/typeorm/perfil.entity";

@Entity("campus")
export class CampusEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "nome_fantasia", type: "text", nullable: false })
  nomeFantasia!: string;

  @Column({ name: "razao_social", type: "text", nullable: false })
  razaoSocial!: string;

  @Column({ name: "apelido", type: "text", nullable: false })
  apelido!: string;

  @Column({ name: "cnpj", type: "text", nullable: false })
  cnpj!: string;

  @ManyToOne(() => EnderecoEntity)
  @JoinColumn({ name: "id_endereco_fk" })
  endereco!: Relation<EnderecoEntity>;

  @OneToMany(
    () => PerfilEntity,
    (vinculo) => vinculo.campus,
  )
  vinculos!: Relation<PerfilEntity>[];

  modalidades!: Relation<ModalidadeEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
