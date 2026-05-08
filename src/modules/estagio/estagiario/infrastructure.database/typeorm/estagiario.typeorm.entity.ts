import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";

/**
 * Entidade TypeORM para Estagiario
 */
@Entity("estagiario")
export class EstagiarioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: "id_curso_fk" })
  curso!: Relation<CursoEntity>;

  @Column({ name: "periodo", type: "varchar", length: 20, nullable: false })
  periodo!: string;

  @Column({ name: "telefone", type: "varchar", length: 15, nullable: false })
  telefone!: string;

  @Column({ name: "email_institucional", type: "text", nullable: true })
  emailInstitucional!: string | null;

  @Column({ name: "data_nascimento", type: "date", nullable: false })
  dataNascimento!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
