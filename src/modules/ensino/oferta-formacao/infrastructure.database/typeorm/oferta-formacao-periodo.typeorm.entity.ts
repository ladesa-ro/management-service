import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { OfertaFormacaoEntity } from "./oferta-formacao.typeorm.entity";
import { OfertaFormacaoPeriodoEtapaEntity } from "./oferta-formacao-periodo-etapa.typeorm.entity";

@Entity("oferta_formacao_periodo")
export class OfertaFormacaoPeriodoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => OfertaFormacaoEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({ name: "numero_periodo", type: "integer", nullable: false })
  numeroPeriodo!: number;

  @OneToMany(
    () => OfertaFormacaoPeriodoEtapaEntity,
    (etapa) => etapa.ofertaFormacaoPeriodo,
  )
  etapas!: Relation<OfertaFormacaoPeriodoEtapaEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
