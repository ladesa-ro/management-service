import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";

@Entity("empresa_score_historico")
export class EmpresaScoreHistoricoTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EmpresaTypeormEntity)
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @Column({
    name: "score",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
  })
  score!: number;

  @Column({
    name: "average_rating",
    type: "decimal",
    precision: 3,
    scale: 2,
    nullable: false,
  })
  averageRating!: number;

  @Column({ name: "total_reviews", type: "integer", nullable: false })
  totalReviews!: number;

  @Column({ name: "score_version", type: "integer", nullable: false })
  scoreVersion!: number;

  @Column({ name: "indicators_json", type: "jsonb", nullable: true })
  indicatorsJson!: Record<string, any> | null;

  @Column({ name: "calculated_at", type: "timestamptz", nullable: false })
  calculatedAt!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;
}
