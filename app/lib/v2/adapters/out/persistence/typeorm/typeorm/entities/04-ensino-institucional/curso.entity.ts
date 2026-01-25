import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import {
  OfertaFormacaoEntity
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { CampusEntity } from "../02-ambientes/campus.entity";
import { TurmaEntity } from "../06-ensino-discente";

@Entity("curso")
export class CursoEntity implements IDomain.Curso {
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
  ofertaFormacao!: OfertaFormacaoEntity;

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
  dateDeleted!: null | Date;
}
