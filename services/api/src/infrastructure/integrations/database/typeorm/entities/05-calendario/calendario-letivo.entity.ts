import { OfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities/04-ensino-institucional";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CampusEntity } from "../02-ambientes/campus.entity";

@Entity("calendario_letivo")
export class CalendarioLetivoEntity implements LadesaTypings.CalendarioLetivo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text" })
  nome!: string;

  @Column({ name: "ano_letivo", type: "integer" })
  ano!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: LadesaTypings.Campus;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: LadesaTypings.OfertaFormacao;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
