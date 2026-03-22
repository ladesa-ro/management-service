import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";

@Entity("notificacao")
export class NotificacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "titulo", type: "text", nullable: false })
  titulo!: string;

  @Column({ name: "conteudo", type: "text", nullable: false })
  conteudo!: string;

  @Column({ name: "lida", type: "boolean", nullable: false, default: false })
  lida!: boolean;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;
}
