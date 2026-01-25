import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CampusEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/02-ambientes";
import {
  OfertaFormacaoEntity
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/04-ensino-institucional/oferta-formacao.entity";
import { type IDomain } from "@/shared/tsp/schema/typings";

@Entity("grade_horario_oferta_formacao")
export class GradeHorarioOfertaFormacaoEntity implements IDomain.GradeHorarioOfertaFormacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: IDomain.Campus;

  @ManyToOne(() => OfertaFormacaoEntity)
  @JoinColumn({ name: "id_oferta_formacao_fk" })
  ofertaFormacao!: IDomain.OfertaFormacao;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
