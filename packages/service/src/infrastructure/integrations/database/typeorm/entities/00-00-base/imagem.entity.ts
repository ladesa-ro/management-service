import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "../01-autenticacao/usuario.entity";
import { AmbienteEntity } from "../02-ambientes/ambiente.entity";
import { BlocoEntity } from "../02-ambientes/bloco.entity";
import { ImagemArquivoEntity } from "./imagem-arquivo.entity";

@Entity("imagem")
export class ImagemEntity implements LadesaTypings.Imagem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "descricao", type: "text", nullable: true })
  descricao!: string | null;

  //

  @OneToMany(
    () => ImagemArquivoEntity,
    (entity) => entity.imagem,
    {
      cascade: true,
    },
  )
  versoes!: ImagemArquivoEntity[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;

  //

  @OneToMany(
    () => BlocoEntity,
    (row) => row.imagemCapa,
  )
  blocoCapa!: BlocoEntity[];

  @OneToMany(
    () => AmbienteEntity,
    (entity) => entity.imagemCapa,
  )
  ambienteCapa!: AmbienteEntity[];

  @OneToMany(
    () => UsuarioEntity,
    (entity) => entity.imagemCapa,
  )
  usuarioCapa!: UsuarioEntity[];

  @OneToMany(
    () => UsuarioEntity,
    (entity) => entity.imagemPerfil,
  )
  usuarioPerfil!: UsuarioEntity[];
}
