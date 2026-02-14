import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/modules/sisgea/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import { CalendarioLetivoEntity } from "@/modules/sisgha/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.entity";

@Entity("evento")
export class EventoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text" })
  nome!: string | null;

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  @Column({ name: "cor", type: "text" })
  cor!: string | null;

  @Column({ name: "data_inicio", type: "timestamp", nullable: true })
  dataInicio!: Date | null;

  @Column({ name: "data_fim", type: "timestamp", nullable: true })
  dataFim!: Date | null;

  //Chaves Estrangeiras

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: Relation<CalendarioLetivoEntity>;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: Relation<AmbienteEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
