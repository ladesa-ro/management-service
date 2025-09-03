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
// ============================================================================
  @Column({ name: "segunda", type: "time", precision: 0 })
  segunda!: string; 

  @Column({ name: "terça", type: "time", precision: 0 })
  terca!: string;

  @Column({ name: "quarta", type: "time", precision: 0 })
  quarta!: string;
  
  @Column({ name: "quinta", type: "time", precision: 0 })
  quinta!: string;

  @Column({ name: "sexta", type: "time", precision: 0 })
  sexta!: string;
  
  @Column({ name: "sabado", type: "time", precision: 0 })
  sabado!: string;

  @Column({ name: "domingo", type: "time", precision: 0 })
  domingo!: string;
// ============================================================================

  @Column({ name: "motivo", type: "varchar", length: 90 })
  motivo!: string;

  @Column({ name: "date_created", type: "timestamptz", default: () => "NOW()" })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", default: () => "NOW()" })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
