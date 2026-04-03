import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";

@Entity("curso")
export class CursoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "nome_abreviado", type: "text", nullable: false })
  nomeAbreviado!: string;

  @Column({ name: "quantidade_periodos", type: "integer", nullable: false, default: 1 })
  quantidadePeriodos!: number;

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
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
