import { Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CalendarioLetivoEntity } from "@/modules/horarios/calendario-letivo/infrastructure.database/typeorm/calendario-letivo.typeorm.entity";
import { GerarHorarioEntity } from "@/modules/horarios/gerar-horario/infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@Entity("gerar_horario_calendario_letivo")
export class GerarHorarioCalendarioLetivoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => GerarHorarioEntity, {})
  @JoinColumn({ name: "id_gerar_horario_fk" })
  gerarHorario!: Relation<GerarHorarioEntity>;

  @ManyToOne(() => CalendarioLetivoEntity, {})
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;
}
