import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { HorarioAulaConfiguracaoEntity } from "@/modules/horarios/horario-aula-configuracao/infrastructure.database/typeorm/horario-aula-configuracao.typeorm.entity";

@Entity("horario_aula")
export class HorarioAulaEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;

  @ManyToOne(() => HorarioAulaConfiguracaoEntity, {})
  @JoinColumn({ name: "id_horario_aula_configuracao_fk" })
  horarioAulaConfiguracao!: Relation<HorarioAulaConfiguracaoEntity>;
}
