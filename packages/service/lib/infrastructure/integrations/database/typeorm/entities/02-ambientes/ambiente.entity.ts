import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { BlocoEntity } from "./bloco.entity";

@Entity("ambiente")
export class AmbienteEntity implements LadesaTypings.Ambiente {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

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

  //

  @ManyToOne(() => BlocoEntity)
  @JoinColumn({ name: "id_bloco_fk" })
  bloco!: BlocoEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
