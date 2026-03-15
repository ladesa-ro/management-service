import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { NivelFormacaoEntity } from "@/modules/ensino/nivel-formacao/infrastructure.database/typeorm/nivel-formacao.typeorm.entity";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";

@Entity("oferta_formacao_nivel_formacao")
export class OfertaFormacaoNivelFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => NivelFormacaoEntity)
  @JoinColumn({ name: "id_nivel_formacao_fk" })
  nivelFormacao!: Relation<NivelFormacaoEntity>;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
