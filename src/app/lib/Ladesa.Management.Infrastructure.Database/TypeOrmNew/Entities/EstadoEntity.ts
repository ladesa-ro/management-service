import { Column, Entity, OneToMany, PrimaryColumn, type Relation } from "typeorm";

import { CidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CidadeEntity";

@Entity("base_estado")
export class EstadoEntity {
  @PrimaryColumn({ name: "id", type: "integer" })
  id!: number;

  // ...

  @Column({ name: "nome", nullable: false, type: "text" })
  nome!: string;

  @Column({ name: "sigla", nullable: false, type: "text" })
  sigla!: string;

  // ...

  @OneToMany(
    () => CidadeEntity,
    (cidade) => cidade.estado,
  )
  cidades!: Relation<CidadeEntity>[];
}
