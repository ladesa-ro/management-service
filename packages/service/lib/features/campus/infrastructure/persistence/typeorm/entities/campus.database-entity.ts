import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { EnderecoDatabaseEntity } from "@/features/endereco";
import { ModalidadeEntity, PerfilEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities";

@Entity("campus")
export class CampusDatabaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({name: "nome_fantasia", type: "text", nullable: false})
  nomeFantasia!: string;

  @Column({name: "razao_social", type: "text", nullable: false})
  razaoSocial!: string;

  @Column({name: "apelido", type: "text", nullable: false})
  apelido!: string;

  @Column({name: "cnpj", type: "text", nullable: false})
  cnpj!: string;

  @ManyToOne(() => EnderecoDatabaseEntity)
  @JoinColumn({name: "id_endereco_fk"})
  endereco!: Relation<EnderecoDatabaseEntity>;

  @OneToMany(
    () => PerfilEntity,
    (vinculo) => vinculo.campus,
  )
  vinculos!: Relation<PerfilEntity>[];

  modalidades!: Relation<ModalidadeEntity>[];

  @Column({name: "date_created", type: "timestamptz", nullable: false})
  dateCreated!: string;

  @Column({name: "date_updated", type: "timestamptz", nullable: false})
  dateUpdated!: string;

  @Column({name: "date_deleted", type: "timestamptz", nullable: true})
  dateDeleted!: null | string;
}
