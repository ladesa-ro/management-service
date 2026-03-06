import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/AmbienteEntity";
import { CursoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CursoEntity";
import { DiarioEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioEntity";
import { ImagemEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ImagemEntity";

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
