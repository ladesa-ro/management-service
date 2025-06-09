import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnderecoEntity } from "../00-01-base-lugares/endereco.entity";
import { PerfilEntity } from "../03-autorizacao/perfil.entity";
import { ModalidadeEntity } from "../04-ensino-institucional/modalidade.entity";

@Entity("campus")
export class CampusEntity implements LadesaTypings.Campus {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome_fantasia", type: "text", nullable: false })
  nomeFantasia!: string;

  @Column({ name: "razao_social", type: "text", nullable: false })
  razaoSocial!: string;

  @Column({ name: "apelido", type: "text", nullable: false })
  apelido!: string;

  @Column({ name: "cnpj", type: "text", nullable: false })
  cnpj!: string;

  //

  @ManyToOne(() => EnderecoEntity)
  @JoinColumn({ name: "id_endereco_fk" })
  endereco!: LadesaTypings.Endereco;

  //

  @OneToMany(
    () => PerfilEntity,
    (vinculo) => vinculo.campus,
  )
  vinculos!: PerfilEntity[];

  modalidades!: ModalidadeEntity[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
