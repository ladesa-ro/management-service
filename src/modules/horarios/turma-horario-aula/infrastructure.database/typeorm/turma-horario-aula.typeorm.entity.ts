import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { HorarioAulaEntity } from "@/modules/horarios/horario-aula/infrastructure.database/typeorm/horario-aula.typeorm.entity";

@Entity("turma_horario_aula")
export class TurmaHorarioAulaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_horario_aula_fk", type: "uuid", nullable: false })
  idHorarioAulaFk!: string;

  @ManyToOne(() => HorarioAulaEntity, {})
  @JoinColumn({ name: "id_horario_aula_fk" })
  horarioAula!: Relation<HorarioAulaEntity>;

  @Column({ name: "id_turma_fk", type: "uuid", nullable: false })
  idTurmaFk!: string;

  @ManyToOne(() => TurmaEntity, {})
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;
}
