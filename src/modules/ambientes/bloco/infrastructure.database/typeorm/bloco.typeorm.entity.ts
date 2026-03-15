import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { ImagemEntity } from "@/modules/armazenamento/imagem/infrastructure.database/typeorm/imagem.typeorm.entity";

@Entity("bloco")
export class BlocoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "codigo", type: "text", nullable: false })
  codigo!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: Relation<ImagemEntity> | null;

  @OneToMany(
    () => AmbienteEntity,
    (ambiente) => ambiente.bloco,
  )
  ambientes!: Relation<AmbienteEntity>[];

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
