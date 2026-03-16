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
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";

@Entity("turma")
export class TurmaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "periodo", type: "text", nullable: false })
  periodo!: string;

  @Column({ name: "nome", type: "text", nullable: true })
  nome!: string | null;

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
