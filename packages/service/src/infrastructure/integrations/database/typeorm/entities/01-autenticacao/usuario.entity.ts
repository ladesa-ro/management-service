import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { PerfilEntity } from "../03-autorizacao/perfil.entity";

@Entity("usuario")
export class UsuarioEntity implements LadesaTypings.Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text", nullable: true })
  nome!: string | null;

  @Column({ name: "matricula_siape", type: "text", nullable: true })
  matriculaSiape!: string | null;

  @Column({ name: "email", type: "text", nullable: true })
  email!: string | null;

  @Column({ name: "is_super_user", type: "boolean", nullable: false })
  isSuperUser!: boolean;

  //

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_perfil_fk" })
  imagemPerfil!: Relation<ImagemEntity> | null;

  //

  @OneToMany(
    () => PerfilEntity,
    (vinculo) => vinculo.usuario,
  )
  vinculos!: PerfilEntity[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
