import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaDisponibilidadeConfiguracaoEntity } from "./turma-disponibilidade-configuracao.typeorm.entity";

@Entity("turma_disponibilidade_configuracao_item")
export class TurmaDisponibilidadeConfiguracaoItemEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => TurmaDisponibilidadeConfiguracaoEntity, {})
  @JoinColumn({ name: "id_turma_disponibilidade_configuracao_fk" })
  turmaDisponibilidadeConfiguracao!: Relation<TurmaDisponibilidadeConfiguracaoEntity>;

  @Column({ name: "dia_semana", type: "smallint", nullable: false })
  diaSemana!: number;

  @Column({ name: "inicio", type: "time", nullable: false })
  inicio!: string;

  @Column({ name: "fim", type: "time", nullable: false })
  fim!: string;
}
