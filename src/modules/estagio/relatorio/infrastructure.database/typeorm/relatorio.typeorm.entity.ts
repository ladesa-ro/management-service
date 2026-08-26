import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { ArquivoEntity } from "@/modules/armazenamento/arquivo/infrastructure.database/typeorm/arquivo.typeorm.entity";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";

@Entity("relatorio")
export class RelatorioTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @OneToOne(() => EstagioTypeormEntity)
  @JoinColumn({ name: "id_estagio_fk" })
  estagio!: Relation<EstagioTypeormEntity>;

  @Column({ name: "id_estagio_fk", nullable: true })
  estagioId!: string;

  @ManyToOne(() => ArquivoEntity, { nullable: true })
  @JoinColumn({ name: "id_arquivo_fk" })
  arquivo!: Relation<ArquivoEntity> | null;

  @Column({ name: "id_arquivo_fk", nullable: true })
  arquivoId!: string | null;

  @Column({ name: "conteudo_json", type: "jsonb", nullable: true })
  conteudoJson!: Record<string, any> | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
