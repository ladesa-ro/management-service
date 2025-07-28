import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/domain/contracts/integration";
import { IntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities/00-00-base";
import { DisponibilidadeEntity } from "./disponibilidade.entity";

@Entity("disponibilidade_dia")
export class DisponibilidadeDiaEntity implements IDomain.DisponibilidadeDia {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade__fk" })
  disponibilidade!: IDomain.DisponibilidadeFindOneOutput;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: IDomain.IntervaloDeTempoFindOneOutput;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
