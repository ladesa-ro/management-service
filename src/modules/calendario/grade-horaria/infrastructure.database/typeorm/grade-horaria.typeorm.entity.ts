import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";

@Entity("grade_horaria")
export class GradeHorariaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "identificador_externo", type: "uuid", nullable: false })
  identificadorExterno!: string;

  @Column({ name: "nome", type: "varchar", length: 255, nullable: false })
  nome!: string;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: string;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: string | null;

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;

  @ManyToOne(() => CampusEntity, {})
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
