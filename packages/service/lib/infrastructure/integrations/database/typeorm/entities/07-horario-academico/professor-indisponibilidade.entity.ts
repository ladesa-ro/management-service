import { PerfilEntity } from "@/infrastructure/integrations/database/typeorm/entities/03-autorizacao";
import type { IDomain } from "@/shared/tsp/schema/typings";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("professor_indisponibilidade")
export class professorIndisponibilidadeEntity implements IDomain.ProfessorIndisponibilidade {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: IDomain.Perfil;

  @Column({ name: "id_perfil_fk", type: "uuid" })
  id_perfil_fk!: string;

  @Column({ name: "indisponibilidade_inicio", type: "timestamptz" })
  indisponibilidade_inicio!: Date;

  @Column({ name: "indisponibilidade_termino", type: "timestamptz" })
  indisponibilidade_termino!: Date;

  @Column({ name: "motivo", type: "varchar", length: 90 })
  motivo!: string;

  @Column({ name: "date_created", type: "timestamptz", default: () => "NOW()" })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", default: () => "NOW()" })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
