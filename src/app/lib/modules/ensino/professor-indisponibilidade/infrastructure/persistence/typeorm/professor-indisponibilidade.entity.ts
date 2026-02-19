import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  RelationId,
} from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure/persistence/typeorm/usuario.entity";

@Entity("indisponibilidade_professor")
export class ProfessorIndisponibilidadeEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UsuarioEntity, "vinculos")
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<UsuarioEntity>;

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
