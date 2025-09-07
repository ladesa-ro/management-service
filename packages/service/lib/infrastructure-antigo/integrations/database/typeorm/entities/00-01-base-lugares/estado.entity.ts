import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {
  CidadeDatabaseEntity
} from "@/features/cidade/infrastructure/persistence/typeorm/entities/cidade.database-entity";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";

@Entity("base_estado")
export class EstadoEntity implements IDomain.Estado {
  @PrimaryColumn({name: "id", type: "integer"})
  id!: number;

  // ...

  @Column({name: "nome", nullable: false, type: "text"})
  nome!: string;

  @Column({name: "sigla", nullable: false, type: "text"})
  sigla!: string;

  // ...

  @OneToMany(
    () => CidadeDatabaseEntity,
    (cidade) => cidade.estado,
  )
  cidades!: CidadeDatabaseEntity[];
}
