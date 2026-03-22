import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";

@Entity("oferta_formacao_periodo")
export class OfertaFormacaoPeriodoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => OfertaFormacaoEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({ name: "numero_periodo", type: "integer", nullable: false })
  numeroPeriodo!: number;
}
