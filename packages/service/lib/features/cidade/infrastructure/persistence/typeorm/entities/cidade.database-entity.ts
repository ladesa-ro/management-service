import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";
import { EstadoDatabaseEntity } from "@/features/estado";

@Entity("base_cidade")
export class CidadeDatabaseEntity implements IDomain.Cidade {
  @PrimaryColumn({name: "id", type: "integer"})
  id!: number;

  // ...

  @Column({name: "nome", nullable: false, type: "text"})
  nome!: string;

  // ...

  @ManyToOne(() => EstadoDatabaseEntity)
  @JoinColumn({name: "id_estado_fk"})
  estado!: Relation<EstadoDatabaseEntity>;
}
