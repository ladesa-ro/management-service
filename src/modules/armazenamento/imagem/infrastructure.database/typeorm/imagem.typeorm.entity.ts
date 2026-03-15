import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { BlocoEntity } from "@/modules/ambientes/bloco/infrastructure.database/typeorm/bloco.typeorm.entity";
import { ImagemArquivoEntity } from "@/modules/armazenamento/imagem-arquivo/infrastructure.database/typeorm/imagem-arquivo.typeorm.entity";

@Entity("imagem")
export class ImagemEntity {
  @PrimaryColumn("uuid")
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
