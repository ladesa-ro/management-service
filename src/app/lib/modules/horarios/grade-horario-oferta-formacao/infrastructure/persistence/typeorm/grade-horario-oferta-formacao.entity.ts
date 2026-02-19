import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure/persistence/typeorm/campus.entity";
import { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";

@Entity("grade_horario_oferta_formacao")
export class GradeHorarioOfertaFormacaoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: Relation<OfertaFormacaoEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
