import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";

@Entity("nivel_formacao")
export class NivelFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @ManyToOne(() => ImagemEntity, { nullable: true })
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
