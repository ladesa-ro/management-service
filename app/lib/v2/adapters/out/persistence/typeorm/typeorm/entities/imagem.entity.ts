import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AmbienteEntity } from "./ambiente.entity";
import { BlocoEntity } from "./bloco.entity";
import { ImagemArquivoEntity } from "./imagem-arquivo.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity("imagem")
export class ImagemEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "descricao", type: "text", nullable: true })
  descricao!: string | null;

  @OneToMany(
    () => ImagemArquivoEntity,
    (entity) => entity.imagem,
    {
      cascade: true,
    },
  )
  versoes!: ImagemArquivoEntity[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;

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
