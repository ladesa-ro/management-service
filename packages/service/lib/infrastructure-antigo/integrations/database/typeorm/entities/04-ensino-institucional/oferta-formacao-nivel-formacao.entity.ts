import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NivelFormacaoEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities/04-ensino-institucional/nivel-formacao.entity";
import { OfertaFormacaoEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";

@Entity("oferta_formacao_nivel_formacao")
export class OfertaFormacaoNivelFormacaoEntity implements IDomain.OfertaFormacaoNivelFormacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => NivelFormacaoEntity)
  @JoinColumn({ name: "id_nivel_formacao_fk" })
  nivelFormacao!: IDomain.NivelFormacao;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: IDomain.OfertaFormacao;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
