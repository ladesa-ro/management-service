import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { PerfilEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities/index.js";
@Entity({ name: "indisponibilidade_professor" })
export class IndisponibilidadeProfessorEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ name: "indisponibilidade_inicio", type: "timestamptz" })
  indisponibilidade_inicio!: Date;

  @Column({ name: "indisponibilidade_termino", type: "timestamptz" })
  indisponibilidade_termino!: Date;

  @Column({ name: "motivo", type: "varchar", length: 90 })
  motivo!: string;

  @Column({ name: "date_created", type: "timestamptz" })
  date_created!: Date;

  @Column({ name: "date_updated", type: "timestamptz" })
  date_updated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  date_deleted!: Date | null;

  @ManyToOne(() => PerfilEntity, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: PerfilEntity;

  @RelationId((it: IndisponibilidadeProfessorEntity) => it.perfil)
  id_perfil_fk!: string;
}
