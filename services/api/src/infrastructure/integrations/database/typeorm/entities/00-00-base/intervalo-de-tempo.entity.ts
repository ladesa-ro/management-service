import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("intervalo_de_tempo")
export class IntervaloDeTempoEntity implements LadesaTypings.IntervaloDeTempo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "perido_inicio", type: "time", nullable: false })
  periodoInicio!: string;

  @Column({ name: "perido_fim", type: "time", nullable: false })
  periodoFim!: string;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
