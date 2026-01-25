import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { NivelFormacaoEntity } from "./nivel-formacao.entity";
import { OfertaFormacaoEntity } from "./oferta-formacao.entity";

@Entity("oferta_formacao_nivel_formacao")
export class OfertaFormacaoNivelFormacaoEntity {
  @PrimaryGeneratedColumn("uuid")
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
