import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "@/infrastructure/integrations/database/typeorm/entities/01-autenticacao";
import type { IDomain } from "@/shared/tsp/schema/typings";

@Entity("indisponibilidade_professor")
export class ProfessorIndisponibilidadeEntity implements IDomain.ProfessorIndisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UsuarioEntity, "vinculos")
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: UsuarioEntity & IDomain.Perfil;

  @Column({ name: "id_perfil_fk" })
  idPerfilFk!: string;

  @Column({ name: "indisponibilidade_inicio", type: "timestamptz" })
  indisponibilidadeInicio!: Date;

  @Column({ name: "indisponibilidade_termino", type: "timestamptz" })
  indisponibilidadeTermino!: Date;

  @Column({ name: "motivo", type: "varchar", length: 90 })
  motivo!: string;

  @Column({ name: "date_created", type: "timestamptz", default: () => "NOW()" })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", default: () => "NOW()" })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
