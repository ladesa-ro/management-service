import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ImagemEntity } from "@/modules/@base/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.entity";
import { AmbienteEntity } from "@/modules/ambientes/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure/persistence/typeorm/campus.entity";

@Entity("bloco")
export class BlocoEntity {
  @PrimaryGeneratedColumn("uuid")
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
