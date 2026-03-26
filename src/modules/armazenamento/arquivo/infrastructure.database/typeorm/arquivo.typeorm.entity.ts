import { Column, Entity, OneToMany, PrimaryColumn, type Relation } from "typeorm";

import { ImagemArquivoEntity } from "@/modules/armazenamento/imagem-arquivo/infrastructure.database/typeorm/imagem-arquivo.typeorm.entity";

@Entity("arquivo")
export class ArquivoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "name", type: "text", nullable: true })
  name!: string;

  @Column({ name: "mime_type", type: "text", nullable: true })
  mimeType!: string;

  @Column({ name: "size_bytes", type: "int", nullable: true })
  sizeBytes!: number;

  @Column({ name: "storage_type", type: "text", nullable: true })
  storageType!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;

  @OneToMany(
    () => ImagemArquivoEntity,
    (row) => row.arquivo,
  )
  versao!: Relation<ImagemArquivoEntity>[];
}
