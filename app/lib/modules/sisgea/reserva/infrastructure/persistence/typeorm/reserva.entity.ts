import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure/persistence/typeorm/usuario.entity";
import { AmbienteEntity } from "@/modules/sisgea/ambiente/infrastructure/persistence/typeorm/ambiente.entity";

@Entity("reserva")
export class ReservaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "situacao", type: "text", nullable: false })
  situacao!: string;

  @Column({ name: "motivo", type: "text", nullable: true })
  motivo!: string | null;

  @Column({ name: "tipo", type: "text", nullable: true })
  tipo!: string | null;

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_fk" })
  ambiente!: Relation<AmbienteEntity>;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: Relation<UsuarioEntity>;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: Date | null;
}
