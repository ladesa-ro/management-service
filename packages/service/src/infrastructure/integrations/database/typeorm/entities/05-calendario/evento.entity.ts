import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

@Entity("evento")
export class EventoEntity implements LadesaTypings.Evento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text" })
  nome!: string | null;

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  @Column({ name: "cor", type: "text" })
  cor!: string | null;

  //Chaves Estrangeiras

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: LadesaTypings.CalendarioLetivo;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
