import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EmpresaAvaliacaoCurtidaTypeormEntity } from "./empresa-avaliacao-curtida.typeorm.entity";

@Entity("empresa_avaliacao")
export class EmpresaAvaliacaoTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EmpresaTypeormEntity)
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @ManyToOne(() => EstagiarioTypeormEntity)
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity>;

  @Column({ name: "rating", type: "smallint", nullable: false })
  rating!: number;

  @Column({ name: "comentario", type: "varchar", length: 2000, nullable: true })
  comentario!: string | null;

  @Column({
    name: "relevance_score",
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false,
    default: 0,
  })
  relevanceScore!: number;

  @Column({ name: "likes_count", type: "integer", nullable: false, default: 0 })
  likesCount!: number;

  @OneToMany(
    () => EmpresaAvaliacaoCurtidaTypeormEntity,
    (curtida) => curtida.avaliacao,
  )
  curtidas!: Relation<EmpresaAvaliacaoCurtidaTypeormEntity[]>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
