import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { AmbienteEntity } from "../02-ambientes/ambiente.entity";
import { CursoEntity } from "../04-ensino-institucional/curso.entity";

@Entity("turma")
export class TurmaEntity implements LadesaTypings.Turma {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "periodo", type: "text", nullable: false })
  periodo!: string;

  //

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_padrao_aula_fk" })
  ambientePadraoAula!: AmbienteEntity | null;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: "id_curso_fk" })
  curso!: CursoEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
