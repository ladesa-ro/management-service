import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("professor_indisponibilidade")
export class professorIndisponibilidade {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "id_perfil_fk", type: "uuid" })
  id_perfil_fk!: string;

  @Column({ name: "indisponibilidade_inicio", type: "timestamptz" })
  indisponibilidade_inicio!: Date;

  @Column({ name: "indisponibilidade_termino", type: "timestamptz" })
  indisponibilidade_termino!: Date;

  @Column({ name: "motivo", type: "varchar", length: 90 })
  motivo!: string;

  @Column({ name: "date_created", type: "timestamptz", default: () => "NOW()" })
  date_created!: Date;

  @Column({ name: "date_updated", type: "timestamptz", default: () => "NOW()" })
  date_updated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  date_deleted?: Date | null;
}
