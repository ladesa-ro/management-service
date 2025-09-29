import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import {
  OfertaFormacaoEntity
} from "@/infrastructure-antigo/integrations/database/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";
import {
  CampusDatabaseEntity
} from "../../../../../../features/campus/infrastructure/persistence/typeorm/entities/campus.database-entity";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { TurmaEntity } from "../06-ensino-discente";

@Entity("curso")
export class CursoEntity implements IDomain.Curso {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({name: "nome", type: "text", nullable: false})
  nome!: string;

  @Column({name: "nome_abreviado", type: "text", nullable: false})
  nomeAbreviado!: string;

  @ManyToOne(() => CampusDatabaseEntity)
  @JoinColumn({name: "id_campus_fk"})
  campus!: Relation<CampusDatabaseEntity>;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({name: "id_oferta_formacao_fk"})
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({name: "id_imagem_capa_fk"})
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => TurmaEntity,
    (turma) => turma.curso,
  )
  turmas!: Relation<TurmaEntity>[];

  @Column({name: "date_created", type: "timestamptz", nullable: false})
  dateCreated!: Date;

  @Column({name: "date_updated", type: "timestamptz", nullable: false})
  dateUpdated!: Date;

  @Column({name: "date_deleted", type: "timestamptz", nullable: true})
  dateDeleted!: null | Date;
}
