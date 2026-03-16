import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao-periodo-etapa/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

@Entity("calendario_letivo_etapa")
export class CalendarioLetivoEtapaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_termino", type: "date", nullable: false })
  dataTermino!: Date;

  @Column({ name: "id_oferta_formacao_periodo_etapa_fk", type: "uuid", nullable: false })
  idOfertaFormacaoPeriodoEtapaFk!: string;

  @ManyToOne(() => OfertaFormacaoPeriodoEtapaEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_periodo_etapa_fk" })
  ofertaFormacaoPeriodoEtapa!: Relation<OfertaFormacaoPeriodoEtapaEntity>;

  @Column({ name: "id_calendario_letivo_fk", type: "uuid", nullable: false })
  idCalendarioLetivoFk!: string;

  @ManyToOne(() => CalendarioLetivoEntity, {})
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
