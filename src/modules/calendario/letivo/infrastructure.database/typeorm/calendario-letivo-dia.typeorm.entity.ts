import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import type { TipoCalendarioLetivoDia } from "@/modules/calendario/letivo/domain/calendario-letivo-dia";
import { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

@Entity("calendario_letivo_dia")
export class CalendarioLetivoDiaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: string;

  @Column({ name: "dia_letivo", type: "bool", nullable: false })
  diaLetivo!: boolean;

  @Column({ name: "feriado", type: "text", nullable: false })
  feriado!: string;

  @Column({ name: "dia_presencial", type: "bool", nullable: false })
  diaPresencial!: boolean;

  @Column({ name: "tipo", type: "varchar", length: 50, nullable: false, default: "Outro" })
  tipo!: TipoCalendarioLetivoDia;

  @Column({ name: "extra_curricular", type: "bool", nullable: false })
  extraCurricular!: boolean;

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: Relation<CalendarioLetivoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
