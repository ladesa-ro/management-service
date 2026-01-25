import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "./ambiente.entity";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";
import { DiarioProfessorEntity } from "./diario-professor.entity";
import { DisciplinaEntity } from "./disciplina.entity";
import { ImagemEntity } from "./imagem.entity";
import { TurmaEntity } from "./turma.entity";

@Entity("diario")
export class DiarioEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: "id_disciplina_fk" })
  disciplina!: Relation<DisciplinaEntity>;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_padrao_fk" })
  ambientePadrao!: Relation<AmbienteEntity> | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => DiarioProfessorEntity,
    (diarioProfessor) => diarioProfessor.diario,
  )
  diariosProfessores!: Relation<DiarioProfessorEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
