import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoPeriodoEntity } from "./oferta-formacao-periodo.typeorm.entity";

@Entity("oferta_formacao_periodo_etapa")
export class OfertaFormacaoPeriodoEtapaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => OfertaFormacaoPeriodoEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_periodo_fk" })
  ofertaFormacaoPeriodo!: Relation<OfertaFormacaoPeriodoEntity>;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "cor", type: "text", nullable: false })
  cor!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
