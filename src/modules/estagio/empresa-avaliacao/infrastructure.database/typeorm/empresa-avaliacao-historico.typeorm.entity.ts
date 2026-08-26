import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { EmpresaAvaliacaoTypeormEntity } from "./empresa-avaliacao.typeorm.entity";

@Entity("empresa_avaliacao_historico")
export class EmpresaAvaliacaoHistoricoTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EmpresaAvaliacaoTypeormEntity)
  @JoinColumn({ name: "id_empresa_avaliacao_fk" })
  avaliacao!: Relation<EmpresaAvaliacaoTypeormEntity>;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "rating_anterior", type: "smallint", nullable: true })
  ratingAnterior!: number | null;

  @Column({ name: "rating_novo", type: "smallint", nullable: false })
  ratingNovo!: number;

  @Column({ name: "comentario_anterior", type: "varchar", length: 2000, nullable: true })
  comentarioAnterior!: string | null;

  @Column({ name: "comentario_novo", type: "varchar", length: 2000, nullable: true })
  comentarioNovo!: string | null;

  @Column({ name: "acao", type: "varchar", length: 30, nullable: false })
  acao!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;
}
