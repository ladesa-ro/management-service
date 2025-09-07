import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CidadeDatabaseEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities";

@Entity("base_estado")
export class EstadoDatabaseEntity {
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
