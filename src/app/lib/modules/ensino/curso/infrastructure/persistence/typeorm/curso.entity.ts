import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure/persistence/typeorm/campus.entity";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.entity";

@Entity("curso")
export class CursoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "nome_abreviado", type: "text", nullable: false })
  nomeAbreviado!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: CampusEntity;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => TurmaEntity,
    (turma) => turma.curso,
  )
  turmas!: Relation<TurmaEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
