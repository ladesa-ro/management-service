import { ImagemEntity } from "@/integrations/database/typeorm/entities/00-00-base";
import { DiarioEntity } from "@/integrations/database/typeorm/entities/06-ensino-discente";
import * as IDomainContracts from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";

@Entity("disciplina")
export class DisciplinaEntity implements IDomainContracts.Disciplina {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "nome_abreviado", type: "text", nullable: false })
  nomeAbreviado!: string;

  @Column({ name: "carga_horaria", type: "int", nullable: false })
  cargaHoraria!: number;

  //

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => DiarioEntity,
    (diario) => diario.disciplina,
  )
  diarios!: IDomainContracts.Diario[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
