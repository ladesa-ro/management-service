import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { type TipoDiaCalendario } from "@/v2/server/modules/dia-calendario/http/dto";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

@Entity("dia_calendario")
export class DiaCalendarioEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @Column({ name: "dia_letivo", type: "bool", nullable: false })
  diaLetivo!: boolean;

  @Column({ name: "feriado", type: "text", nullable: false })
  feriado!: string;

  @Column({ name: "dia_presencial", type: "bool", nullable: false })
  diaPresencial!: boolean;

  @Column({ name: "tipo", type: "varchar", length: 50, nullable: false, default: "Outro" })
  tipo!: TipoDiaCalendario;

  @Column({ name: "extra_curricular", type: "bool", nullable: false })
  extraCurricular!: boolean;

  //Chaves Estrangeiras

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: Relation<CalendarioLetivoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
