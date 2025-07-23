import { ModalidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities/04-ensino-institucional/modalidade.entity";
import { OfertaFormacaoNivelFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities/04-ensino-institucional/oferta-formacao-nivel-formacao.entity";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";

@Entity("oferta_formacao")
export class OfertaFormacaoEntity implements LadesaTypings.OfertaFormacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: ModalidadeEntity;

  @OneToMany(
    () => OfertaFormacaoNivelFormacaoEntity,
    (ofeForNivFor) => ofeForNivFor.ofertaFormacao,
  )
  ofertaFormacaoNiveisFormacoes!: Relation<LadesaTypings.OfertaFormacaoNivelFormacao>[];

  niveisFormacoes!: Relation<LadesaTypings.NivelFormacao>[];

  @AfterLoad()
  updateNiveisFormacoes() {
    this.niveisFormacoes = this.ofertaFormacaoNiveisFormacoes?.map(({ nivelFormacao }) => nivelFormacao);
  }

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
