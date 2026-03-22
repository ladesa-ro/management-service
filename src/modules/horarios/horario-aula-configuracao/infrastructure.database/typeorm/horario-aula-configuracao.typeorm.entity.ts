import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";

@Entity("horario_aula_configuracao")
export class HorarioAulaConfiguracaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;

  @ManyToOne(() => CampusEntity, {})
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;
}
