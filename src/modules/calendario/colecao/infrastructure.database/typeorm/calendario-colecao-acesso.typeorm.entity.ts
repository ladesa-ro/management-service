import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "@/modules/calendario/colecao/domain/calendario-colecao-acesso.types";
import { CalendarioColecaoEntity } from "./calendario-colecao.typeorm.entity";

@Entity("calendario_colecao_acesso")
export class CalendarioColecaoAcessoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => CalendarioColecaoEntity)
  @JoinColumn({ name: "id_colecao_fk" })
  colecao!: Relation<CalendarioColecaoEntity>;

  @Column({
    name: "escopo",
    type: "enum",
    enum: CalendarioColecaoAcessoEscopo,
    nullable: false,
  })
  escopo!: CalendarioColecaoAcessoEscopo;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity> | null;

  @ManyToOne(() => CampusEntity, { nullable: true })
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity> | null;

  @Column({
    name: "papel",
    type: "enum",
    enum: CalendarioColecaoAcessoPapel,
    nullable: false,
  })
  papel!: CalendarioColecaoAcessoPapel;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
