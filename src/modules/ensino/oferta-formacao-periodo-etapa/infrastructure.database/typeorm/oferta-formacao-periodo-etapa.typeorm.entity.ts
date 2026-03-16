import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoPeriodoEntity } from "@/modules/ensino/oferta-formacao-periodo/infrastructure.database/typeorm/oferta-formacao-periodo.typeorm.entity";

@Entity("oferta_formacao_periodo_etapa")
export class OfertaFormacaoPeriodoEtapaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_oferta_formacao_periodo_fk", type: "uuid", nullable: false })
  idOfertaFormacaoPeriodoFk!: string;

  @ManyToOne(() => OfertaFormacaoPeriodoEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_periodo_fk" })
  ofertaFormacaoPeriodo!: Relation<OfertaFormacaoPeriodoEntity>;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "cor", type: "text", nullable: false })
  cor!: string;
}
