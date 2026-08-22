import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { CalendarioIndisponibilidadeAmbienteTipo } from "@/modules/calendario/indisponibilidade-ambiente/domain/calendario-indisponibilidade-ambiente.types";

@Entity("calendario_indisponibilidade_ambiente")
export class CalendarioIndisponibilidadeAmbienteEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: Relation<AmbienteEntity>;

  @Column({
    name: "tipo",
    type: "enum",
    enum: CalendarioIndisponibilidadeAmbienteTipo,
    nullable: false,
  })
  tipo!: CalendarioIndisponibilidadeAmbienteTipo;

  @Column({ name: "dia_semana", type: "smallint", nullable: true })
  diaSemana!: number | null;

  @Column({ name: "data", type: "date", nullable: true })
  data!: string | null;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;

  @Column({ name: "motivo", type: "text", nullable: true })
  motivo!: string | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
