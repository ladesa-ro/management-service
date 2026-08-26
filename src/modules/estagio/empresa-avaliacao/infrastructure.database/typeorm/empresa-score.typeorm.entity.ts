import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, type Relation } from "typeorm";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";

@Entity("empresa_score")
export class EmpresaScoreTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @OneToOne(() => EmpresaTypeormEntity)
  @JoinColumn({ name: "id_empresa_fk" })
  empresa!: Relation<EmpresaTypeormEntity>;

  @Column({
    name: "score",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
    default: 0,
  })
  score!: number;

  @Column({
    name: "average_rating",
    type: "decimal",
    precision: 3,
    scale: 2,
    nullable: false,
    default: 0,
  })
  averageRating!: number;

  @Column({ name: "total_reviews", type: "integer", nullable: false, default: 0 })
  totalReviews!: number;

  @Column({
    name: "distribution",
    type: "jsonb",
    nullable: false,
    default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  })
  distribution!: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };

  @Column({ name: "score_version", type: "integer", nullable: false, default: 1 })
  scoreVersion!: number;

  @Column({ name: "indicators_json", type: "jsonb", nullable: true })
  indicatorsJson!: Record<string, any> | null;

  @Column({ name: "calculated_at", type: "timestamptz", nullable: false })
  calculatedAt!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
