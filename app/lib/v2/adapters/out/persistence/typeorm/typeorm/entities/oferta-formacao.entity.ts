import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ModalidadeEntity } from "./modalidade.entity";
import { NivelFormacaoEntity } from "./nivel-formacao.entity";
import { OfertaFormacaoNivelFormacaoEntity } from "./oferta-formacao-nivel-formacao.entity";

@Entity("oferta_formacao")
export class OfertaFormacaoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: Relation<ModalidadeEntity>;

  @OneToMany(
    () => OfertaFormacaoNivelFormacaoEntity,
    (ofeForNivFor) => ofeForNivFor.ofertaFormacao,
  )
  ofertaFormacaoNiveisFormacoes!: Relation<OfertaFormacaoNivelFormacaoEntity>[];

  niveisFormacoes!: Relation<NivelFormacaoEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;
  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;

  @AfterLoad()
  updateNiveisFormacoes() {
    this.niveisFormacoes = this.ofertaFormacaoNiveisFormacoes?.map(
      ({ nivelFormacao }) => nivelFormacao,
    );
  }
}
