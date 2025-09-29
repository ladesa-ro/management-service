import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {
  OfertaFormacaoEntity
} from "@/infrastructure-antigo/integrations/database/typeorm/entities/04-ensino-institucional";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";
import {
  CampusDatabaseEntity
} from "../../../../../../features/campus/infrastructure/persistence/typeorm/entities/campus.database-entity";

@Entity("calendario_letivo")
export class CalendarioLetivoEntity implements IDomain.CalendarioLetivo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({name: "nome", type: "text"})
  nome!: string;

  @Column({name: "ano_letivo", type: "integer"})
  ano!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => CampusDatabaseEntity)
  @JoinColumn({name: "id_campus_fk"})
  campus!: IDomain.Campus;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({name: "id_oferta_formacao_fk"})
  ofertaFormacao!: IDomain.OfertaFormacao;

  @Column({name: "date_created", type: "timestamptz", nullable: false})
  dateCreated!: Date;

  @Column({name: "date_updated", type: "timestamptz", nullable: false})
  dateUpdated!: Date;

  @Column({name: "date_deleted", type: "timestamptz", nullable: true})
  dateDeleted!: null | Date;
}
