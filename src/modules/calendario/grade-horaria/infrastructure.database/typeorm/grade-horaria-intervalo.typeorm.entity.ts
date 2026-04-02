import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { GradeHorariaEntity } from "./grade-horaria.typeorm.entity";

@Entity("grade_horaria_intervalo")
export class GradeHorariaIntervaloEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;

  @ManyToOne(() => GradeHorariaEntity, {})
  @JoinColumn({ name: "id_grade_horaria_fk" })
  gradeHoraria!: Relation<GradeHorariaEntity>;
}
