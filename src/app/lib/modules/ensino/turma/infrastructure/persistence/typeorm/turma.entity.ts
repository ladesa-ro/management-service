import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.entity";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.entity";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure/persistence/typeorm/diario.entity";

@Entity("turma")
export class TurmaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "periodo", type: "text", nullable: false })
  periodo!: string;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_padrao_aula_fk" })
  ambientePadraoAula!: Relation<AmbienteEntity> | null;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: "id_curso_fk" })
  curso!: Relation<CursoEntity>;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => DiarioEntity,
    (diario) => diario.turma,
  )
  diarios!: Relation<DiarioEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
