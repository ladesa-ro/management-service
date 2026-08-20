import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { FolhaPontoTypeormEntity } from "./folha-ponto.typeorm.entity";

@Entity("folha_ponto_token")
export class FolhaPontoTokenTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => FolhaPontoTypeormEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_folha_ponto_fk" })
  folhaPonto!: Relation<FolhaPontoTypeormEntity>;

  // Coluna FK acessível diretamente — usada quando a relation não é carregada
  // (ex: queries com pessimistic lock que não permitem outer join + FOR UPDATE)
  @Column({ name: "id_folha_ponto_fk", nullable: true })
  folhaPontoId!: string;

  @Column({ name: "tipo", type: "varchar", length: 20 })
  tipo!: string;

  @Column({ name: "expires_at", type: "timestamptz" })
  expiresAt!: string;

  @Column({ name: "used_at", type: "timestamptz", nullable: true })
  usedAt!: string | null;

  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ipAddress!: string | null;

  @Column({ name: "user_agent", type: "text", nullable: true })
  userAgent!: string | null;

  @Column({ name: "date_created", type: "timestamptz" })
  dateCreated!: string;
}
