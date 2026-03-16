import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CursoEntity } from "./curso.typeorm.entity";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure.database/typeorm/disciplina.typeorm.entity";

@Entity("curso_periodo_disciplina")
export class CursoPeriodoDisciplinaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_curso_fk", type: "uuid", nullable: false })
  idCursoFk!: string;

  @ManyToOne(() => CursoEntity, {})
  @JoinColumn({ name: "id_curso_fk" })
  curso!: Relation<CursoEntity>;

  @Column({ name: "numero_periodo", type: "integer", nullable: false })
  numeroPeriodo!: number;

  @Column({ name: "id_disciplina_fk", type: "uuid", nullable: false })
  idDisciplinaFk!: string;

  @ManyToOne(() => DisciplinaEntity, {})
  @JoinColumn({ name: "id_disciplina_fk" })
  disciplina!: Relation<DisciplinaEntity>;

  @Column({ name: "carga_horaria", type: "integer", nullable: true })
  cargaHoraria!: number | null;
}
