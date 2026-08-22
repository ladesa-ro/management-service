import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";

@Entity("turma_matricula")
export class TurmaMatriculaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
