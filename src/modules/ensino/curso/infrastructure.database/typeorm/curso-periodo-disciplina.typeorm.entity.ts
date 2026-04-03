import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure.database/typeorm/disciplina.typeorm.entity";
import { CursoEntity } from "./curso.typeorm.entity";

@Entity("curso_periodo_disciplina")
export class CursoPeriodoDisciplinaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(
    () => CursoEntity,
    (curso) => curso.periodoDisciplinas,
  )
  @JoinColumn({ name: "id_curso_fk" })
  curso!: Relation<CursoEntity>;

  @Column({ name: "numero_periodo", type: "integer", nullable: false })
  numeroPeriodo!: number;

  @ManyToOne(() => DisciplinaEntity, {})
  @JoinColumn({ name: "id_disciplina_fk" })
  disciplina!: Relation<DisciplinaEntity>;

  @Column({ name: "carga_horaria", type: "integer", nullable: true })
  cargaHoraria!: number | null;
}
