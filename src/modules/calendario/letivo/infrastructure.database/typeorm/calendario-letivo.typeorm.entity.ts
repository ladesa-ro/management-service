import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { CalendarioLetivoSituacao } from "@/modules/calendario/letivo/domain/calendario-letivo";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";

@Entity("calendario_letivo")
export class CalendarioLetivoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text" })
  nome!: string;

  @Column({ name: "ano_letivo", type: "integer" })
  ano!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({
    name: "situacao",
    type: "enum",
    enum: CalendarioLetivoSituacao,
    default: CalendarioLetivoSituacao.ATIVO,
    nullable: false,
  })
  situacao!: CalendarioLetivoSituacao;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
