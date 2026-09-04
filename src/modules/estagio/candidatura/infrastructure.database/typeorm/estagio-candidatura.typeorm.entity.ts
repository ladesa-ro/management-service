import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import type { EstagioCandidaturaSituacao } from "../../domain/estagio-candidatura.fields";

@Entity("estagio_candidatura")
export class EstagioCandidaturaTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => EstagioTypeormEntity)
  @JoinColumn({ name: "id_estagio_fk" })
  estagio!: Relation<EstagioTypeormEntity>;

  @ManyToOne(() => EstagiarioTypeormEntity)
  @JoinColumn({ name: "id_estagiario_fk" })
  estagiario!: Relation<EstagiarioTypeormEntity>;

  @Column({
    name: "situacao",
    type: "enum",
    enum: ["PENDING", "OFFERED", "ACCEPTED", "REJECTED", "CANCELLED", "EXPIRED"],
    default: "PENDING",
    nullable: false,
  })
  situacao!: EstagioCandidaturaSituacao;

  @Column({ name: "data_inscricao", type: "timestamptz", nullable: false })
  dataInscricao!: string;

  @Column({ name: "data_oferta", type: "timestamptz", nullable: true })
  dataOferta!: string | null;

  @Column({ name: "expira_em", type: "timestamptz", nullable: true })
  expiraEm!: string | null;

  @Column({ name: "data_resposta", type: "timestamptz", nullable: true })
  dataResposta!: string | null;

  @Column({ name: "data_cancelamento", type: "timestamptz", nullable: true })
  dataCancelamento!: string | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: "id_autor_convocacao_fk" })
  autorConvocacao!: Relation<UsuarioEntity> | null;

  @Column({ name: "motivo_cancelamento", type: "text", nullable: true })
  motivoCancelamento!: string | null;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
