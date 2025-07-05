import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "../01-autenticacao/usuario.entity";
import { AmbienteEntity } from "./ambiente.entity";

@Entity("reserva")
export class ReservaEntity implements LadesaTypings.Reserva {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

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
  ambiente!: AmbienteEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "id_usuario_fk" })
  usuario!: UsuarioEntity;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
