import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

@Entity("etapa")
export class EtapaEntity implements LadesaTypings.Etapa {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "numero", type: "int" })
  numero!: number | null;

  @Column({ name: "data_inicio", type: "timestamptz", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_termino", type: "timestamptz", nullable: false })
  dataTermino!: Date;

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
