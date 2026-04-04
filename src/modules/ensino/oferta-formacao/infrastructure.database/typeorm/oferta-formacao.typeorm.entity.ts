import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";
import { ModalidadeEntity } from "@/modules/ensino/modalidade/infrastructure.database/typeorm/modalidade.typeorm.entity";
import { OfertaFormacaoNivelFormacaoEntity } from "./oferta-formacao-nivel-formacao.typeorm.entity";
import { OfertaFormacaoPeriodoEntity } from "./oferta-formacao-periodo.typeorm.entity";

@Entity("oferta_formacao")
export class OfertaFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "apelido", type: "text", nullable: false })
  slug!: string;

  @Column({ name: "duracao_periodo_em_meses", type: "integer", nullable: false })
  duracaoPeriodoEmMeses!: number;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: Relation<ModalidadeEntity>;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @OneToMany(
    () => OfertaFormacaoNivelFormacaoEntity,
    (ofeForNivFor) => ofeForNivFor.ofertaFormacao,
  )
  ofertaFormacaoNiveisFormacoes!: Relation<OfertaFormacaoNivelFormacaoEntity>[];

  @OneToMany(
    () => OfertaFormacaoPeriodoEntity,
    (periodo) => periodo.ofertaFormacao,
  )
  periodosEntities!: Relation<OfertaFormacaoPeriodoEntity>[];

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;
  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
