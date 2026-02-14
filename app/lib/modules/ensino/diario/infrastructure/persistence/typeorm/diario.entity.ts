import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ImagemEntity } from "@/modules/base/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.entity";
import { DiarioProfessorEntity } from "@/modules/ensino/diario-professor/infrastructure/persistence/typeorm/diario-professor.entity";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure/persistence/typeorm/disciplina.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.entity";
import { AmbienteEntity } from "@/modules/sisgea/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import { CalendarioLetivoEntity } from "@/modules/sisgha/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.entity";

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
