import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";

export enum HorarioEdicaoSessaoStatus {
  ABERTA = "ABERTA",
  SALVA = "SALVA",
  CANCELADA = "CANCELADA",
}

@Entity("horario_edicao_sessao")
export class HorarioEdicaoSessaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "status", type: "varchar", length: 20, nullable: false })
  status!: HorarioEdicaoSessaoStatus;

  @Column({ name: "id_usuario_fk", type: "uuid", nullable: false })
  idUsuarioFk!: string;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;
}
