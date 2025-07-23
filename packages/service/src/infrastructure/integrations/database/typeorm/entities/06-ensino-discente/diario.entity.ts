import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { AmbienteEntity } from "../02-ambientes/ambiente.entity";
import { DisciplinaEntity } from "../04-ensino-institucional/disciplina.entity";
import { CalendarioLetivoEntity } from "../05-calendario";
import { TurmaEntity } from "./turma.entity";

@Entity("diario")
export class DiarioEntity implements LadesaTypings.Diario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;
  //

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: Relation<CalendarioLetivoEntity>;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: Relation<TurmaEntity>;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: "id_disciplina_fk" })
  disciplina!: Relation<DisciplinaEntity>;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_padrao_fk" })
  ambientePadrao!: Relation<AmbienteEntity> | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
