import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";

@Entity("horario_estagio")
export class HorarioEstagioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_estagio_fk", type: "uuid", nullable: false })
  idEstagioFk!: string;

  @ManyToOne(
    () => EstagioTypeormEntity,
    (estagio) => estagio.horariosEstagio,
    {},
  )
  @JoinColumn({ name: "id_estagio_fk" })
  estagio!: Relation<EstagioTypeormEntity>;

  @Column({ name: "dia_semana", type: "integer", nullable: false })
  diaSemana!: number;

  @Column({ name: "hora_inicio", type: "time", nullable: false })
  horaInicio!: string;

  @Column({ name: "hora_fim", type: "time", nullable: false })
  horaFim!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
