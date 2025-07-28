import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { type IDomain } from "@/domain/contracts/integration";
import { IntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities/00-00-base";
import { AmbienteEntity } from "../02-ambientes/ambiente.entity";
import { DiarioEntity } from "./index";

@Entity("aula")
export class AulaEntity implements IDomain.Aula {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @Column({ name: "modalidade", type: "text", nullable: true })
  modalidade!: string | null;

  // chaves estrangeiras

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: IntervaloDeTempoEntity;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: Relation<DiarioEntity>;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: AmbienteEntity | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
