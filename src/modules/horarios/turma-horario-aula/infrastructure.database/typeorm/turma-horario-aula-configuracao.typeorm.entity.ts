import { Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";

@Entity("turma_horario_aula_configuracao")
export class TurmaHorarioAulaConfiguracaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => TurmaEntity, {})
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;
}
