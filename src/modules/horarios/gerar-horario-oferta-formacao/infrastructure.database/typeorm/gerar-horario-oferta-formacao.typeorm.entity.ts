import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
import { GerarHorarioEntity } from "@/modules/horarios/gerar-horario/infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@Entity("gerar_horario_oferta_formacao")
export class GerarHorarioOfertaFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "id_gerar_horario_fk", type: "uuid", nullable: false })
  idGerarHorarioFk!: string;

  @ManyToOne(() => GerarHorarioEntity, {})
  @JoinColumn({ name: "id_gerar_horario_fk" })
  gerarHorario!: Relation<GerarHorarioEntity>;

  @Column({ name: "id_oferta_formacao_fk", type: "uuid", nullable: false })
  idOfertaFormacaoFk!: string;

  @ManyToOne(() => OfertaFormacaoEntity, {})
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;
}
