import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { ArquivoEntity } from "./arquivo.entity";
import { ImagemEntity } from "./imagem.entity";

@Entity("imagem_arquivo")
export class ImagemArquivoEntity implements LadesaTypings.ImagemArquivo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "largura", type: "int", nullable: false })
  largura!: number;

  @Column({ name: "altura", type: "int", nullable: false })
  altura!: number;

  @Column({ name: "formato", type: "text", nullable: false })
  formato!: string;

  @Column({ name: "mime_type", type: "text", nullable: false })
  mimeType!: string;

  //

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_fk" })
  imagem!: Relation<ImagemEntity>;

  @ManyToOne(() => ArquivoEntity)
  @JoinColumn({ name: "id_arquivo_fk" })
  arquivo!: Relation<ArquivoEntity>;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
