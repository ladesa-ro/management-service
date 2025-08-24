import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { type IDomain } from "@/shared/tsp/schema/typings";
import {
  CidadeEntity
} from "../../../../infrastructure/integrations/database/typeorm/entities/00-01-base-lugares/cidade.entity";

@Entity("base_estado")
export class EstadoDatabaseEntity implements IDomain.Estado {
  @PrimaryColumn({name: "id", type: "integer"})
  id!: number;

  // ...

  @Column({name: "nome", nullable: false, type: "text"})
  nome!: string;

  @Column({name: "sigla", nullable: false, type: "text"})
  sigla!: string;

  // ...

  @OneToMany(
    () => CidadeEntity,
    (cidade) => cidade.estado,
  )
  cidades!: CidadeEntity[];
}
