import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { UsuarioEntity } from "@/v2/infrastructure.database/typeorm/entities/01-autenticacao";
import type { IDomain } from "@/shared/tsp/schema/typings";

@Entity("indisponibilidade_professor")
export class ProfessorIndisponibilidadeEntity implements IDomain.ProfessorIndisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UsuarioEntity, "vinculos")
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: UsuarioEntity & IDomain.Perfil;

  @RelationId((self: ProfessorIndisponibilidadeEntity) => self.perfil)
  idPerfilFk!: string;
  // ============================================================================
  @Column({ name: "dia_da_semana", type: "smallint" })
  diaDaSemana!: number;

  @Column({ name: "hora_inicio", type: "timestamp", precision: 0 })
  horaInicio!: string;

  @Column({ name: "hora_fim", type: "timestamp", precision: 0 })
  horaFim!: string;
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
