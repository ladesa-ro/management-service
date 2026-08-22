import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { CalendarioColecaoVisibilidade } from "@/modules/calendario/colecao/domain/calendario-colecao.types";

@Entity("calendario_colecao")
export class CalendarioColecaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_dono_fk" })
  dono!: Relation<UsuarioEntity>;

  @ManyToOne(() => CampusEntity, { nullable: true })
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity> | null;

  @Column({ name: "nome", type: "text" })
  nome!: string;

  @Column({ name: "cor", type: "text", nullable: true })
  cor!: string | null;

  @Column({
    name: "visibilidade",
    type: "enum",
    enum: CalendarioColecaoVisibilidade,
    default: CalendarioColecaoVisibilidade.PRIVADA,
    nullable: false,
  })
  visibilidade!: CalendarioColecaoVisibilidade;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
