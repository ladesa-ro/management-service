import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";

@Entity("turma_disponibilidade_configuracao")
export class TurmaDisponibilidadeConfiguracaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => TurmaEntity, {})
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: string;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: string | null;

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;

  @Column({ name: "identificador_externo_grade_horaria", type: "uuid", nullable: true })
  identificadorExternoGradeHoraria!: string | null;
}
