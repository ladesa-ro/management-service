import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/domain/contracts/integration";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

@Entity("evento")
export class EventoEntity implements IDomain.Evento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text" })
  nome!: string | null;

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  @Column({ name: "cor", type: "text" })
  cor!: string | null;

  @Column({ name: "data_inicio", type: "timestamp", nullable: true })
  data_inicio!: Date | null;

  @Column({ name: "data_fim", type: "timestamp", nullable: true })
  data_fim!: Date | null;

  @Column({name: "local", type: "text", nullable: true})
  local!: string | null;

  //Chaves Estrangeiras

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: IDomain.CalendarioLetivo;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
