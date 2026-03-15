import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "@/modules/acesso/perfil/infrastructure/persistence/typeorm/perfil.entity";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.entity";

/**
 * Entidade TypeORM para Estagiario
 */
@Entity("estagiario")
export class EstagiarioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_perfil_fk", type: "uuid", nullable: false })
  idPerfilFk!: string;

  @ManyToOne(() => PerfilEntity, {})
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @Column({ name: "id_curso_fk", type: "uuid", nullable: false })
  idCursoFk!: string;

  @ManyToOne(() => CursoEntity, {})
  @JoinColumn({ name: "id_curso_fk" })
  curso!: Relation<CursoEntity>;

  @Column({ name: "id_turma_fk", type: "uuid", nullable: false })
  idTurmaFk!: string;

  @ManyToOne(() => TurmaEntity, {})
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @Column({ name: "telefone", type: "varchar", length: 15, nullable: false })
  telefone!: string;

  @Column({ name: "email_institucional", type: "text", nullable: true })
  emailInstitucional!: string | null;

  @Column({ name: "data_nascimento", type: "date", nullable: false })
  dataNascimento!: Date;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
