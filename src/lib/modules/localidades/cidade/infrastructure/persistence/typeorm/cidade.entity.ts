import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";

import { EstadoEntity } from "@/modules/localidades/estado/infrastructure/persistence/typeorm/estado.entity";

@Entity("base_cidade")
export class CidadeEntity {
  @PrimaryColumn({ name: "id", type: "integer" })
  id!: number;

  // ...

  @Column({ name: "nome", nullable: false, type: "text" })
  nome!: string;

  // ...

  @ManyToOne(() => EstadoEntity)
  @JoinColumn({ name: "id_estado_fk" })
  estado!: Relation<EstadoEntity>;
}
