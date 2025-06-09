import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImagemArquivoEntity } from "./imagem-arquivo.entity";

@Entity("arquivo")
export class ArquivoEntity implements LadesaTypings.Arquivo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "name", type: "text", nullable: true })
  name!: string;

  @Column({ name: "mime_type", type: "text", nullable: true })
  mimeType!: string;

  @Column({ name: "size_bytes", type: "int", nullable: true })
  sizeBytes!: number;

  @Column({ name: "storage_type", type: "text", nullable: true })
  storageType!: string;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;

  //

  @OneToMany(
    () => ImagemArquivoEntity,
    (row) => row.arquivo,
  )
  versao!: ImagemArquivoEntity[];
}
