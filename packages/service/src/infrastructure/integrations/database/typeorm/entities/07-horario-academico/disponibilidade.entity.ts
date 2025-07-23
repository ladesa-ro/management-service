import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("disponibilidade")
export class DisponibilidadeEntity implements LadesaTypings.Disponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
