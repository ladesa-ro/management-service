import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";

@Entity("diario_preferencia_agrupamento")
export class DiarioPreferenciaAgrupamentoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "data_inicio", type: "timestamptz", nullable: false })
  dataInicio!: string;

  @Column({ name: "data_fim", type: "timestamptz", nullable: true })
  dataFim!: string | null;

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  @Column({ name: "aulas_seguidas", type: "int", nullable: false })
  aulasSeguidas!: number;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
