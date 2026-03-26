import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { BlocoEntity } from "@/modules/ambientes/bloco/infrastructure.database/typeorm/bloco.typeorm.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";

@Entity("ambiente")
export class AmbienteEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "descricao", type: "text", nullable: true })
  descricao!: string | null;

  @Column({ name: "codigo", type: "text", nullable: false })
  codigo!: string;

  @Column({ name: "capacidade", type: "int", nullable: true })
  capacidade!: number | null;

  @Column({ name: "tipo", type: "text", nullable: true })
  tipo!: string | null;

  @ManyToOne(() => BlocoEntity)
  @JoinColumn({ name: "id_bloco_fk" })
  bloco!: BlocoEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
