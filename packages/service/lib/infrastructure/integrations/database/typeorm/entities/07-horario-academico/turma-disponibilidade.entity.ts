import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/domain/contracts/integration";
import { DisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities/07-horario-academico/disponibilidade.entity";
import { TurmaEntity } from "../06-ensino-discente";

@Entity("turma_disponibilidade")
export class TurmaDisponibilidadeEntity implements IDomain.TurmaDisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //Chaves Estrangeiras

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: IDomain.Turma;

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade_fk" })
  disponibilidade!: IDomain.Disponibilidade;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
