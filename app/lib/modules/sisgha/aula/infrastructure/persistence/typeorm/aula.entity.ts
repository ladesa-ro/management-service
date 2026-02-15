import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure/persistence/typeorm/diario.entity";
import { AmbienteEntity } from "@/modules/sisgea/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import { IntervaloDeTempoEntity } from "@/modules/sisgha/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.entity";

@Entity("aula")
export class AulaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @Column({ name: "modalidade", type: "text", nullable: true })
  modalidade!: string | null;

  // chaves estrangeiras

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: Relation<IntervaloDeTempoEntity>;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

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
