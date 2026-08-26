import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { EmpresaAvaliacaoTypeormEntity } from "./empresa-avaliacao.typeorm.entity";

@Entity("empresa_avaliacao_curtida")
export class EmpresaAvaliacaoCurtidaTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(
    () => EmpresaAvaliacaoTypeormEntity,
    (avaliacao) => avaliacao.curtidas,
  )
  @JoinColumn({ name: "id_empresa_avaliacao_fk" })
  avaliacao!: Relation<EmpresaAvaliacaoTypeormEntity>;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
