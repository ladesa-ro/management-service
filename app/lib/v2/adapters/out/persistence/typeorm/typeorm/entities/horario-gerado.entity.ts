import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import {
  CalendarioLetivoEntity
} from "./calendario-letivo.entity";

@Entity("horario_gerado")
export class HorarioGeradoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "status", type: "text", nullable: true })
  status!: string | null;

  @Column({ name: "tipo", type: "text", nullable: true })
  tipo!: string | null;

  @Column({ name: "data_geracao", type: "timestamptz", nullable: false })
  dataGeracao!: Date | null;

  @Column({ name: "vigencia_inicio", type: "timestamptz", nullable: false })
  vigenciaInicio!: Date | null;

  @Column({ name: "vigencia_fim", type: "timestamptz", nullable: false })
  vigenciaFim!: Date | null;

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
