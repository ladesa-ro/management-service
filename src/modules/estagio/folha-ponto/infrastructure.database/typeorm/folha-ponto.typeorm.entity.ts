import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import { FolhaPontoTokenTypeormEntity } from "./folha-ponto-token.typeorm.entity";

@Entity("folha_ponto")
export class FolhaPontoTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EstagioTypeormEntity)
  @JoinColumn({ name: "id_estagio_fk" })
  estagio!: Relation<EstagioTypeormEntity>;

  // Coluna FK acessível diretamente — usada quando a relation não é carregada
  // (ex: queries com pessimistic lock que não usam outer join)
  @Column({ name: "id_estagio_fk", nullable: true })
  estagioId!: string;

  @Column({ name: "data", type: "date" })
  data!: string;

  @Column({ name: "hora_inicio", type: "time" })
  horaInicio!: string;

  @Column({ name: "hora_fim", type: "time" })
  horaFim!: string;

  @Column({ name: "quantidade_horas", type: "decimal", precision: 5, scale: 2 })
  quantidadeHoras!: number;

  @Column({ name: "observacoes", type: "text", nullable: true })
  observacoes!: string | null;

  @Column({ name: "status", type: "varchar", length: 20 })
  status!: string;

  @Column({ name: "data_solicitacao", type: "timestamptz" })
  dataSolicitacao!: string;

  @Column({ name: "data_aprovacao", type: "timestamptz", nullable: true })
  dataAprovacao!: string | null;

  @Column({ name: "data_rejeicao", type: "timestamptz", nullable: true })
  dataRejeicao!: string | null;

  @Column({ name: "date_created", type: "timestamptz" })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz" })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;

  @OneToMany(
    () => FolhaPontoTokenTypeormEntity,
    (t) => t.folhaPonto,
  )
  tokens!: Relation<FolhaPontoTokenTypeormEntity[]>;
}
