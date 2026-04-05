import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

@Entity("calendario_letivo_etapa")
export class CalendarioLetivoEtapaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "identificador_externo", type: "uuid", nullable: false })
  identificadorExterno!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "cor", type: "text", nullable: false })
  cor!: string;

  @Column({ name: "ordem", type: "integer", nullable: false })
  ordem!: number;

  @Column({ name: "numero_periodo", type: "integer", nullable: false })
  numeroPeriodo!: number;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: string;

  @Column({ name: "data_termino", type: "date", nullable: false })
  dataTermino!: string;

  @ManyToOne(() => OfertaFormacaoPeriodoEtapaEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_periodo_etapa_fk" })
  ofertaFormacaoPeriodoEtapa!: Relation<OfertaFormacaoPeriodoEtapaEntity>;

  @ManyToOne(() => CalendarioLetivoEntity, {})
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @Column({ name: "version", type: "integer", nullable: false })
  version!: number;

  @ManyToOne(() => CalendarioLetivoEtapaEntity, { nullable: true })
  @JoinColumn({ name: "previous_version_id" })
  previousVersion!: Relation<CalendarioLetivoEtapaEntity> | null;

  @Column({ name: "previous_version_id", type: "uuid", nullable: true })
  previousVersionId!: string | null;

  @Column({ name: "valid_from", type: "timestamptz", nullable: false })
  validFrom!: string;

  @Column({ name: "valid_to", type: "timestamptz", nullable: true })
  validTo!: string | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
