import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { AmbienteEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/AmbienteEntity";
import { CampusEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CampusEntity";
import { ImagemEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ImagemEntity";

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
