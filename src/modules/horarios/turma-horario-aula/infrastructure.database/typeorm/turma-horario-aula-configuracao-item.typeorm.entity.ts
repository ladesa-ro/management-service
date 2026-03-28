import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaHorarioAulaConfiguracaoEntity } from "./turma-horario-aula-configuracao.typeorm.entity";

@Entity("turma_horario_aula_configuracao_item")
export class TurmaHorarioAulaConfiguracaoItemEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;

  @ManyToOne(() => TurmaHorarioAulaConfiguracaoEntity, {})
  @JoinColumn({ name: "id_turma_horario_aula_configuracao_fk" })
  turmaHorarioAulaConfiguracao!: Relation<TurmaHorarioAulaConfiguracaoEntity>;
}
