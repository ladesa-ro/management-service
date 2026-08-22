import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { PerfilEntity } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { CalendarioIndisponibilidadeProfessorTipo } from "@/modules/calendario/indisponibilidade-professor/domain/calendario-indisponibilidade-professor.types";

@Entity("calendario_indisponibilidade_professor")
export class CalendarioIndisponibilidadeProfessorEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: Relation<PerfilEntity>;

  @Column({
    name: "tipo",
    type: "enum",
    enum: CalendarioIndisponibilidadeProfessorTipo,
    nullable: false,
  })
  tipo!: CalendarioIndisponibilidadeProfessorTipo;

  @Column({ name: "dia_semana", type: "smallint", nullable: true })
  diaSemana!: number | null;

  @Column({ name: "data", type: "date", nullable: true })
  data!: string | null;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;

  @Column({ name: "motivo", type: "text", nullable: true })
  motivo!: string | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
