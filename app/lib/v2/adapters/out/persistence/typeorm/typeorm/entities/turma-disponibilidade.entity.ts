import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { DisponibilidadeEntity } from "./disponibilidade.entity";
import { TurmaEntity } from "./turma.entity";

@Entity("turma_disponibilidade")
export class TurmaDisponibilidadeEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //Chaves Estrangeiras

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade_fk" })
  disponibilidade!: Relation<DisponibilidadeEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
