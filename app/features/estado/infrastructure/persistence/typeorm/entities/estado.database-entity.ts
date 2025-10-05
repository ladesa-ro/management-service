import { Column, Entity, PrimaryColumn } from "typeorm";
import type { EstadoEntity } from "../../../../domain";

@Entity("base_estado")
export class EstadoDatabaseEntity implements EstadoEntity {
  @PrimaryColumn({ name: "id", type: "integer" })
  id!: number;

  @Column({ name: "nome", nullable: false, type: "text" })
  nome!: string;

  @Column({ name: "sigla", nullable: false, type: "text" })
  sigla!: string;
}
