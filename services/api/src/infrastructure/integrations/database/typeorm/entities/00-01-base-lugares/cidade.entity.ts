import * as IDomainContracts from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EstadoEntity } from "./estado.entity";

@Entity("base_cidade")
export class CidadeEntity implements IDomainContracts.Cidade {
  @PrimaryColumn({ name: "id", type: "integer" })
  id!: number;

  // ...

  @Column({ name: "nome", nullable: false, type: "text" })
  nome!: string;

  // ...

  @ManyToOne(() => EstadoEntity)
  @JoinColumn({ name: "id_estado_fk" })
  estado!: EstadoEntity;
}
