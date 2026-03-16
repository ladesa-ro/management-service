import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { ModalidadeEntity } from "@/modules/ensino/modalidade/infrastructure.database/typeorm/modalidade.typeorm.entity";
import { NivelFormacaoEntity } from "@/modules/ensino/nivel-formacao/infrastructure.database/typeorm/nivel-formacao.typeorm.entity";
import { OfertaFormacaoNivelFormacaoEntity } from "./oferta-formacao-nivel-formacao.typeorm.entity";

export enum DuracaoPeriodo {
  SEMESTRAL = "SEMESTRAL",
  ANUAL = "ANUAL",
  TRIMESTRAL = "TRIMESTRAL",
  QUADRIMESTRAL = "QUADRIMESTRAL",
}

@Entity("oferta_formacao")
export class OfertaFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "apelido", type: "text", nullable: false })
  slug!: string;

  @Column({ name: "duracao_periodo", type: "text", nullable: true })
  duracaoPeriodo!: DuracaoPeriodo | null;

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
