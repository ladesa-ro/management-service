import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure.database/typeorm/disciplina.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { CalendarioLetivoEntity } from "@/modules/horarios/calendario-letivo/infrastructure.database/typeorm/calendario-letivo.typeorm.entity";
import { DiarioProfessorEntity } from "./diario-professor.typeorm.entity";

@Entity("diario")
export class DiarioEntity {
  @PrimaryColumn("uuid")
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
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
